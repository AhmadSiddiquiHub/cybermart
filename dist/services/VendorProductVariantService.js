"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductVariantService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../database");
let VendorProductVariantService = class VendorProductVariantService {
    generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    async checkAndGenerateSKU(sku, whereCondition, vendorId) {
        const existingProduct = await database_1.VendorProductVariantRepository.findOne({ where: whereCondition });
        if (!existingProduct) {
            return sku.toUpperCase();
        }
        let suffixLength = 1;
        let newSlug = sku.toUpperCase() + this.generateRandomString(suffixLength);
        while (await database_1.VendorProductVariantRepository.findOne({ where: { sku: newSlug, vendorId } })) {
            suffixLength++;
            newSlug = sku.toUpperCase() + this.generateRandomString(suffixLength);
        }
        return newSlug.toUpperCase();
    }
};
exports.VendorProductVariantService = VendorProductVariantService;
exports.VendorProductVariantService = VendorProductVariantService = __decorate([
    (0, common_1.Injectable)()
], VendorProductVariantService);
//# sourceMappingURL=VendorProductVariantService.js.map