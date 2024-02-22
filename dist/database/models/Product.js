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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const OpenBoxProductPincodes_1 = require("./OpenBoxProductPincodes");
const SameDayProductPincodes_1 = require("./SameDayProductPincodes");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'long_desc' }),
    __metadata("design:type", String)
], Product.prototype, "longDesc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'desc_editor_design' }),
    __metadata("design:type", String)
], Product.prototype, "descEditorDesign", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'short_desc' }),
    __metadata("design:type", String)
], Product.prototype, "shortDesc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'more_information' }),
    __metadata("design:type", String)
], Product.prototype, "moreInformation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bullet_points' }),
    __metadata("design:type", String)
], Product.prototype, "bulletPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avg_rating' }),
    __metadata("design:type", Number)
], Product.prototype, "avgRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'review_count' }),
    __metadata("design:type", Number)
], Product.prototype, "reviewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star1' }),
    __metadata("design:type", Number)
], Product.prototype, "OneStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star2' }),
    __metadata("design:type", Number)
], Product.prototype, "TwoStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star3' }),
    __metadata("design:type", Number)
], Product.prototype, "ThreeStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star4' }),
    __metadata("design:type", Number)
], Product.prototype, "FourStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star5' }),
    __metadata("design:type", Number)
], Product.prototype, "FiveStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SameDayProductPincodes_1.SameDayProductPincodes, (sameDayProductPincodes) => sameDayProductPincodes.product_id),
    __metadata("design:type", Array)
], Product.prototype, "sameDayProductPincodes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OpenBoxProductPincodes_1.OpenBoxProductPincodes, (openBoxProductPincodes) => openBoxProductPincodes.productId),
    __metadata("design:type", Array)
], Product.prototype, "openBoxProductPincodes", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
//# sourceMappingURL=Product.js.map