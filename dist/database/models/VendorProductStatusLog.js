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
exports.VendorProductStatusLog = void 0;
const moment_1 = require("moment");
const typeorm_1 = require("typeorm");
const utils_1 = require("../../utils");
let VendorProductStatusLog = class VendorProductStatusLog {
    async createDetails() {
        this.createdAt = (0, moment_1.default)().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.VendorProductStatusLog = VendorProductStatusLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], VendorProductStatusLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], VendorProductStatusLog.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], VendorProductStatusLog.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by' }),
    __metadata("design:type", Number)
], VendorProductStatusLog.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_status' }),
    __metadata("design:type", Number)
], VendorProductStatusLog.prototype, "productStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comments' }),
    __metadata("design:type", String)
], VendorProductStatusLog.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], VendorProductStatusLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorProductStatusLog.prototype, "createDetails", null);
exports.VendorProductStatusLog = VendorProductStatusLog = __decorate([
    (0, typeorm_1.Entity)('vendor_product_status_logs')
], VendorProductStatusLog);
//# sourceMappingURL=VendorProductStatusLog.js.map