export declare class ProductDiscount {
    id: number;
    vendorProductVariantId: number;
    price: string;
    price2: string;
    startDate: string;
    endDate: string;
    showSaleEndDate: number;
    createdAt: string;
    updatedAt: string;
    isActive: number;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
