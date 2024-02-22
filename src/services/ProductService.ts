import {ProductRepository,VendorProductRepository,VendorProductCategoryRepository,ProductShippingInfoRepository,
 VendorProductVariantRepository,VariantsToCategoryRepository,ProductVariantRepository,UserProductPreferenceRepository,
 ProductPreferenceRepository,ProductVariantImageRepository,ProductMetaInfoRepository,TaxClassRepository,
 ProductRatingRepository,SameDayProductPincodeRepository,OpenBoxProductPincodeRepository} from '../database';
import { Product } from '../database/models/Product';
import { ProductStatus } from '../database/models/ProductStatus';
import { ProductVariant } from '../database/models/ProductVariant';
import { Variant } from '../database/models/Variant';
import { VendorProduct } from '../database/models/VendorProduct';
import { Brand } from '../database/models/Brand';
import { VendorProductVariant } from '../database/models/VendorProductVariant';
import { UserProductPreference } from '../database/models/UserProductPreference';
import { ProductVariantImage } from '../database/models/ProductVariantImage';
import { ProductDiscount } from '../database/models/ProductDiscount';
import { productSlug, todayDate } from '../utils';
import { In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RelatedProductService } from './RelatedProductService';
interface ProductListingFuncInterface {
    viewType: number,
    limit?: number,
    offset?: number,
    siteId: number,
    statusId: number,
    vendorId: number,
    keyword?: string
}

@Injectable()
export class ProductService {

    constructor(
        private relatedProductsService: RelatedProductService,
    ) {}
    

    public async createDefaultPreferences(userId: number): Promise<any> {
        const defaultPrefs = await ProductPreferenceRepository.find({ where: { isActive: 1 } });
        const arr = defaultPrefs.map((item) => item.id);
        const preferences = arr.map((item) => {
            return {
                userId,
                productPreferenceId: item,
            }
        });
        return UserProductPreferenceRepository.save(preferences);
    }

    public async productTablePreferences(userId: number): Promise<any> {
        const selects = [
            'PP.id as id',
            'PP.col as col',
            'PP.colType as colType',
            'PP.colName as colName',
            'PP.mandatory as mandatory',
            'VPP.id as isActive',
        ];
        const results = await ProductPreferenceRepository.createQueryBuilder('PP')
            .leftJoin(UserProductPreference, 'VPP', 'VPP.productPreferenceId = PP.id AND VPP.userId = :userId', { userId })
            .select(selects)
            .getRawMany();
        const preferences = results.map((item) => {
            return {
                ...item,
                isActive: item.isActive === null ? 0 : 1,
            };
        });
        return preferences;
    }

