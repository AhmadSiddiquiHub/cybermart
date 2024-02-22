export declare class TestRequest {
    limit: number;
}
export declare class SellerCampaignListingRequest {
    page: number;
}
export declare class RegisterCampaignRequest {
    slug: string;
    productIds: [];
}
export declare class UpdateCampaignRequest {
    slug: string;
    productIds: [];
}
export declare class UpdateCampaignProductPricingRequest {
    vendorProductVariantId: number;
    price: number;
    discountPrice: number;
    slug: string;
}
export declare class CountryListRequest {
    limit: number;
    offset: number;
    keyword: string;
}
export declare class RegisterRequest {
    fullName: string;
    emailOrPhone: string;
    password: string;
    confirmPassword: string;
    loginType: string;
    browserId: string;
    token: string;
}
export declare class LoginRequest {
    emailOrPhone: string;
    password: string;
    loginType: string;
    fullName: string;
    token: string;
}
export declare class VerifyOTPRequest {
    emailOrPhone: string;
    mobile_otp: number;
    email_otp: number;
    browserId: string;
    requireOtpEveryTime: number;
    process: string;
}
export declare class ResendOTPRequest {
    emailOrPhone: string;
}
export declare class SellerSetupProfileRequest {
    firstName: string;
    lastName: string;
    countryOfCitizen: number;
    countryOfBirth: number;
    dateOfBirth: string;
}
export declare class SellerSetupProfileRequestS1 {
    firstAndLastName: string;
    contactEmailAddress: string;
    contactMobilePhone: string;
    storeName: string;
}
export declare class SellerSetupProfileRequestS2 {
    identityType: string;
    documentTypeId: number;
    identityNumber: number;
    issueDate: string;
    expiryDate: string;
    frontImage: string;
    backImage: string;
}
export declare class SellerStoreProfileCreateRequest {
    storeName: string;
    profileImage: string;
    backGroundImage: string;
    banners: string[];
}
export declare class SellerBankCreateRequest {
    accountNo: string;
    accountHolderName: string;
    IBAN: string;
    chequeImage: string;
    branchCode: number;
    bankId: number;
}
export declare class UserEditProfileRequest {
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNumber: number;
    image: string;
    address1: string;
    address2: string;
    countryId: any;
    cityId: any;
    stateId: any;
    type: any;
    isDefault: number;
    name: any;
    postcode: number;
}
export declare class SellerStoreProfileUpdateRequest {
    siteId: number;
    storeName: string;
    profileImage: string;
    backGroundImage: string;
    banners: [{}];
}
export declare class SellerSetupBusinessAdressRequest {
    line_address_1: string;
    line_address_2: string;
    line_address_3: string;
    zipcode: number;
    countryId: number;
    stateId: number;
    cityId: number;
}
export declare class CreateCouponRequest {
    couponName: string;
    couponCode: string;
    valueType: number;
    value: number;
    couponType: string;
    minOrderAmount: number;
    isStackable: number;
    is_signup_coupon: number;
    leftCount: number;
    maxUsage: number;
    isActive: number;
    maxDiscount: number;
    startDate: string;
    endDate: string;
    productIds: [];
    categoryIds: [];
    userBased: [];
}
export declare class UpdateCouponRequest {
    couponName: string;
    couponCode: string;
    valueType: number;
    value: number;
    couponType: string;
    minOrderAmount: number;
    isStackable: number;
    is_signup_coupon: number;
    leftCount: number;
    maxDiscount: number;
    maxUsage: number;
    isActive: number;
    startDate: string;
    endDate: string;
    productIds: [];
    categoryIds: [];
    userBased: [];
}
export declare class CouponListingRequest {
    limit: number;
    offset: number;
    status: string;
    sortBy: string;
    keyword: string;
}
export declare class MarkCategoryFavoriteRequest {
    catId: number;
}
export declare class CreateComboOfferRequest {
    name: string;
    description: string;
    amount: number;
    type: number;
    productIds: number[];
}
export declare class removeVariantsRequest {
    vendorProductVariantId: number;
    valueFor_ProductVariantValueTable: string;
}
export declare class ProductListingRequest {
    page: number;
    statusId: number;
    viewType: number;
    keyword: any;
}
export declare class relatedProductSuggestionRequest {
    page: number;
    statusId: number;
    viewType: number;
    parentCategoryId: number;
    type: 'edit' | 'create';
    keyword: any;
    limit: number;
    offset: number;
    otherSeller: number;
    productId: number;
}
export declare class getRelatedProductRequest {
    page: number;
    statusId: number;
    viewType: number;
    keyword: any;
    limit: number;
    offset: number;
    productId: number;
}
export declare class ProductExportToExcelRequest {
    prefIds: number[];
}
export declare class UpdateProducctStockRequest {
    productId: number;
    productVariantId: number;
    quantity: number;
}
export declare class UpdateProducctPriceRequest {
    productId: number;
    productVariantId: number;
    price: number;
}
export declare class UpdateProducctAvailabilityRequest {
    vendorProductVariantId: number;
}
export declare class DeleteProducctAvailabilityRequest {
    vendorProductVariantId: number;
}
export declare class UpdateProductDiscountPriceRequest {
    productId: number;
    productVariantId: number;
    price: number;
    discountPrice: string;
    startDate: string;
    endDate: string;
    showSaleEndDate: number;
}
export declare class OrderExcelExportRequest {
    status: number;
    state: number;
    city: number;
    prefIds: number[];
}
export declare class OrderListRequest {
    limit: number;
    page: number;
    status: number;
    viewType: number;
    day: number;
    startDate: string;
    endDate: string;
    keyword: string;
    sort: string;
    state: number;
    city: number;
    prefIds: number[];
}
export declare class ConfirmShippmentOrderRequest {
    courierId: number;
    trackingNo: string;
    subOrderId: number[];
    date: string;
}
export declare class VerifyReturnItemRequest {
    subOrderId: number[];
}
export declare class AcceptOrderRequest {
    subOrderId: number[];
}
export declare class returnOrderRequestResponseRequest {
    subOrderId: number;
    description: string;
}
export declare class orderDeliveredRequest {
    subOrderId: number[];
}
export declare class RefundRequestViewRequest {
    subOrderId: number;
}
export declare class SellerNotesRequest {
    comments: string;
    orderId: number;
}
export declare class OrderCancelRequest {
    reasonId: number;
    subOrderId: number[];
    description: string;
}
export declare class CustomerChangeEmailPhoneRequest {
    email: string;
    type: string;
    update_value: string;
}
export declare class ZoneListRequest {
    countryId: number;
}
export declare class CityListRequest {
    stateId: number;
}
export declare class UploadFileRequest {
    image: string;
    path: string;
}
export declare class GoogleLoginRequest {
    email: string;
    fullName: string;
    token: string;
}
export declare class FacebookLoginRequest {
    email: string;
    fullName: string;
    token: string;
}
export declare class validateSlug {
    slug: string;
    productId: number;
}
