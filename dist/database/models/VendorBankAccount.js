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
exports.VendorBankAccount = void 0;
const typeorm_1 = require("typeorm");
let VendorBankAccount = class VendorBankAccount {
};
exports.VendorBankAccount = VendorBankAccount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], VendorBankAccount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    __metadata("design:type", Number)
], VendorBankAccount.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_id' }),
    __metadata("design:type", Number)
], VendorBankAccount.prototype, "bankId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_no' }),
    __metadata("design:type", String)
], VendorBankAccount.prototype, "accountNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_holder_name' }),
    __metadata("design:type", String)
], VendorBankAccount.prototype, "accountHolderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IBAN' }),
    __metadata("design:type", String)
], VendorBankAccount.prototype, "IBAN", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cheque_image' }),
    __metadata("design:type", String)
], VendorBankAccount.prototype, "chequeImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'branch_code' }),
    __metadata("design:type", Number)
], VendorBankAccount.prototype, "branchCode", void 0);
exports.VendorBankAccount = VendorBankAccount = __decorate([
    (0, typeorm_1.Entity)('vendor_bank_accounts')
], VendorBankAccount);
//# sourceMappingURL=VendorBankAccount.js.map