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
exports.State = void 0;
const moment = require("moment/moment");
const typeorm_1 = require("typeorm");
const utils_1 = require("../../utils");
let State = class State {
    async createDetails() {
        this.createdAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = moment().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.State = State;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], State.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], State.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    __metadata("design:type", Number)
], State.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_code' }),
    __metadata("design:type", String)
], State.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fips_code' }),
    __metadata("design:type", String)
], State.prototype, "fipsCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'iso2' }),
    __metadata("design:type", String)
], State.prototype, "iso2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type' }),
    __metadata("design:type", String)
], State.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], State.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], State.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'flag' }),
    __metadata("design:type", Number)
], State.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'latitude' }),
    __metadata("design:type", Number)
], State.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'longitude' }),
    __metadata("design:type", Number)
], State.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'wikiDataId' }),
    __metadata("design:type", String)
], State.prototype, "wikiDataId", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], State.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], State.prototype, "updateDetails", null);
exports.State = State = __decorate([
    (0, typeorm_1.Entity)('states')
], State);
//# sourceMappingURL=State.js.map