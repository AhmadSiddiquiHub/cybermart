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
exports.VendorCoupon = void 0;
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
const utils_1 = require("../../utils");
let VendorCoupon = class VendorCoupon {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.VendorCoupon = VendorCoupon;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], VendorCoupon.prototype, "vendorCouponId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], VendorCoupon.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_name' }),
    __metadata("design:type", String)
], VendorCoupon.prototype, "couponName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_code' }),
    __metadata("design:type", String)
], VendorCoupon.prototype, "couponCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_type' }),
    __metadata("design:type", Number)
], VendorCoupon.prototype, "couponType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value' }),
    __metadata("design:type", Number)
], VendorCoupon.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'coupon_description' }),
    __metadata("design:type", String)
], VendorCoupon.prototype, "couponDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_usage' }),
    __metadata("design:type", Number)
], VendorCoupon.prototype, "maxUsage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date' }),
    __metadata("design:type", String)
], VendorCoupon.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date' }),
    __metadata("design:type", String)
], VendorCoupon.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], VendorCoupon.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], VendorCoupon.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], VendorCoupon.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], VendorCoupon.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorCoupon.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorCoupon.prototype, "updateDetails", null);
exports.VendorCoupon = VendorCoupon = __decorate([
    (0, typeorm_1.Entity)('coupon')
], VendorCoupon);
//# sourceMappingURL=VendorCoupon.js.map