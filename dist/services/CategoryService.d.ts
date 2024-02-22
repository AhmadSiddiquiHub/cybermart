export declare class CategoryService {
    vendorCategories(siteId: number, parent: number, langId: number, userId: number): Promise<any>;
    categoryPath(catId: number): Promise<any>;
}
