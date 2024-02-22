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
exports.OpenBoxProductPincodeService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../database");
const OpenBoxProductPincodes_1 = require("../database/models/OpenBoxProductPincodes");
let OpenBoxProductPincodeService = class OpenBoxProductPincodeService {
    constructor() { }
    async bulkCreate(pincodes, vendorId, productId, edit) {
        let entityRows = [];
        pincodes.forEach(pincode => entityRows.push({ vendorId, productId, pincode }));
        try {
            let result = await database_1.OpenBoxProductPincodeRepository.createQueryBuilder('SDP').insert().into(OpenBoxProductPincodes_1.OpenBoxProductPincodes)
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
    async setOpenBoxProductPincodes(vendorId, productId, pincodes) {
        await database_1.OpenBoxProductPincodeRepository.createQueryBuilder('SDP').delete().from(OpenBoxProductPincodes_1.OpenBoxProductPincodes)
            .where('vendor_id = :vid', { vid: vendorId }).andWhere('product_id = :pid', { pid: productId }).execute();
        const result = await this.bulkCreate(pincodes, vendorId, productId);
        if (result)
            return result;
        return false;
    }
};
exports.OpenBoxProductPincodeService = OpenBoxProductPincodeService;
exports.OpenBoxProductPincodeService = OpenBoxProductPincodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OpenBoxProductPincodeService);
//# sourceMappingURL=OpenBoxProductPincodeService.js.map