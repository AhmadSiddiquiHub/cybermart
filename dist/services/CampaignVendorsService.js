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
exports.CampaignVendorsService = void 0;
const CampaignVendors_1 = require("../database/models/CampaignVendors");
const database_1 = require("../database");
const index_1 = require("typeorm/index");
const Campaign_1 = require("../database/models/Campaign");
const utils_1 = require("../utils");
const SubOrderService_1 = require("./SubOrderService");
const common_1 = require("@nestjs/common");
let CampaignVendorsService = class CampaignVendorsService {
    constructor(subOrderService) {
        this.subOrderService = subOrderService;
    }
    async stats(request) {
        request.body.count = 1;
        const vendorId = request.user.userId;
        const campaignId = request.body.campaignId;
        const statusId = utils_1.OrderStatusEnum.Delivered;
        const earnings = await this.subOrderService.earnings({ statusId, vendorId, campaignId });
        const statusCount = [
            { name: "Earning", value: earnings.earnings, icon: "campaign-stats-icons/sold5.png" }
        ];
        return statusCount;
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
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return database_1.CampaignVendorsRepository.count(condition);
        }
        else {
            return database_1.CampaignVendorsRepository.find(condition);
        }
    }
    async getRegisteredCampaignsData(vendorId, today) {
        const query = await database_1.CampaignVendorsRepository.createQueryBuilder('CV');
        query.select(['campaign.campaignName as campaignName', 'campaign.metaDescription as campaignDescription', 'campaign.slug as slug', 'campaign.mainPageBanner as mainPageBanner', 'campaign.vendorRegBanner as vendorRegBanner', 'campaign.endDate as campaignEndDate']);
        query.where('CV.vendorId = :vendorId', { vendorId });
        query.andWhere('(campaign.startDate <= :today AND campaign.endDate >= :today)', { today });
        query.andWhere('campaign.isActive = :isActive', { isActive: 1 });
        query.innerJoin(Campaign_1.Campaign, 'campaign', 'CV.campaignId = campaign.id');
        return query.getRawMany();
    }
    async listByQueryBuilder(limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count = false, rawQuery = false) {
        const query = await (0, index_1.getConnection)().getRepository(CampaignVendors_1.CampaignVendors).createQueryBuilder();
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb) => {
                query.innerJoin(joinTb.tableName, joinTb.aliasName, joinTb.condition);
            });
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(item.name + ' = ' + item.value);
                }
                else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + item.value);
                }
                else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(' \'' + item.name + '\'' + ' ' + item.sign + ' \'' + item.value + '\'');
                }
                else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                }
                else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(item.name + ' = ' + item.value);
                }
                else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(item.name + ' IN (' + item.value + ')');
                }
            });
        }
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table) => {
                if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                    const namesArray = table.name;
                    namesArray.forEach((name, index) => {
                        query.andWhere(new index_1.Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value, subIndex) => {
                                if (subIndex === 0) {
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    });
                }
                else if (table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new index_1.Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name, index) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                        });
                    }));
                }
                else if (table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new index_1.Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value, index) => {
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
        if (groupBy && groupBy.length > 0) {
            let i = 0;
            groupBy.forEach((item) => {
                if (i === 0) {
                    query.groupBy(item.name);
                }
                else {
                    query.addGroupBy(item.name);
                }
                i++;
            });
        }
        if (sort && sort.length > 0) {
            sort.forEach((item) => {
            });
        }
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        if (!count) {
            if (rawQuery) {
                return query.getRawMany();
            }
            return query.getMany();
        }
        else {
            return query.getCount();
        }
    }
};
exports.CampaignVendorsService = CampaignVendorsService;
exports.CampaignVendorsService = CampaignVendorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [SubOrderService_1.SubOrderService])
], CampaignVendorsService);
//# sourceMappingURL=CampaignVendorsService.js.map