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
exports.UserAddresses = void 0;
const typeorm_1 = require("typeorm");
const moment = require("moment");
const utils_1 = require("../../utils");
const Users_1 = require("./Users");
let UserAddresses = class UserAddresses {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updateAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.UserAddresses = UserAddresses;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'address_id' }),
    __metadata("design:type", Number)
], UserAddresses.prototype, "addressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], UserAddresses.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserAddresses.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    __metadata("design:type", Number)
], UserAddresses.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_id' }),
    __metadata("design:type", Number)
], UserAddresses.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id' }),
    __metadata("design:type", Number)
], UserAddresses.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_type_id' }),
    __metadata("design:type", String)
], UserAddresses.prototype, "userTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type' }),
    __metadata("design:type", String)
], UserAddresses.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_addr_1' }),
    __metadata("design:type", String)
], UserAddresses.prototype, "Lineaddr1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_addr_2' }),
    __metadata("design:type", String)
], UserAddresses.prototype, "Lineaddr2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'line_addr_3' }),
    __metadata("design:type", String)
], UserAddresses.prototype, "Lineaddr3", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'zipcode' }),
    __metadata("design:type", Number)
], UserAddresses.prototype, "zipcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_default' }),
    __metadata("design:type", Number)
], UserAddresses.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], UserAddresses.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], UserAddresses.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], UserAddresses.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.useradd),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Users_1.Users)
], UserAddresses.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserAddresses.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserAddresses.prototype, "updateDetails", null);
exports.UserAddresses = UserAddresses = __decorate([
    (0, typeorm_1.Entity)('user_addresses')
], UserAddresses);
//# sourceMappingURL=UserAddresses.js.map