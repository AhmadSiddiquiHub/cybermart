export declare class SiteUser {
    id: number;
    siteId: number;
    userId: number;
    isActive: number;
    createdAt: string;
    updateAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
