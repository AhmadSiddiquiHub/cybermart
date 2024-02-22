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
exports.SameDayProductPincodes = void 0;
const typeorm_1 = require("typeorm");
let SameDayProductPincodes = class SameDayProductPincodes {
};
exports.SameDayProductPincodes = SameDayProductPincodes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], SameDayProductPincodes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], SameDayProductPincodes.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], SameDayProductPincodes.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pincode' }),
    __metadata("design:type", Number)
], SameDayProductPincodes.prototype, "pincode", void 0);
exports.SameDayProductPincodes = SameDayProductPincodes = __decorate([
    (0, typeorm_1.Entity)('same_day_product_pincodes')
], SameDayProductPincodes);
//# sourceMappingURL=SameDayProductPincodes.js.map