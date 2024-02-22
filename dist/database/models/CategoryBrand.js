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
exports.CategoryBrand = void 0;
const typeorm_1 = require("typeorm");
let CategoryBrand = class CategoryBrand {
};
exports.CategoryBrand = CategoryBrand;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], CategoryBrand.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cat_id' }),
    __metadata("design:type", Number)
], CategoryBrand.prototype, "catId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'brand_id' }),
    __metadata("design:type", Number)
], CategoryBrand.prototype, "brandId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], CategoryBrand.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order' }),
    __metadata("design:type", String)
], CategoryBrand.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], CategoryBrand.prototype, "isActive", void 0);
exports.CategoryBrand = CategoryBrand = __decorate([
    (0, typeorm_1.Entity)('category_brand')
], CategoryBrand);
//# sourceMappingURL=CategoryBrand.js.map