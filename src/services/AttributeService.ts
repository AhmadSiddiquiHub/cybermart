import { AttributesToCategoryRepository, AttributeValueRepository} from '../database';
import { Attribute } from '../database/models/Attribute';
import { SiteService } from './SiteService';
import { commonProductAttributes } from '../utils/ProductAttributeUtil';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AttributeService {

    constructor(
        private siteService: SiteService,
    ) {}

    public async getProductAttributes(catId: number, siteId: string): Promise<any> {
        let brands = await this.siteService.brandsByCategoryId(catId, siteId);
        brands = brands.map((b, index) => {
            // if (index === 0) {
            //     return { label: 'No Brand', value: 1 };
            // } else {
                return { label: b.name, value: b.id };
            // }
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
        let attributes: any = await AttributesToCategoryRepository.createQueryBuilder('PCA')
        .innerJoin(Attribute, 'PA', 'PA.id = PCA.productAttributeId')
        .orderBy('PCA.sortOrder', 'ASC')
        .where('PCA.categoryId = :catId AND PCA.showOnCreateProductForm = 1', { catId })
        .select(selects).getRawMany();
        // commonProductAttributes do not have id. dynamic attributes are comming from db
        attributes = [...commonProductAttributes, ...attributes]
        let ids = attributes.map(item => item.id ? item.id : 0);
        ids = [0, ...ids]
        const values: any = await AttributeValueRepository.createQueryBuilder('PAV')
        .where('PAV.productAttributeId IN (' + ids + ') AND PAV.categoryId = :catId', { catId })
        .select(['PAV.id as value','PAV.productAttributeId as productAttributeId','PAV.name as label']).getRawMany();
        attributes = attributes.map((item) => {
            if (item.formName === 'brandId') {
                return { ...item, options: brands }
            }
            if (item.attributeType === 'dropdown') {
                const v = values.filter((a, b) => a.productAttributeId === item.id);
                return { ...item, options: v, }
            }
            return { ...item, options: [] }
        });
        return attributes;
    }
}