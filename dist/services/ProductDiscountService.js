"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountService = void 0;
const database_1 = require("../database");
const common_1 = require("@nestjs/common");
let ProductDiscountService = class ProductDiscountService {
    async findDiscountPricee(vendorProductVariantId, todaydate) {
        const query = await database_1.ProductDiscountRepository.createQueryBuilder('productDiscount');
        query.select(['productDiscount.price as price', 'productDiscount.startDate as startDate', 'productDiscount.endDate as endDate']);
        query.where('productDiscount.vendorProductVariantId = ' + vendorProductVariantId);
        query.andWhere('(productDiscount.startDate <= :todaydate AND productDiscount.endDate >= :todaydate)', { todaydate });
        query.orderBy('productDiscount.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }
    async findDiscountPricewithSkuu(vendorProductVariantId, skuId, todaydate) {
        const query = await database_1.ProductDiscountRepository.createQueryBuilder('productDiscount');
        query.select(['productDiscount.price as price', 'productDiscount.startDate as startDate', 'productDiscount.endDate as endDate']);
        query.where('productDiscount.vendorProductVariantId = ' + vendorProductVariantId);
        query.where('productDiscount.skuId = ' + skuId);
        query.andWhere('(productDiscount.startDate <= :todaydate AND productDiscount.endDate >= :todaydate)', { todaydate });
        query.orderBy('productDiscount.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }
    async findByVariantIdd(id, todaydate) {
        const selects = [
            'pd.price as price',
            'pd.startDate as startDate',
            'pd.endDate as endDate',
            'pd.vendorProductVariantId as vendorProductVariantId',
            'pd.id as productDiscountId',
        ];
        const query = await database_1.ProductDiscountRepository.createQueryBuilder('pd');
        query.select(selects);
        query.where('pd.vendorProductVariantId = :id ', { id });
        query.andWhere('(pd.startDate <= :todaydate AND pd.endDate >= :todaydate)', { todaydate });
        query.orderBy('pd.price', 'ASC');
        query.limit('1');
        return query.getRawOne();
    }
    async findAllVariantByIdd(id, todaydate) {
        const selects = [
            'pd.price as price',
            'pd.startDate as startDate',
            'pd.endDate as endDate',
            'pd.vendorProductVariantId as vendorProductVariantId',
            'pd.id as productDiscountId',
        ];
        const query = await database_1.ProductDiscountRepository.createQueryBuilder('pd');
        query.select(selects);
        query.where('pd.vendorProductVariantId = :id ', { id });
        query.andWhere('(pd.startDate <= :todaydate AND pd.endDate >= :todaydate)', { todaydate });
        query.orderBy('pd.price', 'ASC');
        return query.getRawMany();
    }
    async getAll_VariantDiscounts_OfProductt(ids, todaydate) {
        const selects = [
            'pd.price as price',
            'pd.startDate as startDate',
            'pd.endDate as endDate',
            'pd.vendorProductVariantId as vendorProductVariantId',
            'pd.id as productDiscountId',
        ];
        const query = await database_1.ProductDiscountRepository.createQueryBuilder('pd');
        query.select(selects);
        query.where('pd.vendorProductVariantId IN (' + ids + ')');
        query.andWhere('(pd.startDate <= :todaydate AND pd.endDate >= :todaydate)', { todaydate });
        query.orderBy('pd.price', 'ASC');
        return query.getRawMany();
    }
    async create(Data) {
        return database_1.ProductDiscountRepository.save(Data);
    }
    async update(d) {
        return database_1.ProductDiscountRepository.save(d);
    }
    findOne(id) {
        return database_1.ProductDiscountRepository.findOne(id);
    }
    findOneValue(id) {
        return database_1.ProductDiscountRepository.findOne(id);
    }
    findAll(productDiscount) {
        return database_1.ProductDiscountRepository.find(productDiscount);
    }
    find() {
        return database_1.ProductDiscountRepository.find();
    }
    async delete(id) {
        const deleteProductDiscount = await database_1.ProductDiscountRepository.delete(id);
        return deleteProductDiscount;
    }
    async findDiscountPrice(vendorProductVariantId, todayDate) {
        return await this.findDiscountPricee(vendorProductVariantId, todayDate);
    }
    async findDiscountPricewithSku(vendorProductVariantId, skuId, todayDate) {
        return await this.findDiscountPricewithSkuu(vendorProductVariantId, skuId, todayDate);
    }
    async findByVariantId(id, todayDate) {
        return await this.findByVariantIdd(id, todayDate);
    }
    async findAllVariantById(id, todayDate) {
        return await this.findAllVariantByIdd(id, todayDate);
    }
    async getAll_VariantDiscounts_OfProduct(ids, todayDate) {
        return await this.getAll_VariantDiscounts_OfProductt(ids, todayDate);
    }
};
exports.ProductDiscountService = ProductDiscountService;
exports.ProductDiscountService = ProductDiscountService = __decorate([
    (0, common_1.Injectable)()
], ProductDiscountService);
//# sourceMappingURL=ProductDiscountService.js.map