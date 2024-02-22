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
exports.OrderInfo = void 0;
const typeorm_1 = require("typeorm");
let OrderInfo = class OrderInfo {
};
exports.OrderInfo = OrderInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_id' }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_order_id' }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "subOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_charges' }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "shippingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_days' }),
    __metadata("design:type", Number)
], OrderInfo.prototype, "shippingDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_type' }),
    __metadata("design:type", String)
], OrderInfo.prototype, "shippingType", void 0);
exports.OrderInfo = OrderInfo = __decorate([
    (0, typeorm_1.Entity)('order_info')
], OrderInfo);
//# sourceMappingURL=OrderInfo.js.map