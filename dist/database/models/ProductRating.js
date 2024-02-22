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
exports.ProductRating = void 0;
const moment_1 = require("moment");
const utils_1 = require("../../utils");
const typeorm_1 = require("typeorm");
let ProductRating = class ProductRating {
    async createDetails() {
        this.createdAt = (0, moment_1.default)().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = (0, moment_1.default)().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.ProductRating = ProductRating;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ProductRating.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], ProductRating.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], ProductRating.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_order_id' }),
    __metadata("design:type", Number)
], ProductRating.prototype, "subOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating' }),
    __metadata("design:type", String)
], ProductRating.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'review' }),
    __metadata("design:type", String)
], ProductRating.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], ProductRating.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], ProductRating.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], ProductRating.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductRating.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductRating.prototype, "updateDetails", null);
exports.ProductRating = ProductRating = __decorate([
    (0, typeorm_1.Entity)('product_ratings')
], ProductRating);
//# sourceMappingURL=ProductRating.js.map