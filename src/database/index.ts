import { DataSource, DataSourceOptions } from 'typeorm';
import { Users } from './models/Users';
import { OtpCodes } from './models/OtpCodes';
import { OtpSetting } from './models/OtpSetting';
import { UserAddresses } from './models/UserAddresses';
import { SiteUser } from './models/SiteUser';
import { Site } from './models/Site';
import { Country } from './models/Country';
import { State } from './models/State';
import { City } from './models/City';
import { Category } from './models/Category';
import { CategoryML } from './models/CategoryML';
import { CategoryPath } from './models/CategoryPath';
import { SiteCategory } from './models/SiteCategory';
import { Brand } from './models/Brand';
import { SiteBrand } from './models/SiteBrand';
import { BrandMetaInfo } from './models/BrandMetaInfo';
import { CategoryBrand } from './models/CategoryBrand';
// Product Entities
import { ProductPreference } from './models/ProductPreference';
import { UserProductPreference } from './models/UserProductPreference';
import { Product } from './models/Product';
import { VendorProduct } from './models/VendorProduct';
import { ProductVariant } from './models/ProductVariant';
import { ProductVariantValue } from './models/ProductVariantValue';
import { VendorProductVariant } from './models/VendorProductVariant';
import { ProductVariantImage } from './models/ProductVariantImage';
import { ProductDiscount } from './models/ProductDiscount';
import { VendorProductCategory } from './models/VendorProductCategory';
import { ProductShippingInfo } from './models/ProductShippingInfo';
import { VendorProductStatusLog } from './models/VendorProductStatusLog';
import { Attribute } from './models/Attribute';
import { AttributesToCategory } from './models/AttributesToCategory';
import { VariantsToCategory } from './models/VariantsToCategory';
import { AttributeValue } from './models/AttributeValue';
// Coupon Entities
import { VendorCoupon } from './models/VendorCoupon';
import { Coupon } from './models/Coupon';
import { CouponProduct } from './models/CouponProduct';
import { CouponUser } from './models/CouponUser';
import { UserFavCategory } from './models/UserFavCategory';
// Order Entities
import { Order } from './models/Order';
import { OrderInfo } from './models/OrderInfo';
import { SubOrder } from './models/SubOrder';
import { OrderStatus } from './models/OrderStatus';
import { OrderPreference } from './models/OrderPreference';
import { UserOrderPreference } from './models/UserOrderPreference';
import { VendorOrderNote } from './models/VendorOrderNote';
import { SubOrderTracking } from './models/SubOrderTracking';
import { SubOrderLog } from './models/SubOrderLog';
import { SiteSetting } from './models/SiteSetting';
import { WalletHistory } from './models/WalletHistory';
import { Courier } from './models/Courier';
import { VendorStoreProfile } from './models/VendorStoreProfile';
import { ProductAnswers } from './models/ProductAnswers';
import { ProductQuestions } from './models/ProductQuestions';
import { CampaignVendors } from './models/CampaignVendors';
import { CampaignProducts } from './models/CampaignProducts';
import { Campaign } from './models/Campaign';
import { ProductRating } from './models/ProductRating';
import { ProductAttributeVendorValue } from './models/ProductAttributeVendorValue';
import { Email } from './models/Email';
import { EmailMl } from './models/EmailMl';
import { EmailVariable } from './models/EmailVariable';
import { Sms } from './models/Sms';
import { SmsMl } from './models/SmsMl';
import { SmsVariable } from './models/SmsVariable';
import { ComboOffer } from './models/ComboOffer';
import { Reason } from './models/Reason';
import { CouponType } from './models/CouponType';
import { CouponCategory } from './models/CouponCategory';
import { Bank } from './models/Bank';
import { VendorBankAccount } from './models/VendorBankAccount';
import { SiteBank } from './models/SiteBank';
import { DocumentTypes } from './models/DocumentTypes';
import { Documents } from './models/Document';
import { Seller } from './models/Sellers';
import { CampaignPackage } from './models/CampaignPackages';
import { VendorLogs } from './models/VendorLogs';
import { ProductMetaInfo } from './models/ProductMetaInfo';
import { TaxClass } from './models/TaxClass';
import { ProductMeasurement } from './models/ProductMeasurement';
import { SameDayGlobalPincodes } from './models/SameDayGlobalPincodes';
import { OpenBoxGlobalPincodes } from './models/OpenBoxGlobalPincodes';
import { SameDayProductPincodes } from './models/SameDayProductPincodes';
import { OpenBoxProductPincodes } from './models/OpenBoxProductPincodes';
import { OpenBoxSubscription } from './models/OpenBoxSubscription';
import { RelatedProducts } from './models/RelatedProducts';
import { WarrantyTypes } from './models/WarrantyTypes';
import { ProductWarranty } from './models/ProductWarranty';
import { envConfig } from 'src/config/env.config';

