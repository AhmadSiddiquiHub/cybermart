export declare class VendorProductVariantService {
    generateRandomString(length: number): string;
    checkAndGenerateSKU(sku: string, whereCondition: any, vendorId: any): Promise<string>;
}
