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
exports.OtpCodes = void 0;
const typeorm_1 = require("typeorm");
let OtpCodes = class OtpCodes {
};
exports.OtpCodes = OtpCodes;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], OtpCodes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], OtpCodes.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'api_name' }),
    __metadata("design:type", String)
], OtpCodes.prototype, "apiName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mobile_otp' }),
    __metadata("design:type", Number)
], OtpCodes.prototype, "mobileOtp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_otp' }),
    __metadata("design:type", Number)
], OtpCodes.prototype, "emailOtp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expired_at' }),
    __metadata("design:type", String)
], OtpCodes.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_verified' }),
    __metadata("design:type", Number)
], OtpCodes.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fail_otp_attempts' }),
    __metadata("design:type", Number)
], OtpCodes.prototype, "failOtpAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'blocked_at' }),
    __metadata("design:type", String)
], OtpCodes.prototype, "blockedAt", void 0);
exports.OtpCodes = OtpCodes = __decorate([
    (0, typeorm_1.Entity)('otp_codes')
], OtpCodes);
//# sourceMappingURL=OtpCodes.js.map