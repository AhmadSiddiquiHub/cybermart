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
exports.VendorProduct = void 0;
const typeorm_1 = require("typeorm");
const moment = require("moment");
const utils_1 = require("../../utils");
let VendorProduct = class VendorProduct {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.VendorProduct = VendorProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slug' }),
    __metadata("design:type", String)
], VendorProduct.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_product_owner' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "isProductOwner", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], VendorProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], VendorProduct.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hsn' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "hsn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'brand_id' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "brandId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'search_keywords' }),
    __metadata("design:type", String)
], VendorProduct.prototype, "searchKeywords", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'COD' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "COD", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bulk_quote' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "bulkQuote", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_id' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_featured' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star1' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "OneStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star2' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "TwoStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star3' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "ThreeStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star4' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "FourStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star5' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "FiveStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'return_days' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "returnDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_class_id' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "taxClassId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'size_chart_image' }),
    __metadata("design:type", String)
], VendorProduct.prototype, "sizeChartImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fake_orders' }),
    __metadata("design:type", Number)
], VendorProduct.prototype, "fakeOrders", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorProduct.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorProduct.prototype, "updateDetails", null);
exports.VendorProduct = VendorProduct = __decorate([
    (0, typeorm_1.Entity)('vendor_products')
], VendorProduct);
//# sourceMappingURL=VendorProduct.js.map