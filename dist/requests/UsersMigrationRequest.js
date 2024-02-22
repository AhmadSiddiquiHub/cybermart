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
exports.UsersMigrationRequest = void 0;
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UserSchema {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'customer_no is required' }),
    __metadata("design:type", Number)
], UserSchema.prototype, "customer_no", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email is required' }),
    __metadata("design:type", String)
], UserSchema.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'firstname is required' }),
    __metadata("design:type", String)
], UserSchema.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'lastname is required' }),
    __metadata("design:type", String)
], UserSchema.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['true', 'false']),
    (0, class_validator_1.IsNotEmpty)({ message: 'is_seller is required' }),
    __metadata("design:type", String)
], UserSchema.prototype, "is_seller", void 0);
class UsersMigrationRequest {
}
exports.UsersMigrationRequest = UsersMigrationRequest;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => UserSchema),
    __metadata("design:type", Array)
], UsersMigrationRequest.prototype, "users", void 0);
//# sourceMappingURL=UsersMigrationRequest.js.map