    public async productListing({ limit, offset, siteId, statusId, keyword, vendorId, viewType }: ProductListingFuncInterface): Promise<any> {
        const selects = [
            // P
            'P.name as name',
            // VPV
            'VPV.id as vendorProductVariantId',
            'VPV.vendorId as vendorId',
            'VPV.productId as productId',
            'VPV.siteId as siteId',
            'VPV.productVariantId as productVariantId',
            'VPV.price2 as price',
            'VPV.sku as sku',
            'VPV.available as available',
            'VPV.quantity as quantity',
            'VPV.outOfStock as outOfStock',
            // PV
            'PV.productVariantValuesId as variant',
            'PVImage.image as image',
            // VP
            'VP.createdAt as createdAt',
            'VP.statusId as statusId',
            'VP.slug as slug',
            'ProductStatus.name as statusName',
            'ProductStatus.colorCode as statusColorCode',
            // ProductDiscount
            'PD.price2 as discountPrice',
            'PD.startDate as discountStartDate',
            'PD.endDate as discountEndDate',
            'PD.showSaleEndDate as showSaleEndDate'
        ];
        const PDCondition = 'PD.vendorProductVariantId = VPV.id';
        const keywordCondition = 'LOWER(P.name) LIKE :keyword';
        const query: any = await VendorProductVariantRepository.createQueryBuilder('VPV')
            .innerJoin(Product, 'P', 'VPV.productId = P.id')
            .innerJoin(VendorProduct, 'VP', 'VP.productId = VPV.productId AND VP.vendorId = :vendorId', { vendorId })
            .innerJoin(ProductVariant, 'PV', 'PV.id = VPV.productVariantId AND PV.isActive = 1')
            .leftJoin(ProductVariantImage, 'PVImage', 'PVImage.productVariantsId = PV.id AND PVImage.isDefault = 1')
            .leftJoin(ProductStatus, 'ProductStatus', 'ProductStatus.id = VP.statusId')
            .leftJoin(ProductDiscount, 'PD', PDCondition, { today: todayDate() })
            .andWhere('VPV.vendorId = :vendorId', { vendorId })
            .andWhere('VPV.siteId = :siteId', { siteId })
            .andWhere('VPV.isActive = 1');
        if (keyword) {
            query.andWhere(keywordCondition, { keyword: `%${keyword.toLowerCase()}%` });
        }
        if (statusId !== 0) {
            query.andWhere('VP.statusId = :statusId', { statusId });
        }
        if (limit !== 0) {
            query.limit(limit).offset(offset);
        }
        // 1: product wise, 2: variant wise. by default variant wise is there
        if (viewType === 1) {
            query.groupBy('VP.productId');
        }
        const results = await query.select(selects).orderBy('VP.productId', 'DESC').getRawMany();
        const data = results.map((item: any) => {
            return {
                ...item,
                variant: JSON.parse(item.variant)
            };
        });
        delete query.expressionMap.limit;
        delete query.expressionMap.offset;
        const count = await query.select(selects).orderBy('VP.productId', 'DESC').getRawMany();
        return { totalCount: count.length || 0, data };
    }

    public async productListingCountStats({ siteId, vendorId, viewType }: ProductListingFuncInterface): Promise<any> {
        const selects = [
            `COUNT(case VP.statusId when 1 then 1 else null end) as Active`,
            `COUNT(case VP.statusId when 2 then 1 else null end) as InActive`,
            `COUNT(case VP.statusId when 3 then 1 else null end) as Draft`,
            `COUNT(case VP.statusId when 4 then 1 else null end) as Rejected`,
            `COUNT(case VP.statusId when 5 then 1 else null end) as PendingApproval`,
            `COUNT(case VP.statusId when 6 then 1 else null end) as ImprovementsRequired`,
        ];
        const query: any = await VendorProductVariantRepository.createQueryBuilder('VPV')
            .innerJoin(Product, 'P', 'VPV.productId = P.id')
            .innerJoin(VendorProduct, 'VP', 'VP.productId = VPV.productId AND VP.vendorId = VPV.vendorId')
            .innerJoin(ProductVariant, 'PV', 'PV.id = VPV.productVariantId')
            .where('VPV.vendorId = :vendorId', { vendorId })
            .andWhere('VPV.siteId = :siteId', { siteId });
        // 1: product wise, 2: variant wise. by default variant wise is there
        if (viewType === 1) {
            query.groupBy('VP.productId');
        }
        return await query.select(selects).orderBy('VP.productId', 'DESC').getRawOne();
    }

    public async calculateTaxForIndiaByClass(price: string, taxClassId: any) {
        if (!taxClassId) {
            return price;
        }
        if (taxClassId == 0) {
            return price;
        }
        const taxAmountInfo = await TaxClassRepository.findOne({ where: { id: Number(taxClassId) } });
        if (taxAmountInfo) {
            // if (Number(taxAmountInfo.value) > 18) {
            //     taxAmountInfo.value = '18.00';
            // }
            const p: any = parseFloat(price).toFixed(2);
            const tv: any = parseFloat(taxAmountInfo.value).toFixed(2);
            const a = ((p * tv) / 100).toFixed(2);
            const amount = (parseFloat(price) + parseFloat(a)).toFixed(2);
            return amount.toString();
        }
        return price;
    }

    public generateRandomString(): string {
        const length = 3;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }


