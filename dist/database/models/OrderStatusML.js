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
exports.OrderStatusesMl = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let OrderStatusesMl = class OrderStatusesMl {
};
exports.OrderStatusesMl = OrderStatusesMl;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], OrderStatusesMl.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], OrderStatusesMl.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_status_id' }),
    __metadata("design:type", Number)
], OrderStatusesMl.prototype, "orderStatusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lang_id' }),
    __metadata("design:type", Number)
], OrderStatusesMl.prototype, "langId", void 0);
exports.OrderStatusesMl = OrderStatusesMl = __decorate([
    (0, typeorm_1.Entity)('order_statuses_ml')
], OrderStatusesMl);
//# sourceMappingURL=OrderStatusML.js.map