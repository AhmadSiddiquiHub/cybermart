import { Injectable } from '@nestjs/common';
import { CampaignProductsRepository, CampaignRepository } from '../database';
import { ProductService } from './ProductService';

@Injectable()
export class CampaignService {

    constructor(
        private productService: ProductService,
    ) {
    }

    public async list(vendorId: number, limit: number, offset: number): Promise<any> {
        const today = new Date();
        const selects = [
            'Campaign.id as id',
            'Campaign.campaignName as campaignName',
            'Campaign.slug as slug',
            'Campaign.status as status',
            'Campaign.startDate as startDate',
            'Campaign.endDate as endDate',
            'Campaign.isActive as isActive',
            `(SELECT CV.id FROM campaign_vendors CV WHERE CV.campaign_id = Campaign.id AND CV.vendor_id = ${vendorId} LIMIT 1) as isVendorRegistered`,
        ];
        const query = CampaignRepository.createQueryBuilder('Campaign')
        .where('Campaign.endDate >= :today', {today})
        .select(selects).limit(limit).offset(offset);
        // .leftJoin(CampaignVendors, 'CV', 'CV.campaignId = Campaign.id')
        const results = await query.getRawMany();
        delete query.expressionMap.limit;
        delete query.expressionMap.offset;
        const count  = await query.getCount();
        return { results, count };
    }

    public async vendorProductsInCampaign(request: any, campaignId: number): Promise<any> {
        const vendorId = request.user.userId;
        // product listing is coming with variants
        const result = await this.productService.productListing({
            siteId: request.siteId,
            limit: 0,
            offset: 0,
            statusId: 1,
            vendorId,
            viewType: 2
        });
        // grouping variants with there variants in seperate array
        let products: any = [...new Map(result.data.map(item => [item['productId'], item])).values()];
        products = products.map(p => {
            const variants = result.data.filter(d => d.productId === p.productId);
            return {
                selected: 0,
                productId: p.productId,
                name: p.name,
                variants
            }
        });
        // get products of vendor registered into the campaign
        let campaignProduct: any = await CampaignProductsRepository.find({ where: { campaignId, vendorId }});
        campaignProduct = campaignProduct.map(i => i.productId);
        products = products.map(p => {
            const check = campaignProduct.find(v => v == p.productId);
            if (check) {
                p.selected = 1;
            }
            return p;
        });
        return products;
    }
}
