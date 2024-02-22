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
exports.VendorStoreProfile = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const moment = require("moment");
const utils_1 = require("../../utils");
let VendorStoreProfile = class VendorStoreProfile {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updateAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.VendorStoreProfile = VendorStoreProfile;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], VendorStoreProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], VendorStoreProfile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_name' }),
    __metadata("design:type", String)
], VendorStoreProfile.prototype, "storeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], VendorStoreProfile.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_image' }),
    __metadata("design:type", String)
], VendorStoreProfile.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'background_image' }),
    __metadata("design:type", String)
], VendorStoreProfile.prototype, "backgroundImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bucket_path' }),
    __metadata("design:type", String)
], VendorStoreProfile.prototype, "bucketPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slug' }),
    __metadata("design:type", String)
], VendorStoreProfile.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], VendorStoreProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], VendorStoreProfile.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorStoreProfile.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorStoreProfile.prototype, "updateDetails", null);
exports.VendorStoreProfile = VendorStoreProfile = __decorate([
    (0, typeorm_1.Entity)('vendor_store_profiles')
], VendorStoreProfile);
//# sourceMappingURL=VendorStoreProfile.js.map