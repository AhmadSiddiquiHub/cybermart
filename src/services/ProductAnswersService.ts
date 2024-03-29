import {ProductAnswersRepository} from '../database';
import {Like} from 'typeorm/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductAnswersService {

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
            return ProductAnswersRepository.count(condition);
        } else {
            return ProductAnswersRepository.find(condition);
        }
    }
}
