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
exports.AttributesToCategory = void 0;
const typeorm_1 = require("typeorm");
let AttributesToCategory = class AttributesToCategory {
};
exports.AttributesToCategory = AttributesToCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], AttributesToCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], AttributesToCategory.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    __metadata("design:type", Number)
], AttributesToCategory.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_attribute_id' }),
    __metadata("design:type", Number)
], AttributesToCategory.prototype, "productAttributeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order' }),
    __metadata("design:type", Number)
], AttributesToCategory.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type' }),
    __metadata("design:type", String)
], AttributesToCategory.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_required' }),
    __metadata("design:type", Number)
], AttributesToCategory.prototype, "isRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_common' }),
    __metadata("design:type", Number)
], AttributesToCategory.prototype, "isCommon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'show_on_catalog_filters' }),
    __metadata("design:type", Number)
], AttributesToCategory.prototype, "showOnCatalogFilters", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'show_on_create_product_form' }),
    __metadata("design:type", Number)
], AttributesToCategory.prototype, "showOnCreateProductForm", void 0);
exports.AttributesToCategory = AttributesToCategory = __decorate([
    (0, typeorm_1.Entity)('attributes_to_category')
], AttributesToCategory);
//# sourceMappingURL=AttributesToCategory.js.map