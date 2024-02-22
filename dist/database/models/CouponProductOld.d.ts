export declare class CouponProduct {
    id: number;
    vendorCouponId: number;
    productId: number;
    siteId: number;
    createdAt: string;
    updatedAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
