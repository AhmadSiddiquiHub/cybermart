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
exports.Documents = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const moment_1 = require("moment");
const utils_1 = require("../../utils");
let Documents = class Documents {
    async createDetails() {
        this.createdAt = (0, moment_1.default)().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = (0, moment_1.default)().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.Documents = Documents;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Documents.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    __metadata("design:type", Number)
], Documents.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], Documents.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'identity_type' }),
    __metadata("design:type", String)
], Documents.prototype, "identityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_type_id' }),
    __metadata("design:type", Number)
], Documents.prototype, "documentTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'identity_number' }),
    __metadata("design:type", Number)
], Documents.prototype, "identityNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'issue_date' }),
    __metadata("design:type", String)
], Documents.prototype, "issueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiry_date' }),
    __metadata("design:type", String)
], Documents.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'front_image' }),
    __metadata("design:type", String)
], Documents.prototype, "frontImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'back_image' }),
    __metadata("design:type", String)
], Documents.prototype, "backImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], Documents.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], Documents.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Documents.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Documents.prototype, "updateDetails", null);
exports.Documents = Documents = __decorate([
    (0, typeorm_1.Entity)('documents')
], Documents);
//# sourceMappingURL=Document.js.map