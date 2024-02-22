"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const Category_1 = require("../database/models/Category");
const CategoryML_1 = require("../database/models/CategoryML");
const UserFavCategory_1 = require("../database/models/UserFavCategory");
const database_1 = require("../database");
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
let CategoryService = class CategoryService {
    async vendorCategories(siteId, parent, langId, userId) {
        const selects = [
            'SC.catId as categoryId',
            'C.urlKey as categorySlug',
            'C.urlKey as slug',
            'C.icon as icon',
            'C.image as image',
            'C.parent as parent',
            'CML.name as name',
        ];
        if (userId !== null) {
            selects.push('UFC.id as isFavourite');
        }
        const query = await database_1.SiteCategoryRepository.createQueryBuilder('SC');
        query.innerJoin(Category_1.Category, 'C', 'C.id = SC.catId');
        query.innerJoin(CategoryML_1.CategoryML, 'CML', 'CML.catId = SC.catId');
        query.where('SC.siteId= :siteId', { siteId });
        query.andWhere('CML.langId = :langId', { langId });
        query.andWhere('SC.isActive = 1');
        if (parent !== null) {
            query.andWhere('C.parent= :parent', { parent });
        }
        if (userId !== null) {
            query.leftJoin(UserFavCategory_1.UserFavCategory, 'UFC', 'UFC.catId = C.id and UFC.userId = :userId and UFC.siteId = :siteId', { userId, siteId });
        }
        return query.select(selects).getRawMany();
    }
    async categoryPath(catId) {
        const categoriesPath = await database_1.CategoryPathRepository.find({ where: { catId }, order: { level: 'ASC' } });
        let categories = categoriesPath.map(item => item.pathId);
        const selects = [
            'SC.catId as categoryId',
            'C.urlKey as categorySlug',
            'C.urlKey as slug',
            'C.icon as icon',
            'C.image as image',
            'C.parent as parent',
            'CML.name as name',
        ];
        categories = await database_1.SiteCategoryRepository.createQueryBuilder('SC')
            .innerJoin(Category_1.Category, 'C', 'C.id = SC.catId')
            .innerJoin(CategoryML_1.CategoryML, 'CML', 'CML.catId = SC.catId')
            .where('SC.catId IN (' + categories + ')')
            .select(selects).getRawMany();
        categories = await Promise.all(categories.map(async (c) => {
            const pathOfCat = await categoriesPath.find((p) => p.pathId == c.categoryId);
            return {
                ...c,
                level: pathOfCat.level
            };
        }));
        categories = (0, lodash_1.orderBy)(categories, 'level', 'asc');
        return categories;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)()
], CategoryService);
//# sourceMappingURL=CategoryService.js.map