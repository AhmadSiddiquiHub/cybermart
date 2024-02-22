import { Injectable } from '@nestjs/common';
import { VendorProductVariantRepository} from '../database';

@Injectable()
export class VendorProductVariantService {

    public generateRandomString(length: number): string {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      }
    
    public async checkAndGenerateSKU(sku: string, whereCondition: any, vendorId: any): Promise<string> {
      const existingProduct = await VendorProductVariantRepository.findOne({ where: whereCondition });
      if (!existingProduct) {
        return sku.toUpperCase();
      }
      let suffixLength = 1;
      let newSlug = sku.toUpperCase() + this.generateRandomString(suffixLength);
      
      while (await VendorProductVariantRepository.findOne({ where: { sku: newSlug, vendorId }})) {
        suffixLength++;
        newSlug = sku.toUpperCase() + this.generateRandomString(suffixLength);
      }
      return newSlug.toUpperCase();
    }
      
}