const options: DataSourceOptions = {
    type: 'mysql',
    host: envConfig.host,
    port: envConfig.port,
    username: envConfig.username,
    password: envConfig.password,
    database: envConfig.database,
    logging: ["query", "error"],
    logger: 'advanced-console',
    acquireTimeout: envConfig.acquireTimeout,
    connectTimeout: envConfig.connectTimeout,
    migrations: [],
    entities: [__dirname + '/models/*{.ts,.js}']
};
export const DBSource = new DataSource(options);

export const CategoryRepository = DBSource.getRepository(Category);
export const CategoryMLRepository = DBSource.getRepository(CategoryML);
export const CategoryPathRepository = DBSource.getRepository(CategoryPath);
export const SiteCategoryRepository = DBSource.getRepository(SiteCategory);

export const BrandRepository = DBSource.getRepository(Brand);
export const BrandMetaInfoRepository = DBSource.getRepository(BrandMetaInfo);
export const SiteBrandRepository = DBSource.getRepository(SiteBrand);
export const CategoryBrandRepository = DBSource.getRepository(CategoryBrand);



export const UserRepository = DBSource.getRepository(Users);
export const OtpCodesRepository = DBSource.getRepository(OtpCodes);
export const OtpSettingRepository = DBSource.getRepository(OtpSetting);
export const UserAddressesRepository = DBSource.getRepository(UserAddresses);
export const SiteUserRepository = DBSource.getRepository(SiteUser);
export const SiteRepository = DBSource.getRepository(Site);
export const CountryRepository = DBSource.getRepository(Country);
export const StateRepository = DBSource.getRepository(State);
export const CityRepository = DBSource.getRepository(City);
export const DocumentRepository = DBSource.getRepository(Documents);
export const DocumentTypesRepository = DBSource.getRepository(DocumentTypes);
export const VendorRepository = DBSource.getRepository(Seller);

// Product Repositories
export const ProductRepository = DBSource.getRepository(Product);
export const ProductMetaInfoRepository = DBSource.getRepository(ProductMetaInfo);
export const VendorProductRepository = DBSource.getRepository(VendorProduct);
export const ProductVariantRepository = DBSource.getRepository(ProductVariant);
export const ProductVariantValueRepository = DBSource.getRepository(ProductVariantValue);
export const VendorProductVariantRepository = DBSource.getRepository(VendorProductVariant);
export const ProductVariantImageRepository = DBSource.getRepository(ProductVariantImage);
export const ProductDiscountRepository = DBSource.getRepository(ProductDiscount);
export const UserProductPreferenceRepository = DBSource.getRepository(UserProductPreference);
export const ProductPreferenceRepository = DBSource.getRepository(ProductPreference);
export const ProductMeasurementRepository = DBSource.getRepository(ProductMeasurement);

export const BankRepository = DBSource.getRepository(Bank);
export const VendorBankAccRepository = DBSource.getRepository(VendorBankAccount);
export const SiteBankRepository = DBSource.getRepository(SiteBank);


export const VendorProductCategoryRepository = DBSource.getRepository(VendorProductCategory);
export const ProductShippingInfoRepository = DBSource.getRepository(ProductShippingInfo);
export const VendorProductStatusLogRepository = DBSource.getRepository(VendorProductStatusLog);
export const AttributeRepository = DBSource.getRepository(Attribute);
export const AttributeValueRepository = DBSource.getRepository(AttributeValue);
export const AttributesToCategoryRepository = DBSource.getRepository(AttributesToCategory);
export const VariantsToCategoryRepository = DBSource.getRepository(VariantsToCategory);

