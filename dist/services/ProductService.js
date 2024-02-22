"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const database_1 = require("../database");
const Product_1 = require("../database/models/Product");
const ProductStatus_1 = require("../database/models/ProductStatus");
const ProductVariant_1 = require("../database/models/ProductVariant");
const Variant_1 = require("../database/models/Variant");
const VendorProduct_1 = require("../database/models/VendorProduct");
const Brand_1 = require("../database/models/Brand");
const VendorProductVariant_1 = require("../database/models/VendorProductVariant");
const UserProductPreference_1 = require("../database/models/UserProductPreference");
const ProductVariantImage_1 = require("../database/models/ProductVariantImage");
const ProductDiscount_1 = require("../database/models/ProductDiscount");
const utils_1 = require("../utils");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const RelatedProductService_1 = require("./RelatedProductService");
let ProductService = class ProductService {
    constructor(relatedProductsService) {
        this.relatedProductsService = relatedProductsService;
    }
    async createDefaultPreferences(userId) {
        const defaultPrefs = await database_1.ProductPreferenceRepository.find({ where: { isActive: 1 } });
        const arr = defaultPrefs.map((item) => item.id);
        const preferences = arr.map((item) => {
            return {
                userId,
                productPreferenceId: item,
            };
        });
        return database_1.UserProductPreferenceRepository.save(preferences);
    }
    async productTablePreferences(userId) {
        const selects = [
            'PP.id as id',
            'PP.col as col',
            'PP.colType as colType',
            'PP.colName as colName',
            'PP.mandatory as mandatory',
            'VPP.id as isActive',
        ];
        const results = await database_1.ProductPreferenceRepository.createQueryBuilder('PP')
            .leftJoin(UserProductPreference_1.UserProductPreference, 'VPP', 'VPP.productPreferenceId = PP.id AND VPP.userId = :userId', { userId })
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
    async productListing({ limit, offset, siteId, statusId, keyword, vendorId, viewType }) {
        const selects = [
            'P.name as name',
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
            'PV.productVariantValuesId as variant',
            'PVImage.image as image',
            'VP.createdAt as createdAt',
            'VP.statusId as statusId',
            'VP.slug as slug',
            'ProductStatus.name as statusName',
            'ProductStatus.colorCode as statusColorCode',
            'PD.price2 as discountPrice',
            'PD.startDate as discountStartDate',
            'PD.endDate as discountEndDate',
            'PD.showSaleEndDate as showSaleEndDate'
        ];
        const PDCondition = 'PD.vendorProductVariantId = VPV.id';
        const keywordCondition = 'LOWER(P.name) LIKE :keyword';
        const query = await database_1.VendorProductVariantRepository.createQueryBuilder('VPV')
            .innerJoin(Product_1.Product, 'P', 'VPV.productId = P.id')
            .innerJoin(VendorProduct_1.VendorProduct, 'VP', 'VP.productId = VPV.productId AND VP.vendorId = :vendorId', { vendorId })
            .innerJoin(ProductVariant_1.ProductVariant, 'PV', 'PV.id = VPV.productVariantId AND PV.isActive = 1')
            .leftJoin(ProductVariantImage_1.ProductVariantImage, 'PVImage', 'PVImage.productVariantsId = PV.id AND PVImage.isDefault = 1')
            .leftJoin(ProductStatus_1.ProductStatus, 'ProductStatus', 'ProductStatus.id = VP.statusId')
            .leftJoin(ProductDiscount_1.ProductDiscount, 'PD', PDCondition, { today: (0, utils_1.todayDate)() })
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
        if (viewType === 1) {
            query.groupBy('VP.productId');
        }
        const results = await query.select(selects).orderBy('VP.productId', 'DESC').getRawMany();
        const data = results.map((item) => {
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
    async productListingCountStats({ siteId, vendorId, viewType }) {
        const selects = [
            `COUNT(case VP.statusId when 1 then 1 else null end) as Active`,
            `COUNT(case VP.statusId when 2 then 1 else null end) as InActive`,
            `COUNT(case VP.statusId when 3 then 1 else null end) as Draft`,
            `COUNT(case VP.statusId when 4 then 1 else null end) as Rejected`,
            `COUNT(case VP.statusId when 5 then 1 else null end) as PendingApproval`,
            `COUNT(case VP.statusId when 6 then 1 else null end) as ImprovementsRequired`,
        ];
        const query = await database_1.VendorProductVariantRepository.createQueryBuilder('VPV')
            .innerJoin(Product_1.Product, 'P', 'VPV.productId = P.id')
            .innerJoin(VendorProduct_1.VendorProduct, 'VP', 'VP.productId = VPV.productId AND VP.vendorId = VPV.vendorId')
            .innerJoin(ProductVariant_1.ProductVariant, 'PV', 'PV.id = VPV.productVariantId')
            .where('VPV.vendorId = :vendorId', { vendorId })
            .andWhere('VPV.siteId = :siteId', { siteId });
        if (viewType === 1) {
            query.groupBy('VP.productId');
        }
        return await query.select(selects).orderBy('VP.productId', 'DESC').getRawOne();
    }
    async calculateTaxForIndiaByClass(price, taxClassId) {
        if (!taxClassId) {
            return price;
        }
        if (taxClassId == 0) {
            return price;
        }
        const taxAmountInfo = await database_1.TaxClassRepository.findOne({ where: { id: Number(taxClassId) } });
        if (taxAmountInfo) {
            const p = parseFloat(price).toFixed(2);
            const tv = parseFloat(taxAmountInfo.value).toFixed(2);
            const a = ((p * tv) / 100).toFixed(2);
            const amount = (parseFloat(price) + parseFloat(a)).toFixed(2);
            return amount.toString();
        }
        return price;
    }
    generateRandomString() {
        const length = 3;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    async checkAndGenerateSlug(slug) {
        const existingProduct = await database_1.VendorProductRepository.findOne({ where: { slug } });
        if (!existingProduct) {
            return slug;
        }
        const suffix = this.generateRandomString();
        let newSlug = `${slug}-${suffix}`;
        while (await database_1.VendorProductRepository.findOne({ where: { slug: newSlug } })) {
            newSlug = `${slug}-${this.generateRandomString()}`;
        }
        return newSlug;
    }
    handleProductPrice2(price, taxClassId) {
        return price;
        if (!taxClassId) {
            return null;
        }
        if (taxClassId == 0) {
            return null;
        }
        return price;
    }
    async productListRatings(limit, offset, select = [], relation = [], whereConditions = [], count) {
        const query = await database_1.ProductRatingRepository.createQueryBuilder('ratings');
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                const operator = item.op;
                if (operator === 'where' && item.value !== undefined) {
                    query.andWhere(`${item.name} = :${item.name}`, { [item.name]: item.value });
                }
                else if (operator === 'like' && item.value !== undefined) {
                    query.andWhere(`${item.name} LIKE :${item.name}`, { [item.name]: `%${item.value}%` });
                }
                else if (operator === 'andWhere' && item.value !== undefined) {
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
        }
        else {
            return query.getMany();
        }
    }
    productRatignCalculations(product) {
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
        let avgRating = (q + w + r + t + y) / p.reviewCount;
        if (avgRating) {
            avgRating = parseFloat(avgRating).toFixed(1);
        }
        else {
            avgRating = '0';
        }
        return { stars, avgRating, reviewCount: p.reviewCount };
    }
    async getProductRatingByProductId(productId) {
        const p = await database_1.VendorProductRepository.findOne({ where: { id: productId } });
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
    async updateProductsAllVendorProdVar(productVarId, vendorId) {
        const data = await database_1.VendorProductVariantRepository.findOne({
            where: { vendorId, id: productVarId },
        });
        if (!data) {
            return { status: 0, message: "wrong ID, no vendor product Variant exists", data: {} };
        }
        if (data.available == 1) {
            data.available = 0;
        }
        else if (data.available == 0) {
            data.available = 1;
        }
        await database_1.VendorProductVariantRepository.save(data);
        return { status: 1, message: "Success", data: {} };
    }
    async updateProd(productId, vendorId) {
        const data = await database_1.VendorProductRepository.findOne({
            where: { vendorId, productId: productId },
        });
        if (!data) {
            return { status: 0, message: "wrong ID, no product exists", data: {} };
        }
        if (data.statusId == 1) {
            data.statusId = 2;
        }
        else if (data.statusId == 2) {
            data.statusId = 1;
        }
        await database_1.VendorProductRepository.save(data);
        return { status: 1, message: "Success", data: {} };
    }
    async updateVendorProdVar(productVarId, vendorId) {
        const data = await database_1.VendorProductVariantRepository.findOne({
            where: { vendorId, id: productVarId },
        });
        if (!data) {
            return { status: 0, message: "wrong ID, no vendor product Variant exists", data: {} };
        }
        if (data.isActive == 1) {
            data.isActive = 0;
        }
        else if (data.isActive == 0) {
            data.isActive = 1;
        }
        const data2 = await database_1.ProductVariantRepository.findOne({
            where: { id: data.productVariantId },
        });
        if (!data2) {
            return { status: 0, message: "Error: wrong ID, no product Variant exists", data2: {} };
        }
        if (data2.isActive == 1) {
            data2.isActive = 0;
        }
        else if (data2.isActive == 0) {
            data2.isActive = 1;
        }
        await database_1.VendorProductVariantRepository.save(data);
        await database_1.ProductVariantRepository.save(data2);
        return { status: 1, message: "Success", data: {} };
    }
    async findProductRawQuery(productId, vendorId) {
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
            'B.id as brandId',
            'B.name as brandName',
            'B.image as brandImage',
            'B.slug as brandSlug',
            'B.isActive as brandisActive'
        ];
        return database_1.ProductRepository.createQueryBuilder('P')
            .innerJoin(VendorProduct_1.VendorProduct, 'VP', 'VP.productId = P.id')
            .leftJoin(Brand_1.Brand, 'B', 'B.id = VP.brandId')
            .where('VP.productId = :productId', { productId })
            .select(selects)
            .getRawOne();
    }
    async variantsByCategoryId(categoryId, siteId) {
        const selects = [
            'V.id as id',
            'V.name as name',
            'V.type as type',
            'V.acceptImages as acceptImages'
        ];
        const query = await database_1.VariantsToCategoryRepository.createQueryBuilder('VTC').innerJoin(Variant_1.Variant, 'V', 'V.id = VTC.variantId');
        query.where('VTC.isActive = 1 AND VTC.showOnCreateProductForm = 1');
        query.andWhere('VTC.categoryId = :categoryId', { categoryId });
        query.andWhere('VTC.siteId = :siteId', { siteId });
        query.select(selects);
        return query.getRawMany();
    }
    async findProductVariants(productId) {
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
        const variants = await database_1.ProductVariantRepository.createQueryBuilder('PV')
            .innerJoin(VendorProductVariant_1.VendorProductVariant, 'VPV', 'VPV.productVariantId = PV.id')
            .leftJoin(ProductDiscount_1.ProductDiscount, 'PD', 'PD.vendorProductVariantId = VPV.id')
            .where('PV.productId = :productId', { productId })
            .andWhere('PV.isActive = 1')
            .select(selects)
            .orderBy('VPV.id', 'ASC')
            .getRawMany();
        const ids = variants.map(v => v.productVariantId);
        const images = await database_1.ProductVariantImageRepository.find({ where: { productVariantsId: (0, typeorm_1.In)(ids) } });
        let taxAmount = '0';
        if (variants.length > 0) {
            const VP = await database_1.VendorProductRepository.findOne({ where: { vendorId: variants[0].vendorId, productId: variants[0].productId } });
            if (VP) {
                const taxClassInfo = await database_1.TaxClassRepository.findOne({ where: { id: VP.taxClassId } });
                if (taxClassInfo) {
                    taxAmount = taxClassInfo.value;
                }
            }
        }
        return variants.map(v => {
            const a = images.filter(i => i.productVariantsId === v.productVariantId);
            if (taxAmount !== '0') {
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
            return { ...v, images: a };
        });
    }
    async productDetails(productId, vendorId, siteId, langId) {
        const slug = (0, utils_1.productSlug)(siteId, productId);
        let product = await this.findProductRawQuery(productId, vendorId);
        const slugRegex = new RegExp(`[-]?${slug}`, 'g');
        product.slug = product.slug.replace(slugRegex, '');
        const productVaraints = await this.findProductVariants(productId);
        const productShippingInfo = await database_1.ProductShippingInfoRepository.find({ where: { productId, vendorId } });
        console.log("productShippingInfo", productShippingInfo);
        const sameDayProductPincodes = await database_1.SameDayProductPincodeRepository.find({ where: { product_id: productId, vendorId }, select: { pincode: true } });
        const openBoxProductPincodes = await database_1.OpenBoxProductPincodeRepository.find({ where: { productId, vendorId }, select: { pincode: true } });
        let productMetaInfo = await database_1.ProductMetaInfoRepository.findOne({ where: { productId, siteId, langId } });
        let obj = {
            ...product,
            productVaraints,
            productShippingInfo: productShippingInfo.map(i => {
                return { ...i, charges2: i.charges2, charges: i.charges };
            }),
            productMetaInfo,
        };
        if (sameDayProductPincodes.length > 0) {
            obj.sameDayProductPincodes = sameDayProductPincodes.map(p => p.pincode).join(',');
        }
        if (openBoxProductPincodes.length > 0) {
            obj.openBoxProductPincodes = openBoxProductPincodes.map(p => p.pincode).join(',');
        }
        return obj;
    }
    async relatedProductSuggestion({ limit, offset, siteId, statusId, keyword, vendorId, viewType, categoryId, otherSeller, productId }) {
        let productIds = await database_1.VendorProductCategoryRepository.createQueryBuilder('VPC')
            .innerJoin(VendorProduct_1.VendorProduct, 'VP', 'VPC.vendorProductId = VP.id')
            .where('VPC.categoryId = :cId', { cId: categoryId })
            .select('VPC.categoryId, VP.productId').getRawMany();
        productIds = productIds.map(obj => obj.product_id);
        const selects = [
            'P.name as name',
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
            'PV.productVariantValuesId as variant',
            'PVImage.image as image',
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
        const query = await database_1.VendorProductVariantRepository.createQueryBuilder('VPV')
            .innerJoin(Product_1.Product, 'P', 'VPV.productId = P.id')
            .innerJoin(VendorProduct_1.VendorProduct, 'VP', 'VP.productId = VPV.productId')
            .innerJoin(ProductVariant_1.ProductVariant, 'PV', 'PV.id = VPV.productVariantId')
            .leftJoin(ProductDiscount_1.ProductDiscount, 'PD', 'PD.vendorProductVariantId = VPV.id')
            .leftJoin(ProductVariantImage_1.ProductVariantImage, 'PVImage', 'PVImage.productVariantsId = PV.id AND PVImage.isDefault = 1')
            .leftJoin(ProductStatus_1.ProductStatus, 'ProductStatus', 'ProductStatus.id = VP.statusId')
            .where("VP.statusId = 1")
            .andWhere('VPV.siteId = :siteId', { siteId })
            .andWhere('P.id IN (:...productIds)', { productIds });
        if (otherSeller === 0) {
            query.andWhere('VPV.vendorId = :vendorId', { vendorId });
            query.andWhere('VP.vendorId = :vendorId', { vendorId });
        }
        if (productId) {
            selects.push(`(SELECT CASE WHEN EXISTS (SELECT * FROM related_products WHERE VPV.id = related_variant_id AND product_id = ${productId}) THEN 1 ELSE 0 END) AS isRelated`);
            query.andWhere('P.id != :productId', { productId });
        }
        else {
            selects.push(`0 AS isRelated`);
        }
        if (keyword) {
            query.andWhere(keywordCondition, { keyword: `%${keyword.toLowerCase()}%` });
        }
        if (statusId !== 0) {
            query.andWhere('VP.statusId = :statusId', { statusId });
        }
        if (limit !== 0) {
            query.limit(limit).offset(offset);
        }
        if (viewType === 1) {
            query.groupBy('VP.productId');
        }
        const results = await query.select(selects).orderBy('VP.createdAt', 'DESC').getRawMany();
        delete query.expressionMap.limit;
        delete query.expressionMap.offset;
        const resultsCount = await query.orderBy('VP.createdAt', 'DESC').getRawMany();
        let data = results.map((item) => {
            return {
                ...item,
                variant: JSON.parse(item.variant)
            };
        });
        return { vendorRelatedProducts: { totalCount: resultsCount.length, data } };
    }
    async relatedProducts({ limit, offset, siteId, statusId, keyword, viewType, productId }) {
        const relatedVariantIds = await this.relatedProductsService.getRelatedVariants([productId]);
        const selects = [
            'P.name as name',
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
            'PV.productVariantValuesId as variant',
            'PVImage.image as image',
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
        if (relatedVariantIds.length < 1) {
            return { vendorRelatedProducts: { totalCount: 0, data: [] } };
        }
        const query = await database_1.VendorProductVariantRepository.createQueryBuilder('VPV')
            .innerJoin(Product_1.Product, 'P', 'VPV.productId = P.id')
            .innerJoin(VendorProduct_1.VendorProduct, 'VP', 'VP.productId = VPV.productId')
            .innerJoin(ProductVariant_1.ProductVariant, 'PV', 'PV.id = VPV.productVariantId')
            .leftJoin(ProductVariantImage_1.ProductVariantImage, 'PVImage', 'PVImage.productVariantsId = PV.id AND PVImage.isDefault = 1')
            .leftJoin(ProductStatus_1.ProductStatus, 'ProductStatus', 'ProductStatus.id = VP.statusId')
            .leftJoin(ProductDiscount_1.ProductDiscount, 'PD', 'PD.vendorProductVariantId = VPV.id')
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
        if (viewType === 1) {
            query.groupBy('VP.productId');
        }
        const results = await query.select(selects).orderBy('VP.createdAt', 'DESC').getRawMany();
        delete query.expressionMap.limit;
        delete query.expressionMap.offset;
        const resultsCount = await query.orderBy('VP.createdAt', 'DESC').getRawMany();
        let data = results.map((item) => {
            return {
                ...item,
                variant: JSON.parse(item.variant)
            };
        });
        return { vendorRelatedProducts: { totalCount: resultsCount.length, data } };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [RelatedProductService_1.RelatedProductService])
], ProductService);
//# sourceMappingURL=ProductService.js.map