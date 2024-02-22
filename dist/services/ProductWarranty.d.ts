export declare class ProductWarrantyService {
    constructor();
    getProductWarrantyTypes(productDetails: any): Promise<any>;
    getProductWarranty(productDetails: any): Promise<any>;
    insertWarranty(pw: any, vendorProductId: number): Promise<void>;
    updateWarranty(pw: any, vendorProductId: number): Promise<void>;
}
