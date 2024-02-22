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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const moment = require("moment");
const utils_1 = require("../../utils");
const UserAddresses_1 = require("./UserAddresses");
const CampaignVendors_1 = require("./CampaignVendors");
let Users = class Users {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.Users = Users;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Users.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], Users.prototype, "siteId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'type_id' }),
    __metadata("design:type", String)
], Users.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'role_id' }),
    __metadata("design:type", Number)
], Users.prototype, "roleId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'first_name' }),
    __metadata("design:type", String)
], Users.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name' }),
    __metadata("design:type", String)
], Users.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Date_of_birth' }),
    __metadata("design:type", String)
], Users.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'password' }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_of_birth' }),
    __metadata("design:type", Number)
], Users.prototype, "countryOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_of_citizenship' }),
    __metadata("design:type", Number)
], Users.prototype, "countryOfCitizenship", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_locked' }),
    __metadata("design:type", Number)
], Users.prototype, "isLocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'locked_at' }),
    __metadata("design:type", Date)
], Users.prototype, "lockedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'wallet_bal' }),
    __metadata("design:type", Number)
], Users.prototype, "walletBal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'save_brows_hist' }),
    __metadata("design:type", Number)
], Users.prototype, "saveBrowsHist", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], Users.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avatar' }),
    __metadata("design:type", String)
], Users.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'path' }),
    __metadata("design:type", String)
], Users.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mobile_number' }),
    __metadata("design:type", String)
], Users.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_verified' }),
    __metadata("design:type", Number)
], Users.prototype, "emailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mobile_verified' }),
    __metadata("design:type", Number)
], Users.prototype, "mobileVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'socket_id' }),
    __metadata("design:type", String)
], Users.prototype, "socketId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'magento_seller_id' }),
    __metadata("design:type", Number)
], Users.prototype, "magentoSellerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'magento_user_id' }),
    __metadata("design:type", Number)
], Users.prototype, "magentoUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_cybermart_seller' }),
    __metadata("design:type", Number)
], Users.prototype, "isCybermartSeller", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'login_type' }),
    __metadata("design:type", String)
], Users.prototype, "lType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id' }),
    __metadata("design:type", Number)
], Users.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CampaignVendors_1.CampaignVendors, (campaignVendors) => campaignVendors.vendors),
    __metadata("design:type", Array)
], Users.prototype, "campaignVendors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserAddresses_1.UserAddresses, (ua) => ua.users),
    __metadata("design:type", Array)
], Users.prototype, "useradd", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Users.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Users.prototype, "updateDetails", null);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
//# sourceMappingURL=Users.js.map