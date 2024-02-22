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
exports.ProductShippingInfo = void 0;
const typeorm_1 = require("typeorm");
let ProductShippingInfo = class ProductShippingInfo {
};
exports.ProductShippingInfo = ProductShippingInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ProductShippingInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], ProductShippingInfo.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], ProductShippingInfo.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], ProductShippingInfo.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'days' }),
    __metadata("design:type", Number)
], ProductShippingInfo.prototype, "days", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'charges' }),
    __metadata("design:type", Number)
], ProductShippingInfo.prototype, "charges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'charges_2' }),
    __metadata("design:type", String)
], ProductShippingInfo.prototype, "charges2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type' }),
    __metadata("design:type", String)
], ProductShippingInfo.prototype, "type", void 0);
exports.ProductShippingInfo = ProductShippingInfo = __decorate([
    (0, typeorm_1.Entity)('product_shipping_info')
], ProductShippingInfo);
//# sourceMappingURL=ProductShippingInfo.js.map