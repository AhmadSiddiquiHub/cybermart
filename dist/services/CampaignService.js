"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../database");
const ProductService_1 = require("./ProductService");
let CampaignService = class CampaignService {
    constructor(productService) {
        this.productService = productService;
    }
    async list(vendorId, limit, offset) {
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
        const query = database_1.CampaignRepository.createQueryBuilder('Campaign')
            .where('Campaign.endDate >= :today', { today })
            .select(selects).limit(limit).offset(offset);
        const results = await query.getRawMany();
        delete query.expressionMap.limit;
        delete query.expressionMap.offset;
        const count = await query.getCount();
        return { results, count };
    }
    async vendorProductsInCampaign(request, campaignId) {
        const vendorId = request.user.userId;
        const result = await this.productService.productListing({
            siteId: request.siteId,
            limit: 0,
            offset: 0,
            statusId: 1,
            vendorId,
            viewType: 2
        });
        let products = [...new Map(result.data.map(item => [item['productId'], item])).values()];
        products = products.map(p => {
            const variants = result.data.filter(d => d.productId === p.productId);
            return {
                selected: 0,
                productId: p.productId,
                name: p.name,
                variants
            };
        });
        let campaignProduct = await database_1.CampaignProductsRepository.find({ where: { campaignId, vendorId } });
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
};
exports.CampaignService = CampaignService;
exports.CampaignService = CampaignService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ProductService_1.ProductService])
], CampaignService);
//# sourceMappingURL=CampaignService.js.map