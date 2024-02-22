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
exports.Country = void 0;
const typeorm_1 = require("typeorm");
const moment_1 = require("moment");
const utils_1 = require("../..//utils");
let Country = class Country {
    async createDetails() {
        this.createdAt = (0, moment_1.default)().format(utils_1.AppLevelDateTimeFormat);
    }
    async updateDetails() {
        this.updatedAt = (0, moment_1.default)().format(utils_1.AppLevelDateTimeFormat);
    }
};
exports.Country = Country;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Country.prototype, "countriesId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numeric_code' }),
    __metadata("design:type", String)
], Country.prototype, "numericCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'iso2' }),
    __metadata("design:type", String)
], Country.prototype, "iso2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'iso3' }),
    __metadata("design:type", String)
], Country.prototype, "iso3", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phonecode' }),
    __metadata("design:type", String)
], Country.prototype, "phonecode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'capital' }),
    __metadata("design:type", String)
], Country.prototype, "capital", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency' }),
    __metadata("design:type", String)
], Country.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_name' }),
    __metadata("design:type", String)
], Country.prototype, "currencyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_symbol' }),
    __metadata("design:type", String)
], Country.prototype, "currencySymbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tld' }),
    __metadata("design:type", String)
], Country.prototype, "tld", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'native' }),
    __metadata("design:type", String)
], Country.prototype, "native", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'region' }),
    __metadata("design:type", String)
], Country.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subregion' }),
    __metadata("design:type", String)
], Country.prototype, "subRegion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'timezones' }),
    __metadata("design:type", String)
], Country.prototype, "timezones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'translations' }),
    __metadata("design:type", String)
], Country.prototype, "translations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'latitude' }),
    __metadata("design:type", Number)
], Country.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'longitude' }),
    __metadata("design:type", Number)
], Country.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emoji' }),
    __metadata("design:type", String)
], Country.prototype, "emoji", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emojiU' }),
    __metadata("design:type", String)
], Country.prototype, "emojiU", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'svg_icon' }),
    __metadata("design:type", String)
], Country.prototype, "svgIcon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at' }),
    __metadata("design:type", String)
], Country.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at' }),
    __metadata("design:type", String)
], Country.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'flag' }),
    __metadata("design:type", Number)
], Country.prototype, "flag", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'wikiDataId' }),
    __metadata("design:type", String)
], Country.prototype, "wikiDataId", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Country.prototype, "createDetails", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Country.prototype, "updateDetails", null);
exports.Country = Country = __decorate([
    (0, typeorm_1.Entity)('countries')
], Country);
//# sourceMappingURL=Country.js.map