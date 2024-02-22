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
exports.ComboOffer = void 0;
const moment = require("moment/moment");
const utils_1 = require("../../utils");
const typeorm_1 = require("typeorm");
let ComboOffer = class ComboOffer {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.ComboOffer = ComboOffer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ComboOffer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], ComboOffer.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'combo_name' }),
    __metadata("design:type", String)
], ComboOffer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'combo_type' }),
    __metadata("design:type", Number)
], ComboOffer.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'combo_description' }),
    __metadata("design:type", String)
], ComboOffer.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'discount' }),
    __metadata("design:type", Number)
], ComboOffer.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], ComboOffer.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], ComboOffer.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_ids' }),
    __metadata("design:type", String)
], ComboOffer.prototype, "productIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], ComboOffer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], ComboOffer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComboOffer.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComboOffer.prototype, "updateDetails", null);
exports.ComboOffer = ComboOffer = __decorate([
    (0, typeorm_1.Entity)('combo_offers')
], ComboOffer);
//# sourceMappingURL=ComboOffer.js.map