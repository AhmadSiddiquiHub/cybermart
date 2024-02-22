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
exports.Coupon = void 0;
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
const utils_1 = require("../../utils");
let Coupon = class Coupon {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.Coupon = Coupon;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Coupon.prototype, "couponId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], Coupon.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_name' }),
    __metadata("design:type", String)
], Coupon.prototype, "couponName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_code' }),
    __metadata("design:type", String)
], Coupon.prototype, "couponCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type' }),
    __metadata("design:type", String)
], Coupon.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value' }),
    __metadata("design:type", Number)
], Coupon.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value_type' }),
    __metadata("design:type", Number)
], Coupon.prototype, "valueType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_usage' }),
    __metadata("design:type", Number)
], Coupon.prototype, "maxUsage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date' }),
    __metadata("design:type", String)
], Coupon.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_order_amount' }),
    __metadata("design:type", Number)
], Coupon.prototype, "minOrderAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_discount' }),
    __metadata("design:type", Number)
], Coupon.prototype, "maxDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date' }),
    __metadata("design:type", String)
], Coupon.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_stackable' }),
    __metadata("design:type", Number)
], Coupon.prototype, "isStackable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_signup_coupon' }),
    __metadata("design:type", Number)
], Coupon.prototype, "isSignupCoupon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'left_count' }),
    __metadata("design:type", Number)
], Coupon.prototype, "leftCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], Coupon.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], Coupon.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], Coupon.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], Coupon.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_based' }),
    __metadata("design:type", Number)
], Coupon.prototype, "userBased", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Coupon.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Coupon.prototype, "updateDetails", null);
exports.Coupon = Coupon = __decorate([
    (0, typeorm_1.Entity)('coupons')
], Coupon);
//# sourceMappingURL=Coupon.js.map