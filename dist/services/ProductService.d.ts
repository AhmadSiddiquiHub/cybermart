import { RelatedProductService } from './RelatedProductService';
interface ProductListingFuncInterface {
    viewType: number;
    limit?: number;
    offset?: number;
    siteId: number;
    statusId: number;
    vendorId: number;
    keyword?: string;
}
export declare class ProductService {
    private relatedProductsService;
    constructor(relatedProductsService: RelatedProductService);
    createDefaultPreferences(userId: number): Promise<any>;
    productTablePreferences(userId: number): Promise<any>;
    productListing({ limit, offset, siteId, statusId, keyword, vendorId, viewType }: ProductListingFuncInterface): Promise<any>;
    productListingCountStats({ siteId, vendorId, viewType }: ProductListingFuncInterface): Promise<any>;
    calculateTaxForIndiaByClass(price: string, taxClassId: any): Promise<string>;
    generateRandomString(): string;
    checkAndGenerateSlug(slug: any): Promise<any>;
    handleProductPrice2(price: string, taxClassId: any): string;
    productListRatings(limit: number, offset: number, select: any, relation: any, whereConditions: any, count: number | boolean): Promise<any>;
    productRatignCalculations(product: any): {
        stars: number[];
        avgRating: any;
        reviewCount: any;
    };
    getProductRatingByProductId(productId: number): Promise<any>;
    updateProductsAllVendorProdVar(productVarId: number, vendorId: number): Promise<any>;
    updateProd(productId: number, vendorId: number): Promise<any>;
    updateVendorProdVar(productVarId: number, vendorId: number): Promise<any>;
    findProductRawQuery(productId: number, vendorId: number): Promise<any>;
    variantsByCategoryId(categoryId: number, siteId: number): Promise<any>;
    findProductVariants(productId: number): Promise<any>;
    productDetails(productId: number, vendorId: number, siteId: number, langId: number): Promise<any>;
    relatedProductSuggestion({ limit, offset, siteId, statusId, keyword, vendorId, viewType, categoryId, otherSeller, productId }: any): Promise<any>;
    relatedProducts({ limit, offset, siteId, statusId, keyword, viewType, productId }: any): Promise<any>;
}
export {};
