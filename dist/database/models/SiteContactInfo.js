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
exports.SiteContactInfo = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let SiteContactInfo = class SiteContactInfo {
};
exports.SiteContactInfo = SiteContactInfo;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], SiteContactInfo.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], SiteContactInfo.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_mobile' }),
    __metadata("design:type", String)
], SiteContactInfo.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'phone_ofc' }),
    __metadata("design:type", String)
], SiteContactInfo.prototype, "phoneOfc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_home' }),
    __metadata("design:type", Number)
], SiteContactInfo.prototype, "phoneHome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_ofc' }),
    __metadata("design:type", String)
], SiteContactInfo.prototype, "emailOfc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_personal' }),
    __metadata("design:type", String)
], SiteContactInfo.prototype, "emailPersonal", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], SiteContactInfo.prototype, "isActive", void 0);
exports.SiteContactInfo = SiteContactInfo = __decorate([
    (0, typeorm_1.Entity)('site_contact_info')
], SiteContactInfo);
//# sourceMappingURL=SiteContactInfo.js.map