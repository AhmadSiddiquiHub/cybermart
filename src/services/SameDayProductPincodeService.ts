import { Injectable } from '@nestjs/common';
import { SameDayProductPincodeRepository } from '../database';
import { SameDayProductPincodes } from '../database/models/SameDayProductPincodes';

@Injectable()
export class SameDayProductPincodeService {

    constructor(
    ) { }

    public async bulkCreate(pincodes: number[], vendorId: number, productId: number, edit?: boolean) {
        let entityRows = [];
        console.log(pincodes)
        pincodes.forEach(pincode => entityRows.push({ vendorId, product_id: productId, pincode }));
        try {
            let result = await SameDayProductPincodeRepository.createQueryBuilder('SDP').insert().into(SameDayProductPincodes)
                .values(entityRows).execute();
            if (result)
                return true

        } catch (error) {
            console.log(error);
            return false;
        }
        return false;
    }

    public async setSameDayProductPincodes(vendorId, productId, pincodes) {
        await SameDayProductPincodeRepository.createQueryBuilder('SDP').delete().from(SameDayProductPincodes)
            .where('vendor_id = :vid', { vid: vendorId }).andWhere('product_id = :pid', { pid: productId }).execute();
        const result = await this.bulkCreate(pincodes, vendorId, productId);
        if (result)
            return result;
        return false
    }

    public async findPincodesByProductId(productId: number) {
        const result = await SameDayProductPincodeRepository.createQueryBuilder('SDP').where('product_id = :pid', { pid: productId }).select('SDP.pincode as pincode').getRawMany();
        let pincodes = []
        result.forEach(o => pincodes.push(o.pincode))
        return pincodes;
    }

}