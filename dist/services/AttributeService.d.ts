import { SiteService } from './SiteService';
export declare class AttributeService {
    private siteService;
    constructor(siteService: SiteService);
    getProductAttributes(catId: number, siteId: string): Promise<any>;
}
