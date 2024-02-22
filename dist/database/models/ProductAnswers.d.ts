export declare enum userType {
    BUYER = "Buyer",
    VENDOR = "Vendor",
    MANUFACTURER = "Manufacturer"
}
export declare class ProductAnswers {
    id: number;
    productQuestionId: number;
    answer: string;
    isActive: number;
    userId: number;
    userType: userType;
    createdAt: string;
    updatedAt: string;
}
