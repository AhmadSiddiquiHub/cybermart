import { ProductDiscount } from '../database/models/ProductDiscount';
import { ProductDiscountRepository } from '../database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductDiscountService {

    public async findDiscountPricee(vendorProductVariantId: number, todaydate: string): Promise<any> {

        const query: any = await ProductDiscountRepository.createQueryBuilder('productDiscount');
        query.select(['productDiscount.price as price', 'productDiscount.startDate as startDate', 'productDiscount.endDate as endDate']);
        query.where('productDiscount.vendorProductVariantId = ' + vendorProductVariantId);
        query.andWhere('(productDiscount.startDate <= :todaydate AND productDiscount.endDate >= :todaydate)', {todaydate});
        query.orderBy('productDiscount.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }

    public async findDiscountPricewithSkuu(vendorProductVariantId: number, skuId: number, todaydate: string): Promise<any> {
        const query: any = await ProductDiscountRepository.createQueryBuilder('productDiscount');
        query.select(['productDiscount.price as price', 'productDiscount.startDate as startDate', 'productDiscount.endDate as endDate']);
        query.where('productDiscount.vendorProductVariantId = ' + vendorProductVariantId);
        query.where('productDiscount.skuId = ' + skuId);
        query.andWhere('(productDiscount.startDate <= :todaydate AND productDiscount.endDate >= :todaydate)', {todaydate});
        query.orderBy('productDiscount.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }

    public async findByVariantIdd(id: number, todaydate: string): Promise<any> {
        const selects = [
            'pd.price as price',
            'pd.startDate as startDate',
            'pd.endDate as endDate',
            'pd.vendorProductVariantId as vendorProductVariantId',
            'pd.id as productDiscountId',
        ];
        const query: any = await ProductDiscountRepository.createQueryBuilder('pd');
        query.select(selects);
        query.where('pd.vendorProductVariantId = :id ', {id});
        query.andWhere('(pd.startDate <= :todaydate AND pd.endDate >= :todaydate)', {todaydate});
        query.orderBy('pd.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }
    public async findAllVariantByIdd(id: number, todaydate: string): Promise<any> {
        const selects = [
            'pd.price as price',
            'pd.startDate as startDate',
            'pd.endDate as endDate',
            'pd.vendorProductVariantId as vendorProductVariantId',
            'pd.id as productDiscountId',
        ];
        const query: any = await ProductDiscountRepository.createQueryBuilder('pd');
        query.select(selects);
        query.where('pd.vendorProductVariantId = :id ', { id });
        query.andWhere('(pd.startDate <= :todaydate AND pd.endDate >= :todaydate)', { todaydate });
        query.orderBy('pd.price', 'ASC');
        return query.getRawMany();
    }
    public async getAll_VariantDiscounts_OfProductt(ids: [number], todaydate: string): Promise<any> {
        const selects = [
            'pd.price as price',
            'pd.startDate as startDate',
            'pd.endDate as endDate',
            'pd.vendorProductVariantId as vendorProductVariantId',
            'pd.id as productDiscountId',
        ];
        const query: any = await ProductDiscountRepository.createQueryBuilder('pd');
        query.select(selects);
        query.where('pd.vendorProductVariantId IN (' + ids + ')');
        query.andWhere('(pd.startDate <= :todaydate AND pd.endDate >= :todaydate)', { todaydate });
        query.orderBy('pd.price', 'ASC');
        return query.getRawMany();
    }

    // create a data
    public async create(Data: any): Promise<ProductDiscount> {
        return ProductDiscountRepository.save(Data);
    }
    public async update(d: any): Promise<ProductDiscount> {
        return ProductDiscountRepository.save(d);
    }
    // findone a data
    public findOne(id: any): Promise<ProductDiscount> {
        return ProductDiscountRepository.findOne(id);
    }

    // findone a data
    public findOneValue(id: any): Promise<ProductDiscount> {
        return ProductDiscountRepository.findOne(id);
    }
    // find a data
    public findAll(productDiscount: any): Promise<ProductDiscount[]> {
        return ProductDiscountRepository.find(productDiscount);
    }

    // find a data
    public find(): Promise<ProductDiscount[]> {
        return ProductDiscountRepository.find();
    }
    // delete product option
    public async delete(id: any): Promise<any> {
        const deleteProductDiscount = await ProductDiscountRepository.delete(id);
        return deleteProductDiscount;
    }

    // find special price
    public async findDiscountPrice(vendorProductVariantId: number, todayDate: string): Promise<any> {
        return await this.findDiscountPricee(vendorProductVariantId, todayDate);
    }

    // find discount price with sku
    public async findDiscountPricewithSku(vendorProductVariantId: number, skuId: number, todayDate: string): Promise<any> {
        return await this.findDiscountPricewithSkuu(vendorProductVariantId, skuId, todayDate);
    }
    public async findByVariantId(id: number, todayDate: any): Promise<any> {
        return await this.findByVariantIdd(id, todayDate);
    }
    public async findAllVariantById(id: number, todayDate: any): Promise<any> {
        return await this.findAllVariantByIdd(id, todayDate);
    }

    public async getAll_VariantDiscounts_OfProduct(ids: [number], todayDate: any): Promise<any> {
        return await this.getAll_VariantDiscounts_OfProductt(ids, todayDate);
    }

}
