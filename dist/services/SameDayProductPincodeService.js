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
exports.SameDayProductPincodeService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../database");
const SameDayProductPincodes_1 = require("../database/models/SameDayProductPincodes");
let SameDayProductPincodeService = class SameDayProductPincodeService {
    constructor() { }
    async bulkCreate(pincodes, vendorId, productId, edit) {
        let entityRows = [];
        console.log(pincodes);
        pincodes.forEach(pincode => entityRows.push({ vendorId, product_id: productId, pincode }));
        try {
            let result = await database_1.SameDayProductPincodeRepository.createQueryBuilder('SDP').insert().into(SameDayProductPincodes_1.SameDayProductPincodes)
                .values(entityRows).execute();
            if (result)
                return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
        return false;
    }
    async setSameDayProductPincodes(vendorId, productId, pincodes) {
        await database_1.SameDayProductPincodeRepository.createQueryBuilder('SDP').delete().from(SameDayProductPincodes_1.SameDayProductPincodes)
            .where('vendor_id = :vid', { vid: vendorId }).andWhere('product_id = :pid', { pid: productId }).execute();
        const result = await this.bulkCreate(pincodes, vendorId, productId);
        if (result)
            return result;
        return false;
    }
    async findPincodesByProductId(productId) {
        const result = await database_1.SameDayProductPincodeRepository.createQueryBuilder('SDP').where('product_id = :pid', { pid: productId }).select('SDP.pincode as pincode').getRawMany();
        let pincodes = [];
        result.forEach(o => pincodes.push(o.pincode));
        return pincodes;
    }
};
exports.SameDayProductPincodeService = SameDayProductPincodeService;
exports.SameDayProductPincodeService = SameDayProductPincodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SameDayProductPincodeService);
//# sourceMappingURL=SameDayProductPincodeService.js.map