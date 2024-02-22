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
exports.Campaign = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const CampaignVendors_1 = require("./CampaignVendors");
const CampaignProducts_1 = require("./CampaignProducts");
const CampaignPackages_1 = require("./CampaignPackages");
let Campaign = class Campaign {
};
exports.Campaign = Campaign;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Campaign.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'campaign_name' }),
    __metadata("design:type", String)
], Campaign.prototype, "campaignName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date' }),
    __metadata("design:type", String)
], Campaign.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'main_page_banner' }),
    __metadata("design:type", String)
], Campaign.prototype, "mainPageBanner", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_reg_banner' }),
    __metadata("design:type", String)
], Campaign.prototype, "vendorRegBanner", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date' }),
    __metadata("design:type", String)
], Campaign.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], Campaign.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status' }),
    __metadata("design:type", String)
], Campaign.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slug' }),
    __metadata("design:type", String)
], Campaign.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], Campaign.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_title' }),
    __metadata("design:type", String)
], Campaign.prototype, "metaTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_keyword' }),
    __metadata("design:type", String)
], Campaign.prototype, "metaKeyword", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_description' }),
    __metadata("design:type", String)
], Campaign.prototype, "metaDescription", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CampaignVendors_1.CampaignVendors, (campaignVendors) => campaignVendors.campaign),
    __metadata("design:type", Array)
], Campaign.prototype, "campaignVendors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CampaignProducts_1.CampaignProducts, (campaignProducts) => campaignProducts.campaign),
    __metadata("design:type", Array)
], Campaign.prototype, "campaignProducts", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => CampaignPackages_1.CampaignPackage, (campaignPackage) => campaignPackage.campaign),
    __metadata("design:type", Array)
], Campaign.prototype, "campaignPackage", void 0);
exports.Campaign = Campaign = __decorate([
    (0, typeorm_1.Entity)('campaign')
], Campaign);
//# sourceMappingURL=Campaign.js.map