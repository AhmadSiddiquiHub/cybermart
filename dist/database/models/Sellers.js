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
exports.Seller = void 0;
const typeorm_1 = require("typeorm");
const OpenBoxGlobalPincodes_1 = require("./OpenBoxGlobalPincodes");
const SameDayGlobalPincodes_1 = require("./SameDayGlobalPincodes");
const OpenBoxProductPincodes_1 = require("./OpenBoxProductPincodes");
const SameDayProductPincodes_1 = require("./SameDayProductPincodes");
let Seller = class Seller {
};
exports.Seller = Seller;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Seller.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_profile_completed' }),
    __metadata("design:type", String)
], Seller.prototype, "isProfileCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_id' }),
    __metadata("design:type", String)
], Seller.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_health' }),
    __metadata("design:type", String)
], Seller.prototype, "accountHealth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_auto_approval' }),
    __metadata("design:type", Number)
], Seller.prototype, "productAutoApproval", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star1' }),
    __metadata("design:type", Number)
], Seller.prototype, "OneStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star2' }),
    __metadata("design:type", Number)
], Seller.prototype, "TwoStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star3' }),
    __metadata("design:type", Number)
], Seller.prototype, "ThreeStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star4' }),
    __metadata("design:type", Number)
], Seller.prototype, "FourStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rating_count_star5' }),
    __metadata("design:type", Number)
], Seller.prototype, "FiveStartRatingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bucket_path' }),
    __metadata("design:type", String)
], Seller.prototype, "bucketPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'can_add_free_ship' }),
    __metadata("design:type", Number)
], Seller.prototype, "canAddFreeShip", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'same_day_active', default: 0 }),
    __metadata("design:type", Number)
], Seller.prototype, "sameDayActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'open_box_active', default: 0 }),
    __metadata("design:type", Number)
], Seller.prototype, "openBoxActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OpenBoxGlobalPincodes_1.OpenBoxGlobalPincodes, (openBoxGlobalPincodes) => openBoxGlobalPincodes.pincode),
    __metadata("design:type", Array)
], Seller.prototype, "openBoxGlobalPincodes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SameDayGlobalPincodes_1.SameDayGlobalPincodes, (sameDayGlobalPincodes) => sameDayGlobalPincodes.pincode),
    __metadata("design:type", Array)
], Seller.prototype, "sameDayGlobalPincodes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SameDayProductPincodes_1.SameDayProductPincodes, (sameDayProductPincodes) => sameDayProductPincodes.pincode),
    __metadata("design:type", Array)
], Seller.prototype, "sameDayProdcutPincodes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OpenBoxProductPincodes_1.OpenBoxProductPincodes, (openBoxProductPincodes) => openBoxProductPincodes.pincode),
    __metadata("design:type", Array)
], Seller.prototype, "openBoxProductPincodes", void 0);
exports.Seller = Seller = __decorate([
    (0, typeorm_1.Entity)('vendors')
], Seller);
//# sourceMappingURL=Sellers.js.map