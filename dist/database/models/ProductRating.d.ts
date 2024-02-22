export declare class ProductRating {
    id: number;
    productId: number;
    userId: number;
    subOrderId: number;
    rating: string;
    review: string;
    isActive: number;
    createdAt: string;
    updatedAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
