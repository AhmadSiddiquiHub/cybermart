export declare class CouponUser {
    id: number;
    couponId: number;
    userId: number;
    siteId: number;
    createdAt: string;
    updatedAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
