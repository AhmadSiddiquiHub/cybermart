import { Campaign } from './Campaign';
export declare class CampaignProducts {
    id: number;
    campaignId: number;
    productId: number;
    vendorId: number;
    campaign: Campaign;
    createdAt: string;
    updatedAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
