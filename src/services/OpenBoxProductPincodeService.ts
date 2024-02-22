import { Injectable } from '@nestjs/common';
import { OpenBoxProductPincodeRepository } from '../database';
import { OpenBoxProductPincodes } from '../database/models/OpenBoxProductPincodes';

@Injectable()
export class OpenBoxProductPincodeService {
    constructor(
    ) { }

    
    public async bulkCreate(pincodes: number[], vendorId: number, productId: number, edit?: boolean) {
        
        let entityRows = [];
        pincodes.forEach(pincode => entityRows.push({ vendorId, productId, pincode }));
        
        try {
            let result = await OpenBoxProductPincodeRepository.createQueryBuilder('SDP').insert().into(OpenBoxProductPincodes)
            .values(entityRows).execute();
            if (result)
            return true
        
    } catch (error) {
        console.log(error);
        return false;
    }
    
    return false;
}

    public async setOpenBoxProductPincodes(vendorId, productId, pincodes) {
        await OpenBoxProductPincodeRepository.createQueryBuilder('SDP').delete().from(OpenBoxProductPincodes)
        .where('vendor_id = :vid', { vid: vendorId }).andWhere('product_id = :pid', { pid: productId }).execute();

        const result = await this.bulkCreate(pincodes, vendorId, productId);
        if (result)
            return result;

        return false
    }

}