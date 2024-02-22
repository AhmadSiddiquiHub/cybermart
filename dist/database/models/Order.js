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
exports.Order = void 0;
const moment = require("moment");
const typeorm_1 = require("typeorm");
const utils_1 = require("../../utils");
let Order = class Order {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Order.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], Order.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    __metadata("design:type", Number)
], Order.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_id' }),
    __metadata("design:type", Number)
], Order.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id' }),
    __metadata("design:type", Number)
], Order.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'area_id' }),
    __metadata("design:type", Number)
], Order.prototype, "areaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], Order.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_no' }),
    __metadata("design:type", String)
], Order.prototype, "phoneNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax' }),
    __metadata("design:type", String)
], Order.prototype, "tax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_addr_1' }),
    __metadata("design:type", String)
], Order.prototype, "lineAddress1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_addr_2' }),
    __metadata("design:type", String)
], Order.prototype, "lineAddress2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_addr_3' }),
    __metadata("design:type", String)
], Order.prototype, "lineAddress3", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'zipcode' }),
    __metadata("design:type", String)
], Order.prototype, "zipcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'addr_type' }),
    __metadata("design:type", String)
], Order.prototype, "addrType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_id' }),
    __metadata("design:type", Number)
], Order.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_no' }),
    __metadata("design:type", String)
], Order.prototype, "orderNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount' }),
    __metadata("design:type", String)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_method_id' }),
    __metadata("design:type", Number)
], Order.prototype, "paymentMethodId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_status' }),
    __metadata("design:type", Number)
], Order.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comments' }),
    __metadata("design:type", String)
], Order.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coupon' }),
    __metadata("design:type", String)
], Order.prototype, "coupon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount' }),
    __metadata("design:type", Number)
], Order.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invoice' }),
    __metadata("design:type", String)
], Order.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_slip' }),
    __metadata("design:type", String)
], Order.prototype, "trackingSlip", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_charges' }),
    __metadata("design:type", String)
], Order.prototype, "shippingCharges", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Order.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Order.prototype, "updateDetails", null);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('orders')
], Order);
//# sourceMappingURL=Order.js.map