export const ProductAttributeVendorValueRepository = DBSource.getRepository(ProductAttributeVendorValue);
// Coupon Repositories
export const VendorCouponRepository = DBSource.getRepository(VendorCoupon);// old
export const CouponRepository = DBSource.getRepository(Coupon);
export const CouponTypesRepository = DBSource.getRepository(CouponType);
export const CouponProductRepository = DBSource.getRepository(CouponProduct);
export const CouponCategoryRepository = DBSource.getRepository(CouponCategory);
export const CouponUserRepository = DBSource.getRepository(CouponUser);



export const UserFavCategoryRepository = DBSource.getRepository(UserFavCategory);

// Order Repositories
export const OrderRepository = DBSource.getRepository(Order);
export const OrderStatusRepository = DBSource.getRepository(OrderStatus);
export const OrderInfoRepository = DBSource.getRepository(OrderInfo);
export const SubOrderRepository = DBSource.getRepository(SubOrder);
export const OrderPreferenceRepository = DBSource.getRepository(OrderPreference);
export const UserOrderPreferenceRepository = DBSource.getRepository(UserOrderPreference);
export const VendorOrderNoteRepository = DBSource.getRepository(VendorOrderNote);
export const SubOrderTrackingRepository = DBSource.getRepository(SubOrderTracking);
export const SubOrderLogRepository = DBSource.getRepository(SubOrderLog);

export const SiteSettingRepository = DBSource.getRepository(SiteSetting);
export const WalletHistoryRepository = DBSource.getRepository(WalletHistory);
export const CourierRepository = DBSource.getRepository(Courier);
//
export const CountriesRepository = DBSource.getRepository(Country);

// seller store
export const VendorStoreProfileRepository = DBSource.getRepository(VendorStoreProfile);
export const ProductAnswersRepository = DBSource.getRepository(ProductAnswers);
export const ProductQuestionsRepository = DBSource.getRepository(ProductQuestions);
export const CampaignVendorsRepository = DBSource.getRepository(CampaignVendors);
export const CampaignProductsRepository = DBSource.getRepository(CampaignProducts);

// Campaign Repos
export const CampaignRepository = DBSource.getRepository(Campaign);
export const ProductRatingRepository = DBSource.getRepository(ProductRating);

export const EmailRepository = DBSource.getRepository(Email);
export const EmailMlRepository = DBSource.getRepository(EmailMl);
export const EmailVariableRepository = DBSource.getRepository(EmailVariable);
export const SmsRepository = DBSource.getRepository(Sms);
export const SmsMlRepository = DBSource.getRepository(SmsMl);
export const SmsVariableRepository = DBSource.getRepository(SmsVariable);

export const ComboOfferRepository = DBSource.getRepository(ComboOffer);
export const ReasonRepository = DBSource.getRepository(Reason);
export const CampaignPackageRepository = DBSource.getRepository(CampaignPackage);
export const VendorLogsRepository = DBSource.getRepository(VendorLogs);
export const TaxClassRepository = DBSource.getRepository(TaxClass);
export const SameDayGlobalPincodeRepository = DBSource.getRepository(SameDayGlobalPincodes);
export const OpenBoxGlobalPincodeRepository = DBSource.getRepository(OpenBoxGlobalPincodes);
export const SameDayProductPincodeRepository = DBSource.getRepository(SameDayProductPincodes);
export const OpenBoxProductPincodeRepository = DBSource.getRepository(OpenBoxProductPincodes);
export const OpenBoxSubscriptionRepository = DBSource.getRepository(OpenBoxSubscription)

export const RelatedProductsRepository = DBSource.getRepository(RelatedProducts);
export const WarrantyTypesRepository = DBSource.getRepository(WarrantyTypes)
export const ProductWarrantyRepository = DBSource.getRepository(ProductWarranty)