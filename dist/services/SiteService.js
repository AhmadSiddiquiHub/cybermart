"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteService = void 0;
const Brand_1 = require("../database/models/Brand");
const database_1 = require("../database");
const Country_1 = require("../database/models/Country");
const SiteContactInfo_1 = require("../database/models/SiteContactInfo");
const Category_1 = require("../database/models/Category");
const common_1 = require("@nestjs/common");
let SiteService = class SiteService {
    async brandsByCategoryId(catId, siteId) {
        const selects = [
            'B.name as name',
            'B.image as image',
            'B.id as id',
            'B.slug as slug',
        ];
        const query = await database_1.CategoryBrandRepository.createQueryBuilder('CB')
            .innerJoin(Brand_1.Brand, 'B', 'B.id = CB.brandId')
            .innerJoin(Category_1.Category, 'C', 'C.id = CB.catId')
            .where('CB.catId = :catId and CB.siteId = :siteId and CB.isActive = true', { catId, siteId })
            .select(selects);
        return query.getRawMany();
    }
    async getSitess() {
        const selects = [
            'site.id as id',
            'site.iso1 as countryCode',
            'site.zipcodeFormate as zipcodeFormate',
            'site.fbLink as facebook',
            'site.instaLink as instagram',
            'site.twitterLink as twitter',
            'site.linkedinLink as linkedin',
            'site.youtubeLink as youtube',
            'site.pinterestLink as pinterest',
            'site.favicon as favicon',
            'site.logo as logo',
            'site.websiteLink as websiteLink',
            'country.name as name',
            'country.numericCode as numericCode',
            'country.iso2 as iso2',
            'country.iso3 as iso3',
            'country.phonecode as phonecode',
            'country.currency as currency',
            'country.currencyName as currencyName',
            'country.currencySymbol as currencySymbol',
            'country.svgIcon as svgIcon',
            'contactInfo.phoneNumber as phoneNumber',
            'contactInfo.phoneOfc as phoneOfc',
            'contactInfo.phoneHome as phoneHome',
            'contactInfo.emailOfc as emailOfc',
            'contactInfo.emailPersonal as emailPersonal',
        ];
        const query = await database_1.SiteRepository.createQueryBuilder('site');
        query.select(selects);
        query.leftJoin(Country_1.Country, 'country', 'country.countriesId = site.countryId');
        query.leftJoin(SiteContactInfo_1.SiteContactInfo, 'contactInfo', 'contactInfo.siteId = site.id AND contactInfo.isActive = 1');
        return query.getRawMany();
    }
};
exports.SiteService = SiteService;
exports.SiteService = SiteService = __decorate([
    (0, common_1.Injectable)()
], SiteService);
//# sourceMappingURL=SiteService.js.map