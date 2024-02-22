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
exports.VariantsToCategory = void 0;
const typeorm_1 = require("typeorm");
let VariantsToCategory = class VariantsToCategory {
};
exports.VariantsToCategory = VariantsToCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], VariantsToCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], VariantsToCategory.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    __metadata("design:type", Number)
], VariantsToCategory.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], VariantsToCategory.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'variant_id' }),
    __metadata("design:type", Number)
], VariantsToCategory.prototype, "variantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'show_on_catalog_filters' }),
    __metadata("design:type", Number)
], VariantsToCategory.prototype, "showOnCatalogFilters", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'show_on_create_product_form' }),
    __metadata("design:type", Number)
], VariantsToCategory.prototype, "showOnCreateProductForm", void 0);
exports.VariantsToCategory = VariantsToCategory = __decorate([
    (0, typeorm_1.Entity)('variants_to_category')
], VariantsToCategory);
//# sourceMappingURL=VariantsToCategory.js.map