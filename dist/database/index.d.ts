import { DataSource } from 'typeorm';
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
import { VendorCoupon } from './models/VendorCoupon';
import { Coupon } from './models/Coupon';
import { CouponProduct } from './models/CouponProduct';
import { CouponUser } from './models/CouponUser';
import { UserFavCategory } from './models/UserFavCategory';
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
export declare const DBSource: DataSource;
export declare const CategoryRepository: import("typeorm").Repository<Category>;
export declare const CategoryMLRepository: import("typeorm").Repository<CategoryML>;
export declare const CategoryPathRepository: import("typeorm").Repository<CategoryPath>;
export declare const SiteCategoryRepository: import("typeorm").Repository<SiteCategory>;
export declare const BrandRepository: import("typeorm").Repository<Brand>;
export declare const BrandMetaInfoRepository: import("typeorm").Repository<BrandMetaInfo>;
export declare const SiteBrandRepository: import("typeorm").Repository<SiteBrand>;
export declare const CategoryBrandRepository: import("typeorm").Repository<CategoryBrand>;
export declare const UserRepository: import("typeorm").Repository<Users>;
export declare const OtpCodesRepository: import("typeorm").Repository<OtpCodes>;
export declare const OtpSettingRepository: import("typeorm").Repository<OtpSetting>;
export declare const UserAddressesRepository: import("typeorm").Repository<UserAddresses>;
export declare const SiteUserRepository: import("typeorm").Repository<SiteUser>;
export declare const SiteRepository: import("typeorm").Repository<Site>;
export declare const CountryRepository: import("typeorm").Repository<Country>;
export declare const StateRepository: import("typeorm").Repository<State>;
export declare const CityRepository: import("typeorm").Repository<City>;
export declare const DocumentRepository: import("typeorm").Repository<Documents>;
export declare const DocumentTypesRepository: import("typeorm").Repository<DocumentTypes>;
export declare const VendorRepository: import("typeorm").Repository<Seller>;
export declare const ProductRepository: import("typeorm").Repository<Product>;
export declare const ProductMetaInfoRepository: import("typeorm").Repository<ProductMetaInfo>;
export declare const VendorProductRepository: import("typeorm").Repository<VendorProduct>;
export declare const ProductVariantRepository: import("typeorm").Repository<ProductVariant>;
export declare const ProductVariantValueRepository: import("typeorm").Repository<ProductVariantValue>;
export declare const VendorProductVariantRepository: import("typeorm").Repository<VendorProductVariant>;
export declare const ProductVariantImageRepository: import("typeorm").Repository<ProductVariantImage>;
export declare const ProductDiscountRepository: import("typeorm").Repository<ProductDiscount>;
export declare const UserProductPreferenceRepository: import("typeorm").Repository<UserProductPreference>;
export declare const ProductPreferenceRepository: import("typeorm").Repository<ProductPreference>;
export declare const ProductMeasurementRepository: import("typeorm").Repository<ProductMeasurement>;
export declare const BankRepository: import("typeorm").Repository<Bank>;
export declare const VendorBankAccRepository: import("typeorm").Repository<VendorBankAccount>;
export declare const SiteBankRepository: import("typeorm").Repository<SiteBank>;
export declare const VendorProductCategoryRepository: import("typeorm").Repository<VendorProductCategory>;
export declare const ProductShippingInfoRepository: import("typeorm").Repository<ProductShippingInfo>;
export declare const VendorProductStatusLogRepository: import("typeorm").Repository<VendorProductStatusLog>;
export declare const AttributeRepository: import("typeorm").Repository<Attribute>;
export declare const AttributeValueRepository: import("typeorm").Repository<AttributeValue>;
export declare const AttributesToCategoryRepository: import("typeorm").Repository<AttributesToCategory>;
export declare const VariantsToCategoryRepository: import("typeorm").Repository<VariantsToCategory>;
export declare const ProductAttributeVendorValueRepository: import("typeorm").Repository<ProductAttributeVendorValue>;
export declare const VendorCouponRepository: import("typeorm").Repository<VendorCoupon>;
export declare const CouponRepository: import("typeorm").Repository<Coupon>;
export declare const CouponTypesRepository: import("typeorm").Repository<CouponType>;
export declare const CouponProductRepository: import("typeorm").Repository<CouponProduct>;
export declare const CouponCategoryRepository: import("typeorm").Repository<CouponCategory>;
export declare const CouponUserRepository: import("typeorm").Repository<CouponUser>;
export declare const UserFavCategoryRepository: import("typeorm").Repository<UserFavCategory>;
export declare const OrderRepository: import("typeorm").Repository<Order>;
export declare const OrderStatusRepository: import("typeorm").Repository<OrderStatus>;
export declare const OrderInfoRepository: import("typeorm").Repository<OrderInfo>;
export declare const SubOrderRepository: import("typeorm").Repository<SubOrder>;
export declare const OrderPreferenceRepository: import("typeorm").Repository<OrderPreference>;
export declare const UserOrderPreferenceRepository: import("typeorm").Repository<UserOrderPreference>;
export declare const VendorOrderNoteRepository: import("typeorm").Repository<VendorOrderNote>;
export declare const SubOrderTrackingRepository: import("typeorm").Repository<SubOrderTracking>;
export declare const SubOrderLogRepository: import("typeorm").Repository<SubOrderLog>;
export declare const SiteSettingRepository: import("typeorm").Repository<SiteSetting>;
export declare const WalletHistoryRepository: import("typeorm").Repository<WalletHistory>;
export declare const CourierRepository: import("typeorm").Repository<Courier>;
export declare const CountriesRepository: import("typeorm").Repository<Country>;
export declare const VendorStoreProfileRepository: import("typeorm").Repository<VendorStoreProfile>;
export declare const ProductAnswersRepository: import("typeorm").Repository<ProductAnswers>;
export declare const ProductQuestionsRepository: import("typeorm").Repository<ProductQuestions>;
export declare const CampaignVendorsRepository: import("typeorm").Repository<CampaignVendors>;
export declare const CampaignProductsRepository: import("typeorm").Repository<CampaignProducts>;
export declare const CampaignRepository: import("typeorm").Repository<Campaign>;
export declare const ProductRatingRepository: import("typeorm").Repository<ProductRating>;
export declare const EmailRepository: import("typeorm").Repository<Email>;
export declare const EmailMlRepository: import("typeorm").Repository<EmailMl>;
export declare const EmailVariableRepository: import("typeorm").Repository<EmailVariable>;
export declare const SmsRepository: import("typeorm").Repository<Sms>;
export declare const SmsMlRepository: import("typeorm").Repository<SmsMl>;
export declare const SmsVariableRepository: import("typeorm").Repository<SmsVariable>;
export declare const ComboOfferRepository: import("typeorm").Repository<ComboOffer>;
export declare const ReasonRepository: import("typeorm").Repository<Reason>;
export declare const CampaignPackageRepository: import("typeorm").Repository<CampaignPackage>;
export declare const VendorLogsRepository: import("typeorm").Repository<VendorLogs>;
export declare const TaxClassRepository: import("typeorm").Repository<TaxClass>;
export declare const SameDayGlobalPincodeRepository: import("typeorm").Repository<SameDayGlobalPincodes>;
export declare const OpenBoxGlobalPincodeRepository: import("typeorm").Repository<OpenBoxGlobalPincodes>;
export declare const SameDayProductPincodeRepository: import("typeorm").Repository<SameDayProductPincodes>;
export declare const OpenBoxProductPincodeRepository: import("typeorm").Repository<OpenBoxProductPincodes>;
export declare const OpenBoxSubscriptionRepository: import("typeorm").Repository<OpenBoxSubscription>;
export declare const RelatedProductsRepository: import("typeorm").Repository<RelatedProducts>;
export declare const WarrantyTypesRepository: import("typeorm").Repository<WarrantyTypes>;
export declare const ProductWarrantyRepository: import("typeorm").Repository<ProductWarranty>;
