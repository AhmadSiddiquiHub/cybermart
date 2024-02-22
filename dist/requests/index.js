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
exports.validateSlug = exports.FacebookLoginRequest = exports.GoogleLoginRequest = exports.UploadFileRequest = exports.CityListRequest = exports.ZoneListRequest = exports.CustomerChangeEmailPhoneRequest = exports.OrderCancelRequest = exports.SellerNotesRequest = exports.RefundRequestViewRequest = exports.orderDeliveredRequest = exports.returnOrderRequestResponseRequest = exports.AcceptOrderRequest = exports.VerifyReturnItemRequest = exports.ConfirmShippmentOrderRequest = exports.OrderListRequest = exports.OrderExcelExportRequest = exports.UpdateProductDiscountPriceRequest = exports.DeleteProducctAvailabilityRequest = exports.UpdateProducctAvailabilityRequest = exports.UpdateProducctPriceRequest = exports.UpdateProducctStockRequest = exports.ProductExportToExcelRequest = exports.getRelatedProductRequest = exports.relatedProductSuggestionRequest = exports.ProductListingRequest = exports.removeVariantsRequest = exports.CreateComboOfferRequest = exports.MarkCategoryFavoriteRequest = exports.CouponListingRequest = exports.UpdateCouponRequest = exports.CreateCouponRequest = exports.SellerSetupBusinessAdressRequest = exports.SellerStoreProfileUpdateRequest = exports.UserEditProfileRequest = exports.SellerBankCreateRequest = exports.SellerStoreProfileCreateRequest = exports.SellerSetupProfileRequestS2 = exports.SellerSetupProfileRequestS1 = exports.SellerSetupProfileRequest = exports.ResendOTPRequest = exports.VerifyOTPRequest = exports.LoginRequest = exports.RegisterRequest = exports.CountryListRequest = exports.UpdateCampaignProductPricingRequest = exports.UpdateCampaignRequest = exports.RegisterCampaignRequest = exports.SellerCampaignListingRequest = exports.TestRequest = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const validateEmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class TestRequest {
}
exports.TestRequest = TestRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'limit is required' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TestRequest.prototype, "limit", void 0);
class SellerCampaignListingRequest {
}
exports.SellerCampaignListingRequest = SellerCampaignListingRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'page is required' }),
    __metadata("design:type", Number)
], SellerCampaignListingRequest.prototype, "page", void 0);
class RegisterCampaignRequest {
}
exports.RegisterCampaignRequest = RegisterCampaignRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'slug is required' }),
    __metadata("design:type", String)
], RegisterCampaignRequest.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RegisterCampaignRequest.prototype, "productIds", void 0);
class UpdateCampaignRequest {
}
exports.UpdateCampaignRequest = UpdateCampaignRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'slug is required' }),
    __metadata("design:type", String)
], UpdateCampaignRequest.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateCampaignRequest.prototype, "productIds", void 0);
class UpdateCampaignProductPricingRequest {
}
exports.UpdateCampaignProductPricingRequest = UpdateCampaignProductPricingRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'vendorProductVariantId is required' }),
    __metadata("design:type", Number)
], UpdateCampaignProductPricingRequest.prototype, "vendorProductVariantId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'price is required' }),
    __metadata("design:type", Number)
], UpdateCampaignProductPricingRequest.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'discountPrice is required' }),
    __metadata("design:type", Number)
], UpdateCampaignProductPricingRequest.prototype, "discountPrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'slug is required' }),
    __metadata("design:type", String)
], UpdateCampaignProductPricingRequest.prototype, "slug", void 0);
class CountryListRequest {
}
exports.CountryListRequest = CountryListRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'limit is required' }),
    __metadata("design:type", Number)
], CountryListRequest.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'offset is required' }),
    __metadata("design:type", Number)
], CountryListRequest.prototype, "offset", void 0);
class RegisterRequest {
}
exports.RegisterRequest = RegisterRequest;
__decorate([
    (0, class_validator_1.ValidateIf)(response => response.loginType === 'Facebook' && response.loginType === 'Gmail'),
    (0, class_validator_1.IsNotEmpty)({ message: 'fullName is required' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'emailOrPhone is required' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "emailOrPhone", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(response => response.loginType !== 'Facebook' && response.loginType !== 'Gmail'),
    (0, class_validator_1.MinLength)(8, { message: 'password must contain minimum 8 character' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'password is required' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(response => response.loginType !== 'Facebook' && response.loginType !== 'Gmail'),
    (0, class_validator_1.IsNotEmpty)({ message: 'confirmPassword is required' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['Facebook', 'Gmail', 'Normal']),
    (0, class_validator_1.IsNotEmpty)({ message: 'login type is required' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "loginType", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(response => response.browserId !== undefined),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterRequest.prototype, "browserId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(response => response.loginType === 'Facebook' && response.loginType === 'Gmail'),
    (0, class_validator_1.IsNotEmpty)({ message: 'token is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterRequest.prototype, "token", void 0);
class LoginRequest {
}
exports.LoginRequest = LoginRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'emailOrPhone is required' }),
    __metadata("design:type", String)
], LoginRequest.prototype, "emailOrPhone", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(response => response.loginType !== 'Facebook' && response.loginType !== 'Gmail'),
    (0, class_validator_1.IsNotEmpty)({ message: 'password is required' }),
    __metadata("design:type", String)
], LoginRequest.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['Facebook', 'Gmail', 'Normal']),
    (0, class_validator_1.IsNotEmpty)({ message: 'login type is required' }),
    __metadata("design:type", String)
], LoginRequest.prototype, "loginType", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(response => response.loginType === 'Facebook' && response.loginType === 'Gmail'),
    (0, class_validator_1.IsNotEmpty)({ message: 'fullName is required' }),
    __metadata("design:type", String)
], LoginRequest.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(response => response.loginType === 'Facebook' && response.loginType === 'Gmail'),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginRequest.prototype, "token", void 0);
class VerifyOTPRequest {
}
exports.VerifyOTPRequest = VerifyOTPRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'emailOrPhone is required' }),
    __metadata("design:type", String)
], VerifyOTPRequest.prototype, "emailOrPhone", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'mobile_otp is required' }),
    __metadata("design:type", Number)
], VerifyOTPRequest.prototype, "mobile_otp", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'email_otp is required' }),
    __metadata("design:type", Number)
], VerifyOTPRequest.prototype, "email_otp", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'browserId is required' }),
    __metadata("design:type", String)
], VerifyOTPRequest.prototype, "browserId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'requireOtpEveryTime must be integer and is required' }),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], VerifyOTPRequest.prototype, "requireOtpEveryTime", void 0);
class ResendOTPRequest {
}
exports.ResendOTPRequest = ResendOTPRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'email is required' }),
    __metadata("design:type", String)
], ResendOTPRequest.prototype, "emailOrPhone", void 0);
class SellerSetupProfileRequest {
}
exports.SellerSetupProfileRequest = SellerSetupProfileRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'firstName is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequest.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'lastName is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequest.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'countryOfCitizen is required' }),
    __metadata("design:type", Number)
], SellerSetupProfileRequest.prototype, "countryOfCitizen", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'countryOfBirth is required' }),
    __metadata("design:type", Number)
], SellerSetupProfileRequest.prototype, "countryOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'dateOfBirth is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequest.prototype, "dateOfBirth", void 0);
class SellerSetupProfileRequestS1 {
}
exports.SellerSetupProfileRequestS1 = SellerSetupProfileRequestS1;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'first and last Name is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequestS1.prototype, "firstAndLastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'contactEmailAddress is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequestS1.prototype, "contactEmailAddress", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'contactMobilePhone is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequestS1.prototype, "contactMobilePhone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'StoreName is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequestS1.prototype, "storeName", void 0);
class SellerSetupProfileRequestS2 {
}
exports.SellerSetupProfileRequestS2 = SellerSetupProfileRequestS2;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'identityType is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequestS2.prototype, "identityType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'documentTypeId is required' }),
    __metadata("design:type", Number)
], SellerSetupProfileRequestS2.prototype, "documentTypeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'identityNumber is required' }),
    __metadata("design:type", Number)
], SellerSetupProfileRequestS2.prototype, "identityNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'issueDate is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequestS2.prototype, "issueDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'expiryDate is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequestS2.prototype, "expiryDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'frontImage is required' }),
    __metadata("design:type", String)
], SellerSetupProfileRequestS2.prototype, "frontImage", void 0);
class SellerStoreProfileCreateRequest {
}
exports.SellerStoreProfileCreateRequest = SellerStoreProfileCreateRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'storeName is required' }),
    __metadata("design:type", String)
], SellerStoreProfileCreateRequest.prototype, "storeName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'profileImage is required' }),
    __metadata("design:type", String)
], SellerStoreProfileCreateRequest.prototype, "profileImage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'backGroundImage is required' }),
    __metadata("design:type", String)
], SellerStoreProfileCreateRequest.prototype, "backGroundImage", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(4),
    __metadata("design:type", Array)
], SellerStoreProfileCreateRequest.prototype, "banners", void 0);
class SellerBankCreateRequest {
}
exports.SellerBankCreateRequest = SellerBankCreateRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'AccountNO is required' }),
    __metadata("design:type", String)
], SellerBankCreateRequest.prototype, "accountNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'account holder Name is required' }),
    __metadata("design:type", String)
], SellerBankCreateRequest.prototype, "accountHolderName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'IBAN is required' }),
    __metadata("design:type", String)
], SellerBankCreateRequest.prototype, "IBAN", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'chequeImage is required' }),
    __metadata("design:type", String)
], SellerBankCreateRequest.prototype, "chequeImage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'branchCode is required' }),
    __metadata("design:type", Number)
], SellerBankCreateRequest.prototype, "branchCode", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'bankId is required' }),
    __metadata("design:type", Number)
], SellerBankCreateRequest.prototype, "bankId", void 0);
class UserEditProfileRequest {
}
exports.UserEditProfileRequest = UserEditProfileRequest;
class SellerStoreProfileUpdateRequest {
}
exports.SellerStoreProfileUpdateRequest = SellerStoreProfileUpdateRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'storeName is required' }),
    __metadata("design:type", String)
], SellerStoreProfileUpdateRequest.prototype, "storeName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'profileImage is required' }),
    __metadata("design:type", String)
], SellerStoreProfileUpdateRequest.prototype, "profileImage", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'backGroundImage is required' }),
    __metadata("design:type", String)
], SellerStoreProfileUpdateRequest.prototype, "backGroundImage", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'banners is required' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SellerStoreProfileUpdateRequest.prototype, "banners", void 0);
class SellerSetupBusinessAdressRequest {
}
exports.SellerSetupBusinessAdressRequest = SellerSetupBusinessAdressRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'line_address_1 is required' }),
    __metadata("design:type", String)
], SellerSetupBusinessAdressRequest.prototype, "line_address_1", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'zipcode is required' }),
    __metadata("design:type", Number)
], SellerSetupBusinessAdressRequest.prototype, "zipcode", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'countryId is required' }),
    __metadata("design:type", Number)
], SellerSetupBusinessAdressRequest.prototype, "countryId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'stateId is required' }),
    __metadata("design:type", Number)
], SellerSetupBusinessAdressRequest.prototype, "stateId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'cityId is required' }),
    __metadata("design:type", Number)
], SellerSetupBusinessAdressRequest.prototype, "cityId", void 0);
class CreateCouponRequest {
}
exports.CreateCouponRequest = CreateCouponRequest;
__decorate([
    (0, class_validator_1.MaxLength)(255, { message: 'coupon name should be maximum 255 characters' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'coupon name is required' }),
    __metadata("design:type", String)
], CreateCouponRequest.prototype, "couponName", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(30, { message: 'coupon code should be maximum 32 characters' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'coupon code is required' }),
    __metadata("design:type", String)
], CreateCouponRequest.prototype, "couponCode", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsIn)([1, 2]),
    (0, class_validator_1.IsNotEmpty)({ message: 'value type is required  1-> percentage 2 -> amount' }),
    __metadata("design:type", Number)
], CreateCouponRequest.prototype, "valueType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'value is required' }),
    __metadata("design:type", Number)
], CreateCouponRequest.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'coupon type is required' }),
    __metadata("design:type", String)
], CreateCouponRequest.prototype, "couponType", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateCouponRequest.prototype, "productIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateCouponRequest.prototype, "categoryIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateCouponRequest.prototype, "userBased", void 0);
class UpdateCouponRequest {
}
exports.UpdateCouponRequest = UpdateCouponRequest;
__decorate([
    (0, class_validator_1.MaxLength)(255, { message: 'coupon name should be maximum 255 characters' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'coupon name is required' }),
    __metadata("design:type", String)
], UpdateCouponRequest.prototype, "couponName", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(30, { message: 'coupon code should be maximum 32 characters' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'coupon code is required' }),
    __metadata("design:type", String)
], UpdateCouponRequest.prototype, "couponCode", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'value type is required  1-> percentage 2 -> amount' }),
    __metadata("design:type", Number)
], UpdateCouponRequest.prototype, "valueType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'value is required' }),
    __metadata("design:type", Number)
], UpdateCouponRequest.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'coupon type is required' }),
    __metadata("design:type", String)
], UpdateCouponRequest.prototype, "couponType", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateCouponRequest.prototype, "productIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateCouponRequest.prototype, "categoryIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateCouponRequest.prototype, "userBased", void 0);
class CouponListingRequest {
}
exports.CouponListingRequest = CouponListingRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'limit is required' }),
    __metadata("design:type", Number)
], CouponListingRequest.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'offset is required' }),
    __metadata("design:type", Number)
], CouponListingRequest.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['all', 'running', 'expired']),
    (0, class_validator_1.IsNotEmpty)({ message: 'status is required' }),
    __metadata("design:type", String)
], CouponListingRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['ASC', 'DESC']),
    (0, class_validator_1.IsNotEmpty)({ message: 'sortBy is required' }),
    __metadata("design:type", String)
], CouponListingRequest.prototype, "sortBy", void 0);
class MarkCategoryFavoriteRequest {
}
exports.MarkCategoryFavoriteRequest = MarkCategoryFavoriteRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'catId is required' }),
    __metadata("design:type", Number)
], MarkCategoryFavoriteRequest.prototype, "catId", void 0);
class CreateComboOfferRequest {
}
exports.CreateComboOfferRequest = CreateComboOfferRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'name is required' }),
    __metadata("design:type", String)
], CreateComboOfferRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'amount is required' }),
    __metadata("design:type", Number)
], CreateComboOfferRequest.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([1, 2]),
    (0, class_validator_1.IsNotEmpty)({ message: 'type is required' }),
    __metadata("design:type", Number)
], CreateComboOfferRequest.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.ArrayMinSize)(3),
    __metadata("design:type", Array)
], CreateComboOfferRequest.prototype, "productIds", void 0);
class removeVariantsRequest {
}
exports.removeVariantsRequest = removeVariantsRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'productId is required' }),
    __metadata("design:type", Number)
], removeVariantsRequest.prototype, "vendorProductVariantId", void 0);
class ProductListingRequest {
}
exports.ProductListingRequest = ProductListingRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'page is required' }),
    __metadata("design:type", Number)
], ProductListingRequest.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsEnum)(utils_1.ProductStatusEnum),
    (0, class_validator_1.IsNotEmpty)({ message: 'statusId is required' }),
    __metadata("design:type", Number)
], ProductListingRequest.prototype, "statusId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([1, 2]),
    (0, class_validator_1.IsNotEmpty)({ message: 'viewType is required' }),
    __metadata("design:type", Number)
], ProductListingRequest.prototype, "viewType", void 0);
class relatedProductSuggestionRequest {
}
exports.relatedProductSuggestionRequest = relatedProductSuggestionRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'page is required' }),
    __metadata("design:type", Number)
], relatedProductSuggestionRequest.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsEnum)(utils_1.ProductStatusEnum),
    (0, class_validator_1.IsNotEmpty)({ message: 'statusId is required' }),
    __metadata("design:type", Number)
], relatedProductSuggestionRequest.prototype, "statusId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([1, 2]),
    (0, class_validator_1.IsNotEmpty)({ message: 'viewType is required' }),
    __metadata("design:type", Number)
], relatedProductSuggestionRequest.prototype, "viewType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'parentCategoryId is required' }),
    __metadata("design:type", Number)
], relatedProductSuggestionRequest.prototype, "parentCategoryId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['edit', 'create']),
    (0, class_validator_1.IsNotEmpty)({ message: 'type is required' }),
    __metadata("design:type", String)
], relatedProductSuggestionRequest.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'limit is required' }),
    __metadata("design:type", Number)
], relatedProductSuggestionRequest.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'limit is required' }),
    __metadata("design:type", Number)
], relatedProductSuggestionRequest.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'otherSeller is required' }),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], relatedProductSuggestionRequest.prototype, "otherSeller", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], relatedProductSuggestionRequest.prototype, "productId", void 0);
class getRelatedProductRequest {
}
exports.getRelatedProductRequest = getRelatedProductRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'page is required' }),
    __metadata("design:type", Number)
], getRelatedProductRequest.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsEnum)(utils_1.ProductStatusEnum),
    (0, class_validator_1.IsNotEmpty)({ message: 'statusId is required' }),
    __metadata("design:type", Number)
], getRelatedProductRequest.prototype, "statusId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([1, 2]),
    (0, class_validator_1.IsNotEmpty)({ message: 'viewType is required' }),
    __metadata("design:type", Number)
], getRelatedProductRequest.prototype, "viewType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'limit is required' }),
    __metadata("design:type", Number)
], getRelatedProductRequest.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'limit is required' }),
    __metadata("design:type", Number)
], getRelatedProductRequest.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], getRelatedProductRequest.prototype, "productId", void 0);
class ProductExportToExcelRequest {
}
exports.ProductExportToExcelRequest = ProductExportToExcelRequest;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ProductExportToExcelRequest.prototype, "prefIds", void 0);
class UpdateProducctStockRequest {
}
exports.UpdateProducctStockRequest = UpdateProducctStockRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'productId is required' }),
    __metadata("design:type", Number)
], UpdateProducctStockRequest.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'productVariantId is required' }),
    __metadata("design:type", Number)
], UpdateProducctStockRequest.prototype, "productVariantId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'quantity is required' }),
    __metadata("design:type", Number)
], UpdateProducctStockRequest.prototype, "quantity", void 0);
class UpdateProducctPriceRequest {
}
exports.UpdateProducctPriceRequest = UpdateProducctPriceRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'productId is required' }),
    __metadata("design:type", Number)
], UpdateProducctPriceRequest.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'productVariantId is required' }),
    __metadata("design:type", Number)
], UpdateProducctPriceRequest.prototype, "productVariantId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'price is required' }),
    __metadata("design:type", Number)
], UpdateProducctPriceRequest.prototype, "price", void 0);
class UpdateProducctAvailabilityRequest {
}
exports.UpdateProducctAvailabilityRequest = UpdateProducctAvailabilityRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'vendorProductVariantId is required' }),
    __metadata("design:type", Number)
], UpdateProducctAvailabilityRequest.prototype, "vendorProductVariantId", void 0);
class DeleteProducctAvailabilityRequest {
}
exports.DeleteProducctAvailabilityRequest = DeleteProducctAvailabilityRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'vendorProductVariantId is required' }),
    __metadata("design:type", Number)
], DeleteProducctAvailabilityRequest.prototype, "vendorProductVariantId", void 0);
class UpdateProductDiscountPriceRequest {
}
exports.UpdateProductDiscountPriceRequest = UpdateProductDiscountPriceRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'productId is required' }),
    __metadata("design:type", Number)
], UpdateProductDiscountPriceRequest.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'productVariantId is required' }),
    __metadata("design:type", Number)
], UpdateProductDiscountPriceRequest.prototype, "productVariantId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'price is required' }),
    __metadata("design:type", Number)
], UpdateProductDiscountPriceRequest.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'discountPrice is required' }),
    __metadata("design:type", String)
], UpdateProductDiscountPriceRequest.prototype, "discountPrice", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)({ strict: true }),
    (0, class_validator_1.Length)(10, 10),
    (0, class_validator_1.IsNotEmpty)({ message: 'startDate is required' }),
    __metadata("design:type", String)
], UpdateProductDiscountPriceRequest.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)({ strict: true }),
    (0, class_validator_1.Length)(10, 10),
    (0, class_validator_1.IsNotEmpty)({ message: 'endDate is required' }),
    __metadata("design:type", String)
], UpdateProductDiscountPriceRequest.prototype, "endDate", void 0);
class OrderExcelExportRequest {
}
exports.OrderExcelExportRequest = OrderExcelExportRequest;
__decorate([
    (0, class_validator_1.IsEnum)(utils_1.OrderStatusEnum),
    (0, class_validator_1.IsNotEmpty)({ message: 'status is required' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderExcelExportRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'state is required' }),
    __metadata("design:type", Number)
], OrderExcelExportRequest.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'city is required' }),
    __metadata("design:type", Number)
], OrderExcelExportRequest.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], OrderExcelExportRequest.prototype, "prefIds", void 0);
class OrderListRequest {
}
exports.OrderListRequest = OrderListRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'limit is required' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderListRequest.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'page is required' }),
    __metadata("design:type", Number)
], OrderListRequest.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(utils_1.OrderStatusEnum),
    (0, class_validator_1.IsNotEmpty)({ message: 'status is required' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderListRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsIn)([1, 2]),
    (0, class_validator_1.IsNotEmpty)({ message: 'viewType is required 1 for list, 2 for details' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderListRequest.prototype, "viewType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'day is required' }),
    (0, class_validator_1.ValidateIf)(n => !n.startDate && !n.endDate),
    __metadata("design:type", Number)
], OrderListRequest.prototype, "day", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['ASC', 'DESC']),
    (0, class_validator_1.IsNotEmpty)({ message: 'sort is required' }),
    __metadata("design:type", String)
], OrderListRequest.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'state is required' }),
    __metadata("design:type", Number)
], OrderListRequest.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'city is required' }),
    __metadata("design:type", Number)
], OrderListRequest.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], OrderListRequest.prototype, "prefIds", void 0);
class ConfirmShippmentOrderRequest {
}
exports.ConfirmShippmentOrderRequest = ConfirmShippmentOrderRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'courierId is required' }),
    __metadata("design:type", Number)
], ConfirmShippmentOrderRequest.prototype, "courierId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'trackingNo is required' }),
    __metadata("design:type", String)
], ConfirmShippmentOrderRequest.prototype, "trackingNo", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], ConfirmShippmentOrderRequest.prototype, "subOrderId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'date is required' }),
    __metadata("design:type", String)
], ConfirmShippmentOrderRequest.prototype, "date", void 0);
class VerifyReturnItemRequest {
}
exports.VerifyReturnItemRequest = VerifyReturnItemRequest;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], VerifyReturnItemRequest.prototype, "subOrderId", void 0);
class AcceptOrderRequest {
}
exports.AcceptOrderRequest = AcceptOrderRequest;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], AcceptOrderRequest.prototype, "subOrderId", void 0);
class returnOrderRequestResponseRequest {
}
exports.returnOrderRequestResponseRequest = returnOrderRequestResponseRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'subOrderId is required' }),
    __metadata("design:type", Number)
], returnOrderRequestResponseRequest.prototype, "subOrderId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'description is required' }),
    __metadata("design:type", String)
], returnOrderRequestResponseRequest.prototype, "description", void 0);
class orderDeliveredRequest {
}
exports.orderDeliveredRequest = orderDeliveredRequest;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], orderDeliveredRequest.prototype, "subOrderId", void 0);
class RefundRequestViewRequest {
}
exports.RefundRequestViewRequest = RefundRequestViewRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RefundRequestViewRequest.prototype, "subOrderId", void 0);
class SellerNotesRequest {
}
exports.SellerNotesRequest = SellerNotesRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'comments is required' }),
    __metadata("design:type", String)
], SellerNotesRequest.prototype, "comments", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'orderId is required' }),
    __metadata("design:type", Number)
], SellerNotesRequest.prototype, "orderId", void 0);
class OrderCancelRequest {
}
exports.OrderCancelRequest = OrderCancelRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'reasonId is required' }),
    __metadata("design:type", Number)
], OrderCancelRequest.prototype, "reasonId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], OrderCancelRequest.prototype, "subOrderId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'description is required' }),
    __metadata("design:type", String)
], OrderCancelRequest.prototype, "description", void 0);
class CustomerChangeEmailPhoneRequest {
}
exports.CustomerChangeEmailPhoneRequest = CustomerChangeEmailPhoneRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'emailId is required' }),
    __metadata("design:type", String)
], CustomerChangeEmailPhoneRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['email', 'phone']),
    (0, class_validator_1.IsNotEmpty)({ message: 'type is required' }),
    __metadata("design:type", String)
], CustomerChangeEmailPhoneRequest.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'update_value is required' }),
    __metadata("design:type", String)
], CustomerChangeEmailPhoneRequest.prototype, "update_value", void 0);
class ZoneListRequest {
}
exports.ZoneListRequest = ZoneListRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'countryId is required' }),
    __metadata("design:type", Number)
], ZoneListRequest.prototype, "countryId", void 0);
class CityListRequest {
}
exports.CityListRequest = CityListRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'stateId is required' }),
    __metadata("design:type", Number)
], CityListRequest.prototype, "stateId", void 0);
class UploadFileRequest {
}
exports.UploadFileRequest = UploadFileRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'image is required' }),
    __metadata("design:type", String)
], UploadFileRequest.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'path is required' }),
    __metadata("design:type", String)
], UploadFileRequest.prototype, "path", void 0);
class GoogleLoginRequest {
}
exports.GoogleLoginRequest = GoogleLoginRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'email is required' }),
    (0, class_validator_1.Matches)(validateEmailRegex),
    __metadata("design:type", String)
], GoogleLoginRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'fullName is required' }),
    __metadata("design:type", String)
], GoogleLoginRequest.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'token is required' }),
    __metadata("design:type", String)
], GoogleLoginRequest.prototype, "token", void 0);
class FacebookLoginRequest {
}
exports.FacebookLoginRequest = FacebookLoginRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'email is required' }),
    (0, class_validator_1.Matches)(validateEmailRegex),
    __metadata("design:type", String)
], FacebookLoginRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'fullName is required' }),
    __metadata("design:type", String)
], FacebookLoginRequest.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'token is required' }),
    __metadata("design:type", String)
], FacebookLoginRequest.prototype, "token", void 0);
class validateSlug {
}
exports.validateSlug = validateSlug;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'slug is required' }),
    __metadata("design:type", String)
], validateSlug.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], validateSlug.prototype, "productId", void 0);
//# sourceMappingURL=index.js.map