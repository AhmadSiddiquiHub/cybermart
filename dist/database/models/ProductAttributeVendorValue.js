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
exports.ProductAttributeVendorValue = void 0;
const typeorm_1 = require("typeorm");
let ProductAttributeVendorValue = class ProductAttributeVendorValue {
};
exports.ProductAttributeVendorValue = ProductAttributeVendorValue;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ProductAttributeVendorValue.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    __metadata("design:type", Number)
], ProductAttributeVendorValue.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], ProductAttributeVendorValue.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_attribute_id' }),
    __metadata("design:type", Number)
], ProductAttributeVendorValue.prototype, "productAttributeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_attribute_value_id' }),
    __metadata("design:type", String)
], ProductAttributeVendorValue.prototype, "productAttributeValueId", void 0);
exports.ProductAttributeVendorValue = ProductAttributeVendorValue = __decorate([
    (0, typeorm_1.Entity)('product_attributes_vendor_values')
], ProductAttributeVendorValue);
//# sourceMappingURL=ProductAttributeVendorValue.js.map