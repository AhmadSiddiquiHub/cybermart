import { Injectable } from "@nestjs/common";
import { RelatedProductsRepository } from "../database";
import { RelatedProducts } from "../database/models/RelatedProducts";
import { In } from 'typeorm';

@Injectable()
export class RelatedProductService {

    constructor() { }

    public async setRelatedProducts(productId: number, relatedVariantIds: number[]) {
        //Bulk Delete 
        await RelatedProductsRepository.createQueryBuilder().delete().from(RelatedProducts)
            .where('product_id = :pId', { pId: productId }).execute();
            let rows = [];
            //Bulk Insert
        if(relatedVariantIds.length > 0) {
            relatedVariantIds.forEach(num => rows.push({ productId, relatedVariantId: num }));
        }
        return await RelatedProductsRepository.createQueryBuilder().insert().into(RelatedProducts)
            .values(rows).execute();
    }

    public async getRelatedVariants(productId: number[]) {

        let result = await RelatedProductsRepository.find({ where: { productId: In(productId) } })
        return result.map(obj => obj.relatedVariantId);

    }
}