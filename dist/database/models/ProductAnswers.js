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
exports.ProductAnswers = exports.userType = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
var userType;
(function (userType) {
    userType["BUYER"] = "Buyer";
    userType["VENDOR"] = "Vendor";
    userType["MANUFACTURER"] = "Manufacturer";
})(userType || (exports.userType = userType = {}));
let ProductAnswers = class ProductAnswers {
};
exports.ProductAnswers = ProductAnswers;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ProductAnswers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_question_id' }),
    __metadata("design:type", Number)
], ProductAnswers.prototype, "productQuestionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'answer' }),
    __metadata("design:type", String)
], ProductAnswers.prototype, "answer", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], ProductAnswers.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], ProductAnswers.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'user_type', type: 'enum', enum: userType }),
    __metadata("design:type", String)
], ProductAnswers.prototype, "userType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], ProductAnswers.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], ProductAnswers.prototype, "updatedAt", void 0);
exports.ProductAnswers = ProductAnswers = __decorate([
    (0, typeorm_1.Entity)('product_answers')
], ProductAnswers);
//# sourceMappingURL=ProductAnswers.js.map