export declare class VendorStoreProfile {
    id: number;
    userId: number;
    storeName: string;
    siteId: number;
    profileImage: string;
    backgroundImage: string;
    bucketPath: string;
    slug: string;
    createdAt: string;
    updateAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
