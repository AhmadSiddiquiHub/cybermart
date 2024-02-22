import { Campaign } from './Campaign';
import { Users } from './Users';
export declare class CampaignVendors {
    id: number;
    campaignId: number;
    vendorId: number;
    campaign: Campaign[];
    vendors: Users[];
    createdAt: string;
    updatedAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
