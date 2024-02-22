"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Country_1 = require("../database/models/Country");
const database_1 = require("../database");
const UserAddresses_1 = require("../database/models/UserAddresses");
const State_1 = require("../database/models/State");
const City_1 = require("../database/models/City");
const VendorStoreProfile_1 = require("../database/models/VendorStoreProfile");
const VendorBankAccount_1 = require("../database/models/VendorBankAccount");
const Sellers_1 = require("../database/models/Sellers");
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    async findByIds(ids) {
        const selects = [
            'U.userId as userId',
            'U.firstName as firstName',
            'U.lastName as lastName',
            'U.typeId as typeId',
            'U.email as email'
        ];
        const query = await database_1.UserRepository.createQueryBuilder('U').where('U.userId IN (' + ids + ')').select(selects);
        return query.getRawMany();
    }
    async sellerAccData(userId) {
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
        ];
        const query = await database_1.UserRepository.createQueryBuilder('U')
            .innerJoin(Sellers_1.Seller, 'Seller', 'U.userId = Seller.userId')
            .leftJoin(UserAddresses_1.UserAddresses, 'UserAddresses', 'U.userId = UserAddresses.userId')
            .leftJoin(State_1.State, 'state', 'UserAddresses.stateId = state.id')
            .leftJoin(City_1.City, 'city', 'UserAddresses.city_id = city.id')
            .leftJoin(Country_1.Country, 'country', 'UserAddresses.country_id = country.countriesId')
            .leftJoin(VendorStoreProfile_1.VendorStoreProfile, 'VSP', 'VSP.user_id = U.userId')
            .leftJoin(VendorBankAccount_1.VendorBankAccount, 'VBA', 'VBA.vendor_id = U.userId')
            .where('U.userId = :userId', { userId })
            .groupBy('U.userId');
        return query.select(selects).getRawOne();
    }
    async vendorMarketplaces(userId) {
        const selects = [
            'S.id as id',
            'S.iso1 as countryCode',
            'S.zipcodeFormate as zipcodeFormate',
            'C.name as name',
            'C.phonecode as phonecode',
            'C.currencySymbol as currencySymbol',
            'C.svgIcon as svgIcon',
        ];
        const query = await database_1.SiteRepository.createQueryBuilder('S');
        query.select(selects);
        query.innerJoin(Country_1.Country, 'C', 'C.countriesId = S.countryId');
        return query.getRawMany();
    }
    async checkVendorProfileCompleted(userId) {
        const selects = [
            'Seller.isProfileCompleted as vendorProfileCompleted',
            'Seller.statusId as statusId',
            'Seller.productAutoApproval as productAutoApproval',
            'U.isCybermartSeller as isCybermartSeller'
        ];
        return database_1.UserRepository.createQueryBuilder('U')
            .innerJoin(Sellers_1.Seller, 'Seller', 'Seller.userId = U.userId')
            .where('U.userId = :userId', { userId })
            .select(selects)
            .getRawOne();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=UserService.js.map