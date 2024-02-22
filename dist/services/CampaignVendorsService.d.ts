import { CampaignVendors } from '../database/models/CampaignVendors';
import { SubOrderService } from './SubOrderService';
export declare class CampaignVendorsService {
    private subOrderService;
    constructor(subOrderService: SubOrderService);
    stats(request: any): Promise<{
        name: string;
        value: any;
        icon: string;
    }[]>;
    list(limit: any, offset: any, select: any, search: any, whereConditions: any, count: number | boolean): Promise<any>;
    getRegisteredCampaignsData(vendorId: number, today: string): Promise<any>;
    listByQueryBuilder(limit: number, offset: number, select?: any, whereConditions?: any, searchConditions?: any, relations?: any, groupBy?: any, sort?: any, count?: boolean, rawQuery?: boolean): Promise<CampaignVendors[] | number>;
}
