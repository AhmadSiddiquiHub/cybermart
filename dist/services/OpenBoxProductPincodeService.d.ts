export declare class OpenBoxProductPincodeService {
    constructor();
    bulkCreate(pincodes: number[], vendorId: number, productId: number, edit?: boolean): Promise<boolean>;
    setOpenBoxProductPincodes(vendorId: any, productId: any, pincodes: any): Promise<boolean>;
}
