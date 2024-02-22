export declare class VendorProductStatusLog {
    id: number;
    productId: number;
    vendorId: number;
    updatedBy: number;
    productStatus: number;
    comments: string;
    createdAt: string;
    createDetails(): Promise<void>;
}
