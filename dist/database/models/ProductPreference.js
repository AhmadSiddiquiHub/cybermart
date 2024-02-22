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
exports.ProductPreference = void 0;
const typeorm_1 = require("typeorm");
let ProductPreference = class ProductPreference {
};
exports.ProductPreference = ProductPreference;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ProductPreference.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'col' }),
    __metadata("design:type", String)
], ProductPreference.prototype, "col", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'col_name' }),
    __metadata("design:type", String)
], ProductPreference.prototype, "colName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'col_type' }),
    __metadata("design:type", String)
], ProductPreference.prototype, "colType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mandatory' }),
    __metadata("design:type", Number)
], ProductPreference.prototype, "mandatory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    __metadata("design:type", Number)
], ProductPreference.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_by' }),
    __metadata("design:type", Number)
], ProductPreference.prototype, "sortBy", void 0);
exports.ProductPreference = ProductPreference = __decorate([
    (0, typeorm_1.Entity)('product_preferences')
], ProductPreference);
//# sourceMappingURL=ProductPreference.js.map