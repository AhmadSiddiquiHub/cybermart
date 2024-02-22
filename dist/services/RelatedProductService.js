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
exports.RelatedProductService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../database");
const RelatedProducts_1 = require("../database/models/RelatedProducts");
const typeorm_1 = require("typeorm");
let RelatedProductService = class RelatedProductService {
    constructor() { }
    async setRelatedProducts(productId, relatedVariantIds) {
        await database_1.RelatedProductsRepository.createQueryBuilder().delete().from(RelatedProducts_1.RelatedProducts)
            .where('product_id = :pId', { pId: productId }).execute();
        let rows = [];
        if (relatedVariantIds.length > 0) {
            relatedVariantIds.forEach(num => rows.push({ productId, relatedVariantId: num }));
        }
        return await database_1.RelatedProductsRepository.createQueryBuilder().insert().into(RelatedProducts_1.RelatedProducts)
            .values(rows).execute();
    }
    async getRelatedVariants(productId) {
        let result = await database_1.RelatedProductsRepository.find({ where: { productId: (0, typeorm_1.In)(productId) } });
        return result.map(obj => obj.relatedVariantId);
    }
};
exports.RelatedProductService = RelatedProductService;
exports.RelatedProductService = RelatedProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RelatedProductService);
//# sourceMappingURL=RelatedProductService.js.map