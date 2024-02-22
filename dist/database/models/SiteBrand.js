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
exports.SiteBrand = void 0;
const typeorm_1 = require("typeorm");
let SiteBrand = class SiteBrand {
};
exports.SiteBrand = SiteBrand;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], SiteBrand.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], SiteBrand.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'brand_id' }),
    __metadata("design:type", Number)
], SiteBrand.prototype, "brandId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_featured' }),
    __metadata("design:type", Number)
], SiteBrand.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], SiteBrand.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'brand_page_banner_image' }),
    __metadata("design:type", Number)
], SiteBrand.prototype, "brandPageBannerImage", void 0);
exports.SiteBrand = SiteBrand = __decorate([
    (0, typeorm_1.Entity)('site_brands')
], SiteBrand);
//# sourceMappingURL=SiteBrand.js.map