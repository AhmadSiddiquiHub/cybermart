import { CampaignVendors } from '../database/models/CampaignVendors';
import { CampaignVendorsRepository } from '../database';
import { Brackets, getConnection, Like } from 'typeorm/index';
import { Campaign } from '../database/models/Campaign';
import { OrderStatusEnum } from '../utils';
import { SubOrderService } from './SubOrderService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CampaignVendorsService {

    constructor(
        private subOrderService: SubOrderService,
        ) {
    }

    public async stats(request:any){
        request.body.count = 1;
        // get count of orders by their statuses
        // request.body.statusId = OrderStatusEnum.Placed;
        // const pending = await this.orderService.orderCounting(request);

        // request.body.statusId = OrderStatusEnum.Cancelled;
        // const cancelled = await this.orderService.orderCounting(request);

        // request.body.statusId = OrderStatusEnum.PackingInProgress;
        // const unshipped = await this.orderService.orderCounting(request);

        // request.body.statusId = OrderStatusEnum.Shipped;
        // const shipped = await this.orderService.orderCounting(request);

        // request.body.statusId = OrderStatusEnum.Delivered;
        // const delivered = await this.orderService.orderCounting(request);

        // request.body.statusId = OrderStatusEnum.Cancelled;
        // const cancellationPending = await this.orderService.orderCounting(request);

        // request.body.statusId = 0;
        // const all = await this.orderService.orderCounting(request);

        const vendorId = request.user.userId;
        const campaignId = request.body.campaignId
        const statusId = OrderStatusEnum.Delivered;
        const earnings = await this.subOrderService.earnings({ statusId, vendorId, campaignId });
        
        // const statusId = OrderStatusEnum.ReturnPending;
        // const returnRequestsCount = await this.subOrderService.subOrderQuery({ statusId, vendorId, campaignId, limit: 0, count: 1 });

        const statusCount = [
            // { name:"Pending Shippment", value: unshipped, icon:"campaign-stats-icons/sold3.png" },
            // { name:"Shipped Orders", value: shipped, icon:"campaign-stats-icons/sold4.png" },
            // { name:"Orders Cancelled", value: cancellationPending, icon:"campaign-stats-icons/sold2.png" },
            // { name:"Orders Recieved", value: all, icon:"campaign-stats-icons/sold2.png" },
            { name:"Earning", value: earnings.earnings, icon:"campaign-stats-icons/sold5.png" }
        ];
        return statusCount
    }
    // cmpgn List
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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return CampaignVendorsRepository.count(condition);
        } else {
            return CampaignVendorsRepository.find(condition);
        }
    }
    // public async voucherlist(userId: number) {
    //     const query: any = await getConnection().getRepository(CampaignVendors).createQueryBuilder('campaign_users');
    //     query.select(['campaign.campaignName as campaignName', 'campaign.discount as discount', 'campaign.campaignCode as campaignCode', 'campaign.campaignType as campaignType', 'campaign.campaignDescription as campaignDescription', 'campaign.endDate as campaignEndDate']);
    //     query.where('campaign_users.userId = :userId', { userId });
    //     query.innerJoin(Campaign, 'campaign', 'campaign_users.campaignId = campaign.vendorCampaignId');
    //     return query.getRawMany();
    // }
    // public async current(userId: number, today: string) {
    //     const query: any = await getConnection().getRepository(CampaignVendors).createQueryBuilder('campaign_users');
    //     query.select(['campaign.campaignName as campaignName', 'campaign.discount as discount', 'campaign.campaignCode as campaignCode', 'campaign.campaignType as campaignType', 'campaign.campaignDescription as campaignDescription', 'campaign.endDate as campaignEndDate']);
    //     query.where('campaign_users.userId = :userId', { userId });
    //     query.andWhere('(campaign.startDate <= :today AND campaign.endDate >= :today)', { today });
    //     query.andWhere('campaign.isActive = :isActive', { isActive: 1 });
    //     query.innerJoin(Campaign, 'campaign', 'campaign_users.campaignId = campaign.vendorCampaignId');
    //     return query.getRawMany();
    // }
    // public async past(userId: number, today: string) {
    //     const query: any = await getConnection().getRepository(CampaignVendors).createQueryBuilder('campaign_users');
    //     query.select(['campaign.campaignName as campaignName', 'campaign.discount as discount', 'campaign.campaignCode as campaignCode', 'campaign.campaignType as campaignType', 'campaign.campaignDescription as campaignDescription', 'campaign.endDate as campaignEndDate']);
    //     query.where('campaign_users.userId = :userId', { userId });
    //     query.andWhere('(campaign.startDate <= :today AND campaign.endDate <= :today)', { today });
    //     // query.andWhere('campaign.isActive = :isActive', { isActive: 0 });
    //     query.innerJoin(Campaign, 'campaign', 'campaign_users.campaignId = campaign.vendorCampaignId');
    //     return query.getRawMany();
    // }
    public async getRegisteredCampaignsData(vendorId: number, today: string) {
        const query: any = await CampaignVendorsRepository.createQueryBuilder('CV');
        query.select(['campaign.campaignName as campaignName', 'campaign.metaDescription as campaignDescription', 'campaign.slug as slug', 'campaign.mainPageBanner as mainPageBanner','campaign.vendorRegBanner as vendorRegBanner', 'campaign.endDate as campaignEndDate']);
        query.where('CV.vendorId = :vendorId', { vendorId });
        query.andWhere('(campaign.startDate <= :today AND campaign.endDate >= :today)', { today });
        query.andWhere('campaign.isActive = :isActive', { isActive: 1 });
        query.innerJoin(Campaign, 'campaign', 'CV.campaignId = campaign.id');
        return query.getRawMany();
    }
    
    public async listByQueryBuilder(
        limit: number,
        offset: number,
        select: any = [],
        whereConditions: any = [],
        searchConditions: any = [],
        relations: any = [],
        groupBy: any = [],
        sort: any = [],
        count: boolean = false,
        rawQuery: boolean = false)
        : Promise<CampaignVendors[] | number> {

        const query: any = await getConnection().getRepository(CampaignVendors).createQueryBuilder();
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Join
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                query.innerJoin(joinTb.tableName, joinTb.aliasName, joinTb.condition);
            });
        }
        // Where
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(' \'' + item.name + '\'' + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(item.name + ' IN (' + item.value + ')');
                }
            });
        }
        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                    const namesArray = table.name;
                    namesArray.forEach((name: string, index: number) => {
                        query.andWhere(new Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: string | number, subIndex: number) => {
                                if (subIndex === 0) {
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    });
                } else if (table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                        });
                    }));
                } else if (table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value: string | number, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                        });
                    }));
                }
            });
        }
        // GroupBy
        if (groupBy && groupBy.length > 0) {
            let i = 0;
            groupBy.forEach((item: any) => {
                if (i === 0) {
                    query.groupBy(item.name);
                } else {
                    query.addGroupBy(item.name);
                }
                i++;
            });
        }
        // orderBy
        if (sort && sort.length > 0) {
            sort.forEach((item: any) => {
               // query.orderBy('' + item.name + '', '' + item.order + '');
            });
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        if (!count) {
            if (rawQuery) {
               return query.getRawMany();
            }
            return query.getMany();
        } else {
            return query.getCount();
        }
    }

}
