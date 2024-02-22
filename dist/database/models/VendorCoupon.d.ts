export declare class VendorCoupon {
    vendorCouponId: number;
    vendorId: number;
    couponName: string;
    couponCode: string;
    couponType: number;
    value: number;
    couponDescription: string;
    maxUsage: number;
    startDate: string;
    endDate: string;
    isActive: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
