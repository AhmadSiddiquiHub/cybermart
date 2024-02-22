import { Injectable } from "@nestjs/common";
import { RelatedProductsRepository } from "../database";
import { RelatedProducts } from "../database/models/RelatedProducts";

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

}