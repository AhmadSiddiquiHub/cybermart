import { ProductService } from './ProductService';
export declare class CampaignService {
    private productService;
    constructor(productService: ProductService);
    list(vendorId: number, limit: number, offset: number): Promise<any>;
    vendorProductsInCampaign(request: any, campaignId: number): Promise<any>;
}
