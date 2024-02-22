"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionsService = void 0;
const database_1 = require("../database");
const typeorm_1 = require("typeorm");
const ProductAnswers_1 = require("../database/models/ProductAnswers");
const Users_1 = require("../database/models/Users");
const Product_1 = require("../database/models/Product");
const VendorProductVariant_1 = require("../database/models/VendorProductVariant");
const ProductVariantImage_1 = require("../database/models/ProductVariantImage");
const ProductRating_1 = require("../database/models/ProductRating");
const ProductDiscount_1 = require("../database/models/ProductDiscount");
const common_1 = require("@nestjs/common");
let ProductQuestionsService = class ProductQuestionsService {
    async qaList({ limit, offset, siteId, productId, keyword, count }) {
        const selects = [
            'PQ.question as question',
            'PQ.created_at as created_at',
            'PA.answer as answer',
            'U.first_name as first_name',
        ];
        const query = await database_1.ProductQuestionsRepository.createQueryBuilder('PQ')
            .select(selects)
            .where(`PQ.siteId = ${siteId}`)
            .andWhere(`PQ.productId = ${productId}`)
            .leftJoin(ProductAnswers_1.ProductAnswers, 'PA', 'PA.product_question_id = PQ.id')
            .leftJoin(Users_1.Users, 'U', 'U.id = PQ.user_id');
        if (keyword) {
            const searchCols = [
                { column: 'PQ.question' },
            ];
            searchCols.forEach((x, i) => {
                query.andWhere(new typeorm_1.Brackets(qb => {
                    if (i === 0) {
                        qb.andWhere('LOWER(' + x.column + ')' + ' LIKE ' + '\'%' + keyword + '%\'');
                    }
                    else {
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
    async qaListForVendorr(limit, offset, siteId, vendorId, count, orderBy) {
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
        const query = await database_1.ProductQuestionsRepository.createQueryBuilder('product_questions')
            .select(selects)
            .where(`product_questions.siteId = ${siteId}`)
            .andWhere(`product_questions.vendorId = ${vendorId}`)
            .andWhere(`product_questions.answered = 0`)
            .leftJoin(Product_1.Product, 'P', 'P.id = product_questions.productId')
            .leftJoin(VendorProductVariant_1.VendorProductVariant, 'VPV', `VPV.productId = P.id`)
            .leftJoin(ProductDiscount_1.ProductDiscount, 'PD', 'PD.vendorProductVariantId = VPV.id')
            .leftJoin(ProductRating_1.ProductRating, 'PR', `PR.productId = P.id`)
            .leftJoin(ProductVariantImage_1.ProductVariantImage, 'pvi', `VPV.product_variant_id = pvi.product_variants_id AND pvi.is_default = 1`)
            .leftJoin(ProductAnswers_1.ProductAnswers, 'product_answers', 'product_answers.product_question_id = product_questions.id')
            .leftJoin(Users_1.Users, 'users', 'users.id = product_questions.user_id')
            .orderBy('product_questions.id', 'DESC');
        if (limit && limit > 0) {
            query.limit(limit).offset(offset);
        }
        if (count) {
            return query.getCount();
        }
        if (orderBy) {
            query.orderBy('product_questions.id', 'DESC');
        }
        query.groupBy('product_questions.id');
        return query.getRawMany();
    }
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
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
            return database_1.ProductQuestionsRepository.count(condition);
        }
        else {
            return database_1.ProductQuestionsRepository.find(condition);
        }
    }
};
exports.ProductQuestionsService = ProductQuestionsService;
exports.ProductQuestionsService = ProductQuestionsService = __decorate([
    (0, common_1.Injectable)()
], ProductQuestionsService);
//# sourceMappingURL=ProductQuestionsService.js.map