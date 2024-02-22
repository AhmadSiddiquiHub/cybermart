import { Brand } from '../database/models/Brand';
import {SiteRepository,CategoryBrandRepository} from '../database';
import { Country } from '../database/models/Country';
import { SiteContactInfo } from '../database/models/SiteContactInfo';
import { Category } from '../database/models/Category';
import { Injectable } from '@nestjs/common';


@Injectable()
export class SiteService {

    public async brandsByCategoryId(catId: number, siteId: string): Promise<any> {
        const selects = [
            'B.name as name',
            'B.image as image',
            'B.id as id',
            'B.slug as slug',
        ];
        const query: any = await CategoryBrandRepository.createQueryBuilder('CB')
        .innerJoin(Brand, 'B', 'B.id = CB.brandId')
        .innerJoin(Category, 'C', 'C.id = CB.catId')
        .where('CB.catId = :catId and CB.siteId = :siteId and CB.isActive = true', { catId, siteId })
        .select(selects);
        return query.getRawMany();
    }

    public async getSitess(): Promise<any> {
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
        const query: any = await SiteRepository.createQueryBuilder('site');
        query.select(selects);
        query.leftJoin(Country, 'country', 'country.countriesId = site.countryId');
        query.leftJoin(SiteContactInfo, 'contactInfo', 'contactInfo.siteId = site.id AND contactInfo.isActive = 1');
        return query.getRawMany();
    }
}