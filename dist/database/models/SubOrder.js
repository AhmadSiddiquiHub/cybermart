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
exports.SubOrder = void 0;
const class_validator_1 = require("class-validator");
const moment = require("moment");
const typeorm_1 = require("typeorm");
const utils_1 = require("../../utils");
let SubOrder = class SubOrder {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.SubOrder = SubOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_id' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_variant_id' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "productVariantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_id' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status' }),
    __metadata("design:type", String)
], SubOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_color' }),
    __metadata("design:type", String)
], SubOrder.prototype, "statusColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'shipping_charges' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "shippingCharges", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'shipping_days' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "shippingDays", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'shipping_type' }),
    __metadata("design:type", String)
], SubOrder.prototype, "shippingType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'campaign_id' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "campaignId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_name' }),
    __metadata("design:type", String)
], SubOrder.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_image' }),
    __metadata("design:type", String)
], SubOrder.prototype, "productImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_price' }),
    __metadata("design:type", String)
], SubOrder.prototype, "productPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount' }),
    __metadata("design:type", String)
], SubOrder.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'suborder_no' }),
    __metadata("design:type", String)
], SubOrder.prototype, "subOrderNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'variant' }),
    __metadata("design:type", String)
], SubOrder.prototype, "variant", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], SubOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], SubOrder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'view_return_label' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "viewReturnLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'return_till_date' }),
    __metadata("design:type", Number)
], SubOrder.prototype, "returnTillDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubOrder.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubOrder.prototype, "updateDetails", null);
exports.SubOrder = SubOrder = __decorate([
    (0, typeorm_1.Entity)('sub_orders')
], SubOrder);
//# sourceMappingURL=SubOrder.js.map