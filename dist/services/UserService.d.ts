export declare class UserService {
    findByIds(ids: any): Promise<any>;
    sellerAccData(userId: any): Promise<any>;
    vendorMarketplaces(userId: number): Promise<any>;
    checkVendorProfileCompleted(userId: number): Promise<any>;
}
