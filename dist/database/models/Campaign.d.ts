import { CampaignVendors } from './CampaignVendors';
import { CampaignProducts } from './CampaignProducts';
import { CampaignPackage } from './CampaignPackages';
export declare class Campaign {
    id: number;
    campaignName: string;
    startDate: string;
    mainPageBanner: string;
    vendorRegBanner: string;
    endDate: string;
    siteId: number;
    status: string;
    slug: string;
    isActive: number;
    metaTitle: string;
    metaKeyword: string;
    metaDescription: string;
    campaignVendors: CampaignVendors[];
    campaignProducts: CampaignProducts[];
    campaignPackage: CampaignPackage[];
}