    public async checkAndGenerateSlug(slug: any) { 
        const existingProduct = await VendorProductRepository.findOne({ where: { slug } });
        if (!existingProduct) {
            return slug;
        }
        const suffix = this.generateRandomString();
        let newSlug = `${slug}-${suffix}`;
        while (await VendorProductRepository.findOne({ where: { slug: newSlug } })) {
            newSlug = `${slug}-${this.generateRandomString()}`;
        }
        return newSlug;
    }


    public handleProductPrice2(price: string, taxClassId: any) {
        return price;
        if (!taxClassId) {
            return null;
        }
        if (taxClassId == 0) {
            return null;
        }
        return price;
    }

    public async productListRatings(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const query = await ProductRatingRepository.createQueryBuilder('ratings');
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                const operator: string = item.op;
                if (operator === 'where' && item.value !== undefined) {
                    query.andWhere(`${item.name} = :${item.name}`, { [item.name]: item.value });
                } else if (operator === 'like' && item.value !== undefined) {
                    query.andWhere(`${item.name} LIKE :${item.name}`, { [item.name]: `%${item.value}%` });
                } else if (operator === 'andWhere' && item.value !== undefined) {
                    query.andWhere(`${item.name} = :${item.name}`, { [item.name]: item.value });
                }
            });
        }
        query.andWhere('ratings.is_approved = :isApproved', { isApproved: 1 });
        query.orderBy('ratings.createdAt', 'DESC');
        if (limit && limit > 0) {
            query.take(limit).skip(offset);
        }
        if (count) {
            return query.getCount();
        } else {
            return query.getMany();
        }
    }

    public productRatignCalculations(product: any) {
        const p = product;
        const a = p.OneStarRatingCount;
        const b = p.TwoStarRatingCount;
        const c = p.ThreeStarRatingCount;
        const d = p.FourStarRatingCount;
        const e = p.FiveStarRatingCount;
        const x = [a, b, c, d, e];
        const stars = x.map((item, index) => {
            const check = Math.ceil((item / p.reviewCount) * 100);
            if (!check) {
                return 0;
            }
            return check;
        });
        const q = a * 1;
        const w = b * 2;
        const r = c * 3;
        const t = d * 4;
        const y = e * 5;
        let avgRating: any = (q + w + r + t + y) / p.reviewCount;
        if (avgRating) {
            avgRating = parseFloat(avgRating).toFixed(1);
        } else {
            avgRating = '0'
        }
        return {stars,avgRating,reviewCount: p.reviewCount}
    }

    public async getProductRatingByProductId(productId: number): Promise<any> {
        
        const p: any = await VendorProductRepository.findOne({ where: { id: productId } });
        const w = [
            { name: 'product_id', op: 'where', value: productId },
            { name: 'is_active', op: 'andWhere', value: 1 },
            { name: 'is_approved', op: 'andWhere', value: 1 }
        ];
        const totalReviews = await this.productListRatings(0, 0, 0, 0, w, false);
        for (let star = 1; star <= 5; star++) {
            if (star === 1) {
                p.OneStarRatingCount = totalReviews.filter(i => i.rating == star).length;
            }
            if (star === 2) {
                p.TwoStarRatingCount = totalReviews.filter(i => i.rating == star).length;
            }
            if (star === 3) {
                p.ThreeStarRatingCount = totalReviews.filter(i => i.rating == star).length;
            }
            if (star === 4) {
                p.FourStarRatingCount = totalReviews.filter(i => i.rating == star).length;
            }
            if (star === 5) {
                p.FiveStarRatingCount = totalReviews.filter(i => i.rating == star).length;
            }
        }
        p.reviewCount = totalReviews.length;
        const rating = this.productRatignCalculations(p);
        return rating;
    }

    
    public async updateProductsAllVendorProdVar(productVarId: number, vendorId: number): Promise<any> {
        const data = await VendorProductVariantRepository.findOne({
            where: { vendorId, id: productVarId },
        });
        if (!data) {
            return { status: 0, message: "wrong ID, no vendor product Variant exists", data: {} };
        }
        if (data.available == 1) {
            data.available = 0;
        } else if (data.available == 0) {
            data.available = 1;
        }
        // const data2 = await ProductVariantRepository.findOne({
        //     where: { id: data.productVariantId },
        // });
        // if (!data2) {
        //     return { status: 0, message: "Error: wrong ID, no product Variant exists", data2: {} };
        // }
        // if (data2.isActive == 1) {
        //     data2.isActive = 0;
        // } else if (data2.isActive == 0) {
        //     data2.isActive = 1;
        // }
        // else {
        // }
        await VendorProductVariantRepository.save(data);
        // await ProductVariantRepository.save(data2);
        return { status: 1, message: "Success", data: {} };
    }


    public async updateProd(productId: number, vendorId: number): Promise<any> {
        const data = await VendorProductRepository.findOne({
            where: { vendorId, productId: productId },
        });
        if (!data) {
            return { status: 0, message: "wrong ID, no product exists", data: {} };
        }
        if (data.statusId == 1) {
            data.statusId = 2;
        } else if (data.statusId == 2) {
            data.statusId = 1;
        }
        await VendorProductRepository.save(data);
        return { status: 1, message: "Success", data: {} };
    }


    public async updateVendorProdVar(productVarId: number, vendorId: number): Promise<any> {
        const data = await VendorProductVariantRepository.findOne({
            where: { vendorId, id: productVarId },
        });
        if (!data) {
            return { status: 0, message: "wrong ID, no vendor product Variant exists", data: {} };
        }
        if (data.isActive == 1) {
            data.isActive = 0;
        } else if (data.isActive == 0) {
            data.isActive = 1;
        }
        const data2 = await ProductVariantRepository.findOne({
            where: { id: data.productVariantId },
        });
        if (!data2) {
            return { status: 0, message: "Error: wrong ID, no product Variant exists", data2: {} };
        }
        if (data2.isActive == 1) {
            data2.isActive = 0;
        } else if (data2.isActive == 0) {
            data2.isActive = 1;
        }
        await VendorProductVariantRepository.save(data);
        await ProductVariantRepository.save(data2);
        return { status: 1, message: "Success", data: {} };
    }


    public async findProductRawQuery(productId: number, vendorId: number): Promise<any> {
        const selects = [
            'P.id as id',
            'P.name as name',
            'P.longDesc as longDesc',
            'P.moreInformation as moreInformation',
            'P.descEditorDesign as descEditorDesign',
            'P.shortDesc as shortDesc',
            'P.bulletPoints as bulletPoints',
            'VP.id as vendorProductId',
            'VP.slug as slug',
            'VP.vendorId as vendorId',
            'VP.isProductOwner as isProductOwner',
            'VP.searchKeywords as searchKeywords',
            'VP.returnDays as returnDays',
            'VP.taxClassId as taxClassId',
            'VP.sizeChartImage as sizeChartImage',
            'VP.fakeOrders as fakeOrders',
            // brands columns
            'B.id as brandId',
            'B.name as brandName',
            'B.image as brandImage',
            'B.slug as brandSlug',
            'B.isActive as brandisActive'
        ];
        return ProductRepository.createQueryBuilder('P')
            .innerJoin(VendorProduct, 'VP', 'VP.productId = P.id')
            .leftJoin(Brand, 'B', 'B.id = VP.brandId')
            .where('VP.productId = :productId', { productId })
            .select(selects)
            .getRawOne();
    }

    public async variantsByCategoryId(categoryId: number, siteId: number): Promise<any> {
        const selects = [
            'V.id as id',
            'V.name as name',
            'V.type as type',
            'V.acceptImages as acceptImages'
        ];
        const query: any = await VariantsToCategoryRepository.createQueryBuilder('VTC').innerJoin(Variant, 'V', 'V.id = VTC.variantId');
        query.where('VTC.isActive = 1 AND VTC.showOnCreateProductForm = 1');
        query.andWhere('VTC.categoryId = :categoryId', { categoryId });
        query.andWhere('VTC.siteId = :siteId', { siteId });
        query.select(selects);
        return query.getRawMany();
    }


    public async findProductVariants(productId: number): Promise<any> {
        const selects = [
            'VPV.id as vendorProductVariantId',
            'VPV.productId as productId',
            'VPV.vendorId as vendorId',
            'VPV.productVariantId as productVariantId',
            'VPV.price as price',
            'VPV.price2 as price2',
            'VPV.sku as sku',
            'VPV.quantity as quantity',
            'VPV.available as available',
            'PV.productVariantValuesId as varaint',
            'PD.price as sale_price',
            'PD.price2 as sale_price_2',
            'PD.startDate as start_sale_date',
            'PD.endDate as end_sale_date',
            'PD.showSaleEndDate as showSaleEndDate',
        ];
        const variants = await ProductVariantRepository.createQueryBuilder('PV')
            .innerJoin(VendorProductVariant, 'VPV', 'VPV.productVariantId = PV.id')
            .leftJoin(ProductDiscount, 'PD', 'PD.vendorProductVariantId = VPV.id')
            .where('PV.productId = :productId', { productId })
            .andWhere('PV.isActive = 1')
            .select(selects)
            .orderBy('VPV.id', 'ASC')
            .getRawMany();
        const ids = variants.map(v => v.productVariantId);
        const images = await ProductVariantImageRepository.find({ where: { productVariantsId: In(ids) } });
        // get Tax class for India
        let taxAmount = '0';
        if (variants.length > 0) {
            const VP = await VendorProductRepository.findOne({ where: { vendorId: variants[0].vendorId, productId: variants[0].productId } });
            if (VP) {
                const taxClassInfo = await TaxClassRepository.findOne({ where: { id: VP.taxClassId } });
                if (taxClassInfo) {
                    taxAmount = taxClassInfo.value;
                }
                // const p: any = parseFloat(price).toFixed(2);
                // const tv: any = parseFloat(taxAmountInfo.value).toFixed(2);
                // const a = ((p * tv) / 100).toFixed(2);
                // const amount = parseFloat(price) + parseFloat(a);
                // return amount.toString();
                // taxClassInfo.value
            }
        }
        return variants.map(v => {
            const a = images.filter(i => i.productVariantsId === v.productVariantId);
            if (taxAmount !== '0') {
                // const p: any = parseFloat(v.price).toFixed(2);
                // const tv: any = parseFloat(taxAmount).toFixed(2);
                // const rP: any = ((p * tv) / 100).toFixed(2);
                // console.log('=======================================================================================================', p, rP);
                // v.price = p - rP;
                // if (v.sale_price) {
                //     const s: any = parseFloat(v.sale_price).toFixed(2);
                //     const rSP: any = ((s * tv) / 100).toFixed(2);
                //     console.log('=======================================================================================================', s, rSP);
                //     v.sale_price = s - rSP;
                // }
                // const p: any = parseFloat(v.price).toFixed(2);
                if (v.price2) {
                    if (v.price2) {
                        v.price = parseFloat(v.price2).toFixed(2);
                    }
                }
                if (v.sale_price) {
                    if (v.sale_price_2) {
                        v.sale_price = parseFloat(v.sale_price_2).toFixed(2);
                    }
                }
            }
            return { ...v, images: a }
        })

    }


    public async productDetails(productId: number, vendorId: number, siteId: number, langId: number): Promise<any> {
        const slug = productSlug(siteId, productId);
        let product = await this.findProductRawQuery(productId, vendorId);
        const slugRegex = new RegExp(`[-]?${slug}`, 'g');
        product.slug = product.slug.replace(slugRegex, '');
        const productVaraints = await this.findProductVariants(productId);
        const productShippingInfo = await ProductShippingInfoRepository.find({ where: { productId, vendorId } });
        console.log("productShippingInfo", productShippingInfo);
        const sameDayProductPincodes = await SameDayProductPincodeRepository.find({ where: { product_id: productId, vendorId }, select: { pincode: true } });
        const openBoxProductPincodes = await OpenBoxProductPincodeRepository.find({ where: { productId, vendorId }, select: { pincode: true } });
        let productMetaInfo = await ProductMetaInfoRepository.findOne({ where: { productId, siteId, langId } })
        let obj = {
            ...product,
            productVaraints,
            productShippingInfo: productShippingInfo.map(i => {
                return { ...i, charges2: i.charges2, charges: i.charges }
            }),
            productMetaInfo,
        }
        if (sameDayProductPincodes.length > 0) {
            obj.sameDayProductPincodes = sameDayProductPincodes.map(p => p.pincode).join(',')
        }
        if (openBoxProductPincodes.length > 0) {
            obj.openBoxProductPincodes = openBoxProductPincodes.map(p => p.pincode).join(',')
        }
        return obj;
    }

    public async relatedProductSuggestion({ limit, offset, siteId, statusId, keyword, vendorId, viewType, categoryId, otherSeller, productId }: any): Promise<any> {
        let productIds = await VendorProductCategoryRepository.createQueryBuilder('VPC')
            .innerJoin(VendorProduct, 'VP', 'VPC.vendorProductId = VP.id')
            .where('VPC.categoryId = :cId', { cId: categoryId })
            .select('VPC.categoryId, VP.productId').getRawMany()
        productIds = productIds.map(obj => obj.product_id)
        const selects = [
            // P
            'P.name as name',
            // VPV
            'VPV.id as vendorProductVariantId',
            'VPV.vendorId as vendorId',
            'VPV.productId as productId',
            'VPV.siteId as siteId',
            'VPV.productVariantId as productVariantId',
            'VPV.price2 as price',
            'VPV.sku as sku',
            'VPV.available as available',
            'VPV.quantity as quantity',
            'VPV.outOfStock as outOfStock',
            // PV
            'PV.productVariantValuesId as variant',
            'PVImage.image as image',
            // VP
            'VP.createdAt as createdAt',
            'VP.statusId as statusId',
            'VP.slug as slug',
            'ProductStatus.name as statusName',
            'ProductStatus.colorCode as statusColorCode',
            'PD.price as discountPrice',
            'PD.startDate as discount_start_date',
            'PD.endDate as discount_end_date',
        ];
        const keywordCondition = 'LOWER(P.name) LIKE :keyword';
        //Vendor Query
        const query: any = await VendorProductVariantRepository.createQueryBuilder('VPV')
            .innerJoin(Product, 'P', 'VPV.productId = P.id')
            .innerJoin(VendorProduct, 'VP', 'VP.productId = VPV.productId')
            .innerJoin(ProductVariant, 'PV', 'PV.id = VPV.productVariantId')
            .leftJoin(ProductDiscount, 'PD', 'PD.vendorProductVariantId = VPV.id')
            .leftJoin(ProductVariantImage, 'PVImage', 'PVImage.productVariantsId = PV.id AND PVImage.isDefault = 1')
            .leftJoin(ProductStatus, 'ProductStatus', 'ProductStatus.id = VP.statusId')
            .where("VP.statusId = 1")
            .andWhere('VPV.siteId = :siteId', { siteId })
            .andWhere('P.id IN (:...productIds)', { productIds })
            // .andWhere('S.statusId = :status', { status: 'Active' });

            if(otherSeller === 0) {
                query.andWhere('VPV.vendorId = :vendorId', { vendorId })
                query.andWhere('VP.vendorId = :vendorId', { vendorId })
            }
            if(productId) {
                selects.push(`(SELECT CASE WHEN EXISTS (SELECT * FROM related_products WHERE VPV.id = related_variant_id AND product_id = ${productId}) THEN 1 ELSE 0 END) AS isRelated`);
                query.andWhere('P.id != :productId', { productId });
            } else {
                selects.push(`0 AS isRelated`);
            }
        if (keyword) {
            query.andWhere(keywordCondition, { keyword: `%${keyword.toLowerCase()}%` });
            // query1.andWhere(keywordCondition, { keyword: `%${keyword.toLowerCase()}%` });
        }
        if (statusId !== 0) {
            query.andWhere('VP.statusId = :statusId', { statusId });
            // query1.andWhere('VP.statusId = :statusId', { statusId });
        }
        if (limit !== 0) {
            query.limit(limit).offset(offset);
            // query1.limit(limit).offset(offset);
        }
        // 1: product wise, 2: variant wise. by default variant wise is there
        if (viewType === 1) {
            query.groupBy('VP.productId');
            // query1.groupBy('VP.productId');
        }
        const results = await query.select(selects).orderBy('VP.createdAt', 'DESC').getRawMany();
        delete query.expressionMap.limit;
        delete query.expressionMap.offset;
        const resultsCount = await query.orderBy('VP.createdAt', 'DESC').getRawMany();
        // const results1 = await query1.select(selects).orderBy('VP.createdAt', 'DESC').getRawMany();
        let data = results.map((item: any) => {
            return {
                ...item,
                variant: JSON.parse(item.variant)
            };
        })
        // let data1 = results1.map((item: any) => {
        //     return {
        //         ...item,
        //         variant: JSON.parse(item.variant)
        //     };
        // })
        return { vendorRelatedProducts: { totalCount: resultsCount.length, data }};
    }

    public async relatedProducts({ limit, offset, siteId, statusId, keyword, viewType, productId }: any): Promise<any> {
        const relatedVariantIds = await this.relatedProductsService.getRelatedVariants([productId])
        const selects = [
            // P
            'P.name as name',
            // VPV
            'VPV.id as vendorProductVariantId',
            'VPV.vendorId as vendorId',
            'VPV.productId as productId',
            'VPV.siteId as siteId',
            'VPV.productVariantId as productVariantId',
            'VPV.price2 as price',
            'VPV.sku as sku',
            'VPV.available as available',
            'VPV.quantity as quantity',
            'VPV.outOfStock as outOfStock',
            // PV
            'PV.productVariantValuesId as variant',
            'PVImage.image as image',
            // VP
            'VP.createdAt as createdAt',
            'VP.statusId as statusId',
            'VP.slug as slug',
            'ProductStatus.name as statusName',
            'ProductStatus.colorCode as statusColorCode',
            'PD.price as discountPrice',
            'PD.startDate as discount_start_date',
            'PD.endDate as discount_end_date',
        ];
        const keywordCondition = 'LOWER(P.name) LIKE :keyword';
        if(relatedVariantIds.length < 1 ) {
            return { vendorRelatedProducts: { totalCount: 0, data: [] }};
        }
        //Vendor Query
        const query: any = await VendorProductVariantRepository.createQueryBuilder('VPV')
            .innerJoin(Product, 'P', 'VPV.productId = P.id')
            .innerJoin(VendorProduct, 'VP', 'VP.productId = VPV.productId')
            .innerJoin(ProductVariant, 'PV', 'PV.id = VPV.productVariantId')
            .leftJoin(ProductVariantImage, 'PVImage', 'PVImage.productVariantsId = PV.id AND PVImage.isDefault = 1')
            .leftJoin(ProductStatus, 'ProductStatus', 'ProductStatus.id = VP.statusId')
            .leftJoin(ProductDiscount, 'PD', 'PD.vendorProductVariantId = VPV.id')
            .andWhere('VPV.siteId = :siteId', { siteId })
            .andWhere('VPV.id IN (:...relatedVariantIds)', { relatedVariantIds: relatedVariantIds });
        if (keyword) {
            query.andWhere(keywordCondition, { keyword: `%${keyword.toLowerCase()}%` });
        }
        if (statusId !== 0) {
            query.andWhere('VP.statusId = :statusId', { statusId });
        }
        if (limit !== 0) {
            query.limit(limit).offset(offset);
        }
        // 1: product wise, 2: variant wise. by default variant wise is there
        if (viewType === 1) {
            query.groupBy('VP.productId');
        }
        const results = await query.select(selects).orderBy('VP.createdAt', 'DESC').getRawMany();
        delete query.expressionMap.limit;
        delete query.expressionMap.offset;
        const resultsCount = await query.orderBy('VP.createdAt', 'DESC').getRawMany();
        // const results1 = await query1.select(selects).orderBy('VP.createdAt', 'DESC').getRawMany();

        let data = results.map((item: any) => {
            return {
                ...item,
                variant: JSON.parse(item.variant)
            };
        })
        // let data1 = results1.map((item: any) => {
        //     return {
        //         ...item,
        //         variant: JSON.parse(item.variant)
        //     };
        // })
        return { vendorRelatedProducts: { totalCount: resultsCount.length, data }};
    }

   
}