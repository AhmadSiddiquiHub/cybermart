interface QaListParams {
    limit: number;
    offset: number;
    siteId: number;
    productId: number;
    keyword: string;
    count: boolean;
}
export declare class ProductQuestionsService {
    qaList({ limit, offset, siteId, productId, keyword, count }: QaListParams): Promise<any>;
    qaListForVendorr(limit: number, offset: number, siteId: number, vendorId: any, count: any, orderBy: any): Promise<any>;
    list(limit: any, offset: any, select: any, search: any, whereConditions: any, count: number | boolean): Promise<any>;
}
export {};
