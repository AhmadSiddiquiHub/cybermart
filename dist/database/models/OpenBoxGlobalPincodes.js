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
exports.OpenBoxGlobalPincodes = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Sellers_1 = require("./Sellers");
let OpenBoxGlobalPincodes = class OpenBoxGlobalPincodes {
};
exports.OpenBoxGlobalPincodes = OpenBoxGlobalPincodes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], OpenBoxGlobalPincodes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sellers_1.Seller, (vendor) => vendor.openBoxGlobalPincodes),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], OpenBoxGlobalPincodes.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pincode' }),
    __metadata("design:type", Number)
], OpenBoxGlobalPincodes.prototype, "pincode", void 0);
exports.OpenBoxGlobalPincodes = OpenBoxGlobalPincodes = __decorate([
    (0, typeorm_1.Entity)('open_box_global_pincodes')
], OpenBoxGlobalPincodes);
//# sourceMappingURL=OpenBoxGlobalPincodes.js.map