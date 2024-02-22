export declare class Coupon {
    couponId: number;
    vendorId: number;
    couponName: string;
    couponCode: string;
    type: string;
    value: number;
    valueType: number;
    maxUsage: number;
    startDate: string;
    minOrderAmount: number;
    maxDiscount: number;
    endDate: string;
    isStackable: number;
    isSignupCoupon: number;
    leftCount: number;
    siteId: number;
    isActive: number;
    createdAt: string;
    updatedAt: string;
    userBased: number;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
