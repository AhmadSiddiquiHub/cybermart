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
exports.VendorProductVariant = void 0;
const typeorm_1 = require("typeorm");
let VendorProductVariant = class VendorProductVariant {
};
exports.VendorProductVariant = VendorProductVariant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], VendorProductVariant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], VendorProductVariant.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], VendorProductVariant.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], VendorProductVariant.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_variant_id' }),
    __metadata("design:type", Number)
], VendorProductVariant.prototype, "productVariantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price' }),
    __metadata("design:type", String)
], VendorProductVariant.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sku' }),
    __metadata("design:type", String)
], VendorProductVariant.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], VendorProductVariant.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'available' }),
    __metadata("design:type", Number)
], VendorProductVariant.prototype, "available", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    __metadata("design:type", Number)
], VendorProductVariant.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_featured' }),
    __metadata("design:type", Number)
], VendorProductVariant.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'out_of_stock' }),
    __metadata("design:type", Number)
], VendorProductVariant.prototype, "outOfStock", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price_2' }),
    __metadata("design:type", String)
], VendorProductVariant.prototype, "price2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_default', default: false }),
    __metadata("design:type", Boolean)
], VendorProductVariant.prototype, "is_default", void 0);
exports.VendorProductVariant = VendorProductVariant = __decorate([
    (0, typeorm_1.Entity)('vendor_product_variants')
], VendorProductVariant);
//# sourceMappingURL=VendorProductVariant.js.map