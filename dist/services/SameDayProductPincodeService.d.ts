export declare class SameDayProductPincodeService {
    constructor();
    bulkCreate(pincodes: number[], vendorId: number, productId: number, edit?: boolean): Promise<boolean>;
    setSameDayProductPincodes(vendorId: any, productId: any, pincodes: any): Promise<boolean>;
    findPincodesByProductId(productId: number): Promise<any[]>;
}
