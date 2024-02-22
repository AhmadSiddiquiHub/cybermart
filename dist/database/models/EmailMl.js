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
exports.EmailMl = void 0;
const typeorm_1 = require("typeorm");
let EmailMl = class EmailMl {
};
exports.EmailMl = EmailMl;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'email_id' }),
    __metadata("design:type", Number)
], EmailMl.prototype, "emailId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'lang_id' }),
    __metadata("design:type", Number)
], EmailMl.prototype, "langId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subject' }),
    __metadata("design:type", String)
], EmailMl.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'body' }),
    __metadata("design:type", String)
], EmailMl.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], EmailMl.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cc' }),
    __metadata("design:type", String)
], EmailMl.prototype, "CC", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bcc' }),
    __metadata("design:type", String)
], EmailMl.prototype, "BCC", void 0);
exports.EmailMl = EmailMl = __decorate([
    (0, typeorm_1.Entity)('email_ml')
], EmailMl);
//# sourceMappingURL=EmailMl.js.map