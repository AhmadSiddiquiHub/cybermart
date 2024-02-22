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
exports.OtpSetting = void 0;
const typeorm_1 = require("typeorm");
let OtpSetting = class OtpSetting {
};
exports.OtpSetting = OtpSetting;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id' }),
    __metadata("design:type", String)
], OtpSetting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'api_name' }),
    __metadata("design:type", Number)
], OtpSetting.prototype, "apiName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site_id' }),
    __metadata("design:type", Number)
], OtpSetting.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiry_in_minutes' }),
    __metadata("design:type", Number)
], OtpSetting.prototype, "expiryInMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sms_opt_len' }),
    __metadata("design:type", String)
], OtpSetting.prototype, "smsOptLen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_otp_len' }),
    __metadata("design:type", String)
], OtpSetting.prototype, "emailOtpLen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'same_opt' }),
    __metadata("design:type", Number)
], OtpSetting.prototype, "sameOpt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], OtpSetting.prototype, "isActive", void 0);
exports.OtpSetting = OtpSetting = __decorate([
    (0, typeorm_1.Entity)('opt_settings')
], OtpSetting);
//# sourceMappingURL=OtpSetting.js.map