export declare class ProductQuestions {
    id: number;
    productId: number;
    siteId: number;
    vendorId: number;
    question_: string;
    answered: number;
    isActive: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
