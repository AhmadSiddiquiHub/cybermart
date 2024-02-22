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
exports.SubOrderLog = void 0;
const moment = require("moment");
const typeorm_1 = require("typeorm");
const utils_1 = require("../../utils");
let SubOrderLog = class SubOrderLog {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.SubOrderLog = SubOrderLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], SubOrderLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_order_id' }),
    __metadata("design:type", Number)
], SubOrderLog.prototype, "subOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_id' }),
    __metadata("design:type", Number)
], SubOrderLog.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], SubOrderLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reason' }),
    __metadata("design:type", String)
], SubOrderLog.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    __metadata("design:type", String)
], SubOrderLog.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubOrderLog.prototype, "createDetails", null);
exports.SubOrderLog = SubOrderLog = __decorate([
    (0, typeorm_1.Entity)('sub_order_logs')
], SubOrderLog);
//# sourceMappingURL=SubOrderLog.js.map