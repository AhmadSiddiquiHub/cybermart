export declare class UserFavCategory {
    id: number;
    userId: number;
    catId: number;
    siteId: number;
    createdAt: string;
    updatedAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
