export declare class ProductVariant {
    id: number;
    productId: number;
    productVariantValuesId: string;
    isActive: number;
    createdAt: string;
    updatedAt: string;
    magentoId: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
