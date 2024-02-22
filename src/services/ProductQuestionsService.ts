import { ProductQuestions } from '../database/models/ProductQuestions';
import { ProductQuestionsRepository } from '../database';
import { Like, Brackets } from 'typeorm';
import { ProductAnswers } from '../database/models/ProductAnswers';
import { Users } from '../database/models/Users';
import { Product } from '../database/models/Product';
import { VendorProductVariant } from '../database/models/VendorProductVariant';
import { ProductVariantImage } from '../database/models/ProductVariantImage';
import { ProductRating } from '../database/models/ProductRating';
import { ProductDiscount } from '../database/models/ProductDiscount';
import { Injectable } from '@nestjs/common';

interface QaListParams {
    limit: number,
    offset: number,
    siteId: number,
    productId: number,
    keyword: string,
    count: boolean
}
@Injectable()
export class ProductQuestionsService {
    
    public async qaList({ limit, offset, siteId, productId, keyword, count }: QaListParams) {
        const selects = [
            'PQ.question as question',
            'PQ.created_at as created_at',
            'PA.answer as answer',
            'U.first_name as first_name',
        ];
        const query: any = await ProductQuestionsRepository.createQueryBuilder('PQ')
        .select(selects)
        .where(`PQ.siteId = ${ siteId }` )
        .andWhere(`PQ.productId = ${ productId }`)
        .leftJoin(ProductAnswers, 'PA', 'PA.product_question_id = PQ.id')
        .leftJoin(Users, 'U', 'U.id = PQ.user_id');
        if (keyword) {
            const searchCols = [
                { column: 'PQ.question' },
                // { column: 'PA.answer' },
            ];
            searchCols.forEach((x, i) => {
                query.andWhere(new Brackets(qb => {
                    if (i === 0) {
                        qb.andWhere('LOWER(' + x.column + ')' + ' LIKE ' + '\'%' + keyword + '%\'');
                    } else {
                        qb.orWhere('LOWER(' + x.column + ')' + ' LIKE ' + '\'%' + keyword + '%\'');
                    }
                })); 
            });
        }
        if (count) {
            return query.getCount();
        }
        if (limit && limit > 0) {
            query.limit(limit).offset(offset);
        }
        return query.getRawMany();
    }

    public async qaListForVendorr(limit: number, offset: number, siteId: number, vendorId: any, count: any, orderBy: any) {
        const selects = [
            'product_questions.id as questionId',
            'product_questions.vendorId as vendorId',
            'product_questions.question as question',
            'product_answers.answer as answer',
            'P.name as name',
            'P.id as productId',
            'pvi.image as image',
            'users.first_name as first_name',
            'users.last_name as last_name',
            'users.avatar as avatar',
            'product_questions.created_at as created_at',
            'PD.price as pricerefer',
            'VPV.price as price',
            'PR.rating as rating',
            'PR.review as review',
        ];
        const query: any = await ProductQuestionsRepository.createQueryBuilder('product_questions')
        .select(selects)
        .where(`product_questions.siteId = ${ siteId }` )
        .andWhere(`product_questions.vendorId = ${ vendorId }`)
        .andWhere(`product_questions.answered = 0`)
        .leftJoin(Product, 'P', 'P.id = product_questions.productId')
        .leftJoin(VendorProductVariant, 'VPV', `VPV.productId = P.id`)
        .leftJoin(ProductDiscount, 'PD', 'PD.vendorProductVariantId = VPV.id')
        .leftJoin(ProductRating, 'PR', `PR.productId = P.id`)
        .leftJoin(ProductVariantImage, 'pvi', `VPV.product_variant_id = pvi.product_variants_id AND pvi.is_default = 1`)
        .leftJoin(ProductAnswers, 'product_answers', 'product_answers.product_question_id = product_questions.id')
        .leftJoin(Users, 'users', 'users.id = product_questions.user_id')
        .orderBy('product_questions.id', 'DESC');
        if (limit && limit > 0) {
            query.limit(limit).offset(offset);
        }
        if (count) {
            return query.getCount();
        }
        if(orderBy){
            query.orderBy('product_questions.id','DESC')
        }
        query.groupBy('product_questions.id')
        return query.getRawMany();
    }

    // country List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }
        condition.order = {
            createdAt: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return ProductQuestionsRepository.count(condition);
        } else {
            return ProductQuestionsRepository.find(condition);
        }
    }
}
