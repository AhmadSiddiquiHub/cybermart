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
exports.ProductWarrantyService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../database");
let ProductWarrantyService = class ProductWarrantyService {
    constructor() { }
    async getProductWarrantyTypes(productDetails) {
        let selects = ['WT.id as value', 'WT.type as label'];
        if (productDetails) {
            selects.push(`(SELECT CASE WHEN EXISTS (SELECT * FROM product_warranty WHERE WT.id = warranty_type_id AND vendor_product_id = ${productDetails.vendorProductId}) THEN 1 ELSE 0 END) AS isSelected`);
        }
        else {
            selects.push('0 as isSelected');
        }
        const query = await database_1.WarrantyTypesRepository.createQueryBuilder('WT')
            .where('active = 1')
            .select(selects).getRawMany();
        return query;
    }
    async getProductWarranty(productDetails) {
        let warrantyPeriods = [
            {
                label: 'Days',
            },
            {
                label: 'Months',
            },
            {
                label: 'Years',
            }
        ];
        let values = [];
        if (productDetails) {
            values = await database_1.ProductWarrantyRepository.find({ where: { vendorProductId: productDetails.vendorProductId } });
            const transformedValues = values.length > 0 ? values.map((item) => {
                if (item.period) {
                    return {
                        id: item.id,
                        key1: item.period.split('-')[0],
                        key2: item.period.split('-')[1],
                        warrantyTypeId: item.warrantyTypeId
                    };
                }
                else {
                    return null;
                }
            }) : [];
            values = transformedValues.filter((item) => item !== null);
        }
        return { warrantyPeriods, values };
    }
    async insertWarranty(pw, vendorProductId) {
        for (const i of pw) {
            database_1.ProductWarrantyRepository.insert({
                vendorProductId: vendorProductId,
                warrantyTypeId: i.warrantyTypeId,
                period: i.period,
                active: 1
            });
        }
    }
    async updateWarranty(pw, vendorProductId) {
        const existingRecords = await database_1.ProductWarrantyRepository.find({
            where: { vendorProductId },
        });
        let receivedItemIds;
        if (pw.length > 0) {
            receivedItemIds = pw.map(item => item.id).filter(id => id !== undefined);
            for (const item of pw) {
                if (item.id) {
                    const existingRecord = existingRecords.find(record => record.id === item.id);
                    if (existingRecord) {
                        existingRecord.period = item.period ? item.period : null;
                        existingRecord.warrantyTypeId = item.warrantyTypeId;
                        await database_1.ProductWarrantyRepository.save(existingRecord);
                    }
                }
                else {
                    await database_1.ProductWarrantyRepository.insert({
                        vendorProductId: vendorProductId,
                        warrantyTypeId: item.warrantyTypeId,
                        period: item.period,
                        active: 1,
                    });
                }
            }
        }
        const existingItemIds = existingRecords.map(record => record.id);
        const idsToDelete = existingItemIds.filter(id => !receivedItemIds.includes(id));
        if (idsToDelete.length > 0) {
            await database_1.ProductWarrantyRepository.delete(idsToDelete);
        }
    }
};
exports.ProductWarrantyService = ProductWarrantyService;
exports.ProductWarrantyService = ProductWarrantyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProductWarrantyService);
//# sourceMappingURL=ProductWarranty.js.map