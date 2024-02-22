export declare class RelatedProductService {
    constructor();
    setRelatedProducts(productId: number, relatedVariantIds: number[]): Promise<import("typeorm").InsertResult>;
    getRelatedVariants(productId: number[]): Promise<number[]>;
}
