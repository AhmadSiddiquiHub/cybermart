import { Injectable } from '@nestjs/common';
import { WarrantyTypesRepository, ProductWarrantyRepository } from '../database';

@Injectable()
export class ProductWarrantyService {

    constructor(
    ) {}
    
    public async getProductWarrantyTypes(productDetails: any): Promise<any>{
        let selects = ['WT.id as value','WT.type as label'];
        if(productDetails){
            selects.push(`(SELECT CASE WHEN EXISTS (SELECT * FROM product_warranty WHERE WT.id = warranty_type_id AND vendor_product_id = ${productDetails.vendorProductId}) THEN 1 ELSE 0 END) AS isSelected`);
        } else {
            selects.push('0 as isSelected')
        }
        const query = await WarrantyTypesRepository.createQueryBuilder('WT')
        .where('active = 1')
        .select(selects).getRawMany()
        return query;
    }

    public async getProductWarranty(productDetails: any): Promise<any>{
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

        let values: any = [];
        if(productDetails) {
            values = await ProductWarrantyRepository.find({where: { vendorProductId: productDetails.vendorProductId }})
            const transformedValues = values.length > 0 ? values.map((item: any) => {
                if (item.period) {
                    return {
                        id: item.id,
                        key1: item.period.split('-')[0],
                        key2: item.period.split('-')[1],
                        warrantyTypeId: item.warrantyTypeId
                    };
                } else {
                    return null;
                }
            }) : [];
        
            values = transformedValues.filter((item) => item !== null);
        }

        return { warrantyPeriods, values }
    }

    public async insertWarranty(pw: any, vendorProductId: number) {
        for(const i of pw) {
            ProductWarrantyRepository.insert({
              vendorProductId: vendorProductId,
              warrantyTypeId: i.warrantyTypeId,
              period: i.period,
              active: 1
            })
          }
    }

    public async updateWarranty(pw: any, vendorProductId: number) {
        const existingRecords = await ProductWarrantyRepository.find({
            where: { vendorProductId },
        });
        let receivedItemIds: any;
        if(pw.length > 0) {
            receivedItemIds = pw.map(item => item.id).filter(id => id !== undefined);
            for (const item of pw) {
                if (item.id) {
                    const existingRecord = existingRecords.find(record => record.id === item.id);
                    if (existingRecord) {
                        existingRecord.period = item.period ? item.period : null;
                        existingRecord.warrantyTypeId = item.warrantyTypeId;
                        await ProductWarrantyRepository.save(existingRecord);
                    }
                } else {
                        await ProductWarrantyRepository.insert({
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
        if(idsToDelete.length > 0) {
            await ProductWarrantyRepository.delete(idsToDelete);
        }
    }
}