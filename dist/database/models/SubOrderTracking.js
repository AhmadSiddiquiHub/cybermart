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
exports.SubOrderTracking = void 0;
const moment = require("moment");
const typeorm_1 = require("typeorm");
const utils_1 = require("../../utils");
let SubOrderTracking = class SubOrderTracking {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
        this.shippedOn = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.SubOrderTracking = SubOrderTracking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], SubOrderTracking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_order_id' }),
    __metadata("design:type", Number)
], SubOrderTracking.prototype, "subOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_no' }),
    __metadata("design:type", String)
], SubOrderTracking.prototype, "trackingNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'courier_id' }),
    __metadata("design:type", Number)
], SubOrderTracking.prototype, "courierId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comments' }),
    __metadata("design:type", String)
], SubOrderTracking.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], SubOrderTracking.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], SubOrderTracking.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipped_on' }),
    __metadata("design:type", String)
], SubOrderTracking.prototype, "shippedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipped_by' }),
    __metadata("design:type", Number)
], SubOrderTracking.prototype, "shippedBy", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubOrderTracking.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubOrderTracking.prototype, "updateDetails", null);
exports.SubOrderTracking = SubOrderTracking = __decorate([
    (0, typeorm_1.Entity)('sub_order_tracking')
], SubOrderTracking);
//# sourceMappingURL=SubOrderTracking.js.map