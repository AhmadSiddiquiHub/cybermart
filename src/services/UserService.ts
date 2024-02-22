import { Country } from '../database/models/Country';
import {UserRepository,SiteRepository} from '../database';
import { UserAddresses } from '../database/models/UserAddresses';
import { State } from '../database/models/State';
import { City } from '../database/models/City';
import { VendorStoreProfile } from '../database/models/VendorStoreProfile';
import { VendorBankAccount } from '../database/models/VendorBankAccount';
import { Seller } from '../database/models/Sellers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    public async findByIds(ids: any): Promise<any> {
        const selects = [
            'U.userId as userId',
            'U.firstName as firstName',
            'U.lastName as lastName',
            'U.typeId as typeId',
            'U.email as email'
        ];
        const query: any = await UserRepository.createQueryBuilder('U').where('U.userId IN (' + ids + ')').select(selects);
        return query.getRawMany();
    }

    public async sellerAccData(userId: any): Promise<any> {
        const selects = [
            'U.firstName as firstName',
            'U.userId as userId',
            'U.lastName as lastName',
            'U.dateOfBirth as dateOfBirth',
            'U.email as email',
            'U.mobileNumber as mobileNumber',
            'U.avatar as avatar',
            'state.id as stateId',
            'city.id as cityId',
            'U.typeId as typeId',
            'country.countriesId as countryId',
            'UserAddresses.Lineaddr1 as Lineaddr1',
            'UserAddresses.Lineaddr2 as Lineaddr2',
            'UserAddresses.zipcode as zipcode',
            'VSP.storeName as storeName',
            'VSP.id as storeId',
            'VBA.bankId as bankId',
            'VBA.accountNo as accountNo',
            'VBA.accountHolderName as accountHolderName',
            'VBA.IBAN as IBAN',
            'VBA.branchCode as branchCode',
            'VBA.chequeImage as chequeImage',
            'Seller.isProfileCompleted as isProfileCompleted',
            'Seller.productAutoApproval as productAutoApproval'
            // 'D.identityType as identityType',
            // 'D.identityNumber as identityNumber',
            // 'D.issueDate as issueDate',
            // 'D.expiryDate as expiryDate',
            // 'D.frontImage as frontImage',
            // 'D.backImage as backImage',
        ];
        const query: any = await UserRepository.createQueryBuilder('U')
        .innerJoin(Seller, 'Seller', 'U.userId = Seller.userId')
        .leftJoin(UserAddresses, 'UserAddresses', 'U.userId = UserAddresses.userId')
        .leftJoin(State, 'state', 'UserAddresses.stateId = state.id')
        .leftJoin(City, 'city', 'UserAddresses.city_id = city.id')
        .leftJoin(Country, 'country', 'UserAddresses.country_id = country.countriesId')
        .leftJoin(VendorStoreProfile, 'VSP', 'VSP.user_id = U.userId')
        .leftJoin(VendorBankAccount, 'VBA', 'VBA.vendor_id = U.userId')
        .where('U.userId = :userId', { userId })
        .groupBy('U.userId');
        return query.select(selects).getRawOne();
        // query.leftJoin(Documents, 'D', 'U.userId = D.vendor_id');
        //query.andWhere('U.typeId = :typeId', { typeId });
        // return query.getRawMany();
    }

    public async vendorMarketplaces(userId: number): Promise<any> {
        const selects = [
            'S.id as id',
            'S.iso1 as countryCode',
            'S.zipcodeFormate as zipcodeFormate',
            // 'S.fbLink as facebook',
            // 'S.instaLink as instagram',
            // 'S.twitterLink as twitter',
            // 'S.linkedinLink as linkedin',
            // 'S.youtubeLink as youtube',
            // 'S.pinterestLink as pinterest',
            // 'S.favicon as favicon',
            // 'S.logo as logo',
            // 'S.websiteLink as websiteLink',
            'C.name as name',
            // 'C.numericCode as numericCode',
            // 'C.iso2 as iso2',
            // 'C.iso3 as iso3',
            'C.phonecode as phonecode',
            // 'C.currency as currency',
            // 'C.currencyName as currencyName',
            'C.currencySymbol as currencySymbol',
            'C.svgIcon as svgIcon',
        ];
        const query: any = await SiteRepository.createQueryBuilder('S');
        query.select(selects);
        // query.innerJoin(SiteUser, 'SU', 'SU.siteId = S.id');
        query.innerJoin(Country, 'C', 'C.countriesId = S.countryId');
        // query.where('SU.userId = :userId AND SU.isActive = 1', { userId });
        return query.getRawMany();
    }

    public async checkVendorProfileCompleted(userId: number): Promise<any> {
        const selects = [
            'Seller.isProfileCompleted as vendorProfileCompleted',
            'Seller.statusId as statusId',
            'Seller.productAutoApproval as productAutoApproval',
            'U.isCybermartSeller as isCybermartSeller'
        ];
        return UserRepository.createQueryBuilder('U')
        .innerJoin(Seller, 'Seller', 'Seller.userId = U.userId')
        .where('U.userId = :userId', { userId })
        .select(selects)
        .getRawOne();
    }
}
