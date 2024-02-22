import { ProductDiscount } from '../database/models/ProductDiscount';
export declare class ProductDiscountService {
    create(Data: any): Promise<ProductDiscount>;
    update(d: any): Promise<ProductDiscount>;
    findOne(id: any): Promise<ProductDiscount>;
    findOneValue(id: any): Promise<ProductDiscount>;
    findAll(productDiscount: any): Promise<ProductDiscount[]>;
    find(): Promise<ProductDiscount[]>;
    delete(id: any): Promise<any>;
    findDiscountPrice(vendorProductVariantId: number, todayDate: string): Promise<any>;
    findDiscountPricewithSku(vendorProductVariantId: number, skuId: number, todayDate: string): Promise<any>;
    findByVariantId(id: number, todayDate: any): Promise<any>;
    findAllVariantById(id: number, todayDate: any): Promise<any>;
    getAll_VariantDiscounts_OfProduct(ids: [number], todayDate: any): Promise<any>;
    findDiscountPricee(vendorProductVariantId: number, todaydate: string): Promise<any>;
    findDiscountPricewithSkuu(vendorProductVariantId: number, skuId: number, todaydate: string): Promise<any>;
    findByVariantIdd(id: number, todaydate: string): Promise<any>;
    findAllVariantByIdd(id: number, todaydate: string): Promise<any>;
    getAll_VariantDiscounts_OfProductt(ids: [number], todaydate: string): Promise<any>;
}
