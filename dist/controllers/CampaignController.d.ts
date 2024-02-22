import { RegisterCampaignRequest, SellerCampaignListingRequest, UpdateCampaignProductPricingRequest, UpdateCampaignRequest } from "src/requests";
import { CampaignService } from "src/services/CampaignService";
import { CampaignVendorsService } from "src/services/CampaignVendorsService";
import { ProductService } from "src/services/ProductService";
export declare class CampaignController {
    private productService;
    private campaignService;
    private campaignVendorsService;
    constructor(productService: ProductService, campaignService: CampaignService, campaignVendorsService: CampaignVendorsService);
    registerCampaign(campaignParam: RegisterCampaignRequest, request: any, response: any): Promise<any>;
    updateCampaign(campaignParam: UpdateCampaignRequest, request: any, response: any): Promise<any>;
    listCampaign(params: SellerCampaignListingRequest, request: any, response: any): Promise<any>;
    campaignDetail(request: any, response: any): Promise<any>;
    deleteCampaign(campaignId: number, request: any, response: any): Promise<any>;
    updateProductPricing(params: UpdateCampaignProductPricingRequest, request: any, response: any): Promise<any>;
    deactivateCampaign(campaignId: number, request: any, response: any): Promise<any>;
}
