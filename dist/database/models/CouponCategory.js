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
exports.CouponCategory = void 0;
const typeorm_1 = require("typeorm");
let CouponCategory = class CouponCategory {
};
exports.CouponCategory = CouponCategory;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'coupon_id' }),
    __metadata("design:type", Number)
], CouponCategory.prototype, "couponId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'category_id' }),
    __metadata("design:type", Number)
], CouponCategory.prototype, "categoryId", void 0);
exports.CouponCategory = CouponCategory = __decorate([
    (0, typeorm_1.Entity)('coupon_categories')
], CouponCategory);
//# sourceMappingURL=CouponCategory.js.map