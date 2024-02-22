import { Category } from '../database/models/Category';
import { CategoryML } from '../database/models/CategoryML';
import { UserFavCategory } from '../database/models/UserFavCategory';
import {SiteCategoryRepository,CategoryPathRepository} from '../database';
import { orderBy } from 'lodash';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {

    public async vendorCategories(siteId: number, parent: number, langId: number, userId: number): Promise<any> {
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
        const query: any = await SiteCategoryRepository.createQueryBuilder('SC');
        query.innerJoin(Category, 'C', 'C.id = SC.catId');
        query.innerJoin(CategoryML, 'CML', 'CML.catId = SC.catId');
        query.where('SC.siteId= :siteId', { siteId });
        query.andWhere('CML.langId = :langId', { langId });
        query.andWhere('SC.isActive = 1');
        if (parent !== null) {
            query.andWhere('C.parent= :parent', { parent });
        }
        if (userId !== null) {
            query.leftJoin(UserFavCategory, 'UFC', 'UFC.catId = C.id and UFC.userId = :userId and UFC.siteId = :siteId', { userId, siteId });
        }
        return query.select(selects).getRawMany();
    }
    
    public async categoryPath(catId: number): Promise<any> {
        const categoriesPath: any = await CategoryPathRepository.find({ where: { catId }, order: { level: 'ASC' } });
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
        categories = await SiteCategoryRepository.createQueryBuilder('SC')
        .innerJoin(Category, 'C', 'C.id = SC.catId')
        .innerJoin(CategoryML, 'CML', 'CML.catId = SC.catId')
        .where('SC.catId IN (' + categories + ')')
        .select(selects).getRawMany();
        categories = await Promise.all(categories.map(async (c: any) => {
            const pathOfCat = await categoriesPath.find((p: any) => p.pathId == c.categoryId);
            return {
                ...c,
                level: pathOfCat.level
            };           
        }));
        categories = orderBy(categories, 'level', 'asc');
        return categories;
    }
}