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
exports.ProductMetaInfo = void 0;
const typeorm_1 = require("typeorm");
let ProductMetaInfo = class ProductMetaInfo {
};
exports.ProductMetaInfo = ProductMetaInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ProductMetaInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], ProductMetaInfo.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], ProductMetaInfo.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lang_id' }),
    __metadata("design:type", Number)
], ProductMetaInfo.prototype, "langId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    __metadata("design:type", String)
], ProductMetaInfo.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    __metadata("design:type", String)
], ProductMetaInfo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'keyword' }),
    __metadata("design:type", String)
], ProductMetaInfo.prototype, "keyword", void 0);
exports.ProductMetaInfo = ProductMetaInfo = __decorate([
    (0, typeorm_1.Entity)('products_meta_info')
], ProductMetaInfo);
//# sourceMappingURL=ProductMetaInfo.js.map