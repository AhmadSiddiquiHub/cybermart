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
exports.BrandMetaInfo = void 0;
const typeorm_1 = require("typeorm");
let BrandMetaInfo = class BrandMetaInfo {
};
exports.BrandMetaInfo = BrandMetaInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], BrandMetaInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'brand_id' }),
    __metadata("design:type", Number)
], BrandMetaInfo.prototype, "brandId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], BrandMetaInfo.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lang_id' }),
    __metadata("design:type", Number)
], BrandMetaInfo.prototype, "langId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_title' }),
    __metadata("design:type", String)
], BrandMetaInfo.prototype, "metaTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_keyword' }),
    __metadata("design:type", String)
], BrandMetaInfo.prototype, "metaKeyword", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_description' }),
    __metadata("design:type", String)
], BrandMetaInfo.prototype, "metaDescription", void 0);
exports.BrandMetaInfo = BrandMetaInfo = __decorate([
    (0, typeorm_1.Entity)('brands_meta_info')
], BrandMetaInfo);
//# sourceMappingURL=BrandMetaInfo.js.map