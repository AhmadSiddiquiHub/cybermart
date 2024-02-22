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
exports.AttributeService = void 0;
const database_1 = require("../database");
const Attribute_1 = require("../database/models/Attribute");
const SiteService_1 = require("./SiteService");
const ProductAttributeUtil_1 = require("../utils/ProductAttributeUtil");
const common_1 = require("@nestjs/common");
let AttributeService = class AttributeService {
    constructor(siteService) {
        this.siteService = siteService;
    }
    async getProductAttributes(catId, siteId) {
        let brands = await this.siteService.brandsByCategoryId(catId, siteId);
        brands = brands.map((b, index) => {
            return { label: b.name, value: b.id };
        });
        const selects = [
            'PA.id as id',
            'PA.label as label',
            'PA.formName as formName',
            'PA.attributeType as attributeType',
            'PCA.type as type',
            'PCA.isRequired as isRequired',
            'PCA.isCommon as isCommon',
        ];
        let attributes = await database_1.AttributesToCategoryRepository.createQueryBuilder('PCA')
            .innerJoin(Attribute_1.Attribute, 'PA', 'PA.id = PCA.productAttributeId')
            .orderBy('PCA.sortOrder', 'ASC')
            .where('PCA.categoryId = :catId AND PCA.showOnCreateProductForm = 1', { catId })
            .select(selects).getRawMany();
        attributes = [...ProductAttributeUtil_1.commonProductAttributes, ...attributes];
        let ids = attributes.map(item => item.id ? item.id : 0);
        ids = [0, ...ids];
        const values = await database_1.AttributeValueRepository.createQueryBuilder('PAV')
            .where('PAV.productAttributeId IN (' + ids + ') AND PAV.categoryId = :catId', { catId })
            .select(['PAV.id as value', 'PAV.productAttributeId as productAttributeId', 'PAV.name as label']).getRawMany();
        attributes = attributes.map((item) => {
            if (item.formName === 'brandId') {
                return { ...item, options: brands };
            }
            if (item.attributeType === 'dropdown') {
                const v = values.filter((a, b) => a.productAttributeId === item.id);
                return { ...item, options: v, };
            }
            return { ...item, options: [] };
        });
        return attributes;
    }
};
exports.AttributeService = AttributeService;
exports.AttributeService = AttributeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [SiteService_1.SiteService])
], AttributeService);
//# sourceMappingURL=AttributeService.js.map