import {IsInt,IsNotEmpty,MinLength,IsIn,IsArray,MaxLength,IsEnum,ValidateIf,IsNumber,IsString,IsDateString,ArrayMinSize,
    IsISO8601,Length,Matches,IsOptional} from 'class-validator';
import { OrderStatusEnum, ProductStatusEnum } from '../utils';

const validateEmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// import { Type } from 'class-transformer';

export class TestRequest {

    @IsNotEmpty({ message: 'limit is required' })
    @IsInt()
    public limit: number;

}

export class SellerCampaignListingRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'page is required' })
    public page: number;
}

export class RegisterCampaignRequest {

    @IsNotEmpty({ message: 'slug is required' })
    public slug: string;


    @IsArray()
    public productIds: [];

}
export class UpdateCampaignRequest {

    @IsNotEmpty({ message: 'slug is required' })
    public slug: string;

    @IsArray()
    public productIds: [];

}

export class UpdateCampaignProductPricingRequest {

    @IsNumber()
    @IsNotEmpty({ message: 'vendorProductVariantId is required' })
    public vendorProductVariantId: number;

    @IsNotEmpty({ message: 'price is required' })
    public price: number;

    @IsNotEmpty({ message: 'discountPrice is required' })
    public discountPrice: number;

    @IsNotEmpty({ message: 'slug is required' })
    public slug: string;
}
export class CountryListRequest {

    @IsNotEmpty({ message: 'limit is required' })
    public limit: number;

    @IsNotEmpty({ message: 'offset is required' })
    public offset: number;

    public keyword: string;
}

export class RegisterRequest {

    @ValidateIf(response => response.loginType === 'Facebook' && response.loginType === 'Gmail')
    @IsNotEmpty({ message: 'fullName is required' })
    public fullName: string;

    @IsNotEmpty({ message: 'emailOrPhone is required' })
    public emailOrPhone: string;

    @ValidateIf(response => response.loginType !== 'Facebook' && response.loginType !== 'Gmail')
    @MinLength(8, { message: 'password must contain minimum 8 character' })
    @IsNotEmpty({ message: 'password is required' })
    public password: string;

    @ValidateIf(response => response.loginType !== 'Facebook' && response.loginType !== 'Gmail')
    @IsNotEmpty({ message: 'confirmPassword is required' })
    public confirmPassword: string;

    @IsIn(['Facebook', 'Gmail', 'Normal'])
    @IsNotEmpty({ message: 'login type is required' })
    public loginType: string;

    @ValidateIf(response => response.browserId !== undefined)
    @IsString()
    public browserId: string;

    @ValidateIf(response => response.loginType === 'Facebook' && response.loginType === 'Gmail')
    @IsNotEmpty({ message: 'token is required' })
    @IsString()
    public token: string;
}

export class LoginRequest {

    @IsNotEmpty({ message: 'emailOrPhone is required' })
    public emailOrPhone: string;

    @ValidateIf(response => response.loginType !== 'Facebook' && response.loginType !== 'Gmail')
    @IsNotEmpty({ message: 'password is required' })
    public password: string;

    @IsIn(['Facebook', 'Gmail', 'Normal'])
    @IsNotEmpty({ message: 'login type is required' })
    public loginType: string;

    @ValidateIf(response => response.loginType === 'Facebook' && response.loginType === 'Gmail')
    @IsNotEmpty({ message: 'fullName is required' })
    public fullName: string;

    @ValidateIf(response => response.loginType === 'Facebook' && response.loginType === 'Gmail')
    @IsString()
    public token: string;
}

export class VerifyOTPRequest {

    // @IsNotEmpty({ message: 'email is required' })
    // public email: string;

    // @IsNotEmpty({ message: 'type is required' })
    // @IsIn(['sms', 'email'])
    // public type: string;

    // @IsNumber()
    // @IsNotEmpty({ message: 'code is required' })
    // public code: number;

    // @IsNotEmpty({ message: 'browserId is required' })
    // public browserId: string;



    // public appProcess: string;
    @IsNotEmpty({ message: 'emailOrPhone is required' })
    public emailOrPhone: string;

    @IsNumber()
    @IsNotEmpty({ message: 'mobile_otp is required' })
    public mobile_otp: number;

    @IsNumber()
    @IsNotEmpty({ message: 'email_otp is required' })
    public email_otp: number;

    @IsNotEmpty({ message: 'browserId is required' })
    public browserId: string;

    @IsNotEmpty({ message: 'requireOtpEveryTime must be integer and is required' })
    @IsIn([0, 1])
    public requireOtpEveryTime: number;

    public process: string;
}

export class ResendOTPRequest {

    @IsString()
    @IsNotEmpty({ message: 'email is required' })
    public emailOrPhone: string;
}

// class DocumentObj {

//     @IsNotEmpty({ message: 'name is required' })
//     name: string;

//     @IsNotEmpty({ message: 'value is required' })
//     value: string;

//     @IsDateString()
//     @IsNotEmpty({ message: 'issueDate is required' })
//     issueDate: string;

//     @IsDateString()
//     @IsNotEmpty({ message: 'expiryDate is required' })
//     expiryDate: string;
// }
export class SellerSetupProfileRequest {

    @IsNotEmpty({ message: 'firstName is required' })
    public firstName: string;

    @IsNotEmpty({ message: 'lastName is required' })
    public lastName: string;

    @IsNotEmpty({ message: 'countryOfCitizen is required' })
    public countryOfCitizen: number;

    @IsNotEmpty({ message: 'countryOfBirth is required' })
    public countryOfBirth: number;

    @IsDateString()
    @IsNotEmpty({ message: 'dateOfBirth is required' })
    public dateOfBirth: string;

    // @IsArray()
    // @IsNotEmpty({ message: 'documents are required' })
    // @ValidateNested({ each: true })
    // @Type(() => DocumentObj)
    // public documents: DocumentObj[];
}


export class SellerSetupProfileRequestS1 {

    @IsNotEmpty({ message: 'first and last Name is required' })
    public firstAndLastName: string;

    @IsNotEmpty({ message: 'contactEmailAddress is required' })
    public contactEmailAddress: string;

    @IsNotEmpty({ message: 'contactMobilePhone is required' })
    public contactMobilePhone: string;

    @IsNotEmpty({ message: 'StoreName is required' })
    public storeName: string;

}

export class SellerSetupProfileRequestS2 {

    // @IsString()
    // @IsNotEmpty({ message: 'line_address_1 is required' })
    // public line_address_1: string;

    // @IsString()
    // @IsNotEmpty({ message: 'line_address_2 is required' })
    // public line_address_2: string;

    // public line_address_3: string;

    // @IsNumber()
    // @IsNotEmpty({ message: 'zipcode is required' })
    // public zipcode: number;

    // @IsNumber()
    // @IsNotEmpty({ message: 'countryId is required' })
    // public countryId: number;

    // // @IsNumber()
    // @IsNotEmpty({ message: 'stateId is required' })
    // public stateId: number;

    // @IsNumber()
    // @IsNotEmpty({ message: 'cityId is required' })
    // public cityId: number;

    @IsNotEmpty({ message: 'identityType is required' })
    public identityType: string;

    @IsNotEmpty({ message: 'documentTypeId is required' })
    public documentTypeId: number;

    @IsNotEmpty({ message: 'identityNumber is required' })
    public identityNumber: number;

    @IsNotEmpty({ message: 'issueDate is required' })
    // @IsDateString()
    public issueDate: string;

    @IsNotEmpty({ message: 'expiryDate is required' })
    // @IsDateString()
    public expiryDate: string;

    @IsNotEmpty({ message: 'frontImage is required' })
    public frontImage: string;

    public backImage: string;

}
export class SellerStoreProfileCreateRequest {

    @IsString()
    @IsNotEmpty({ message: 'storeName is required' })
    public storeName: string;

    @IsString()
    @IsNotEmpty({ message: 'profileImage is required' })
    public profileImage: string;

    @IsString()
    @IsNotEmpty({ message: 'backGroundImage is required' })
    public backGroundImage: string;

    @IsArray()
    @ArrayMinSize(4)
    public banners: string[]
}

export class SellerBankCreateRequest {

    @IsNotEmpty({ message: 'AccountNO is required' })
    public accountNo: string;

    @IsString()
    @IsNotEmpty({ message: 'account holder Name is required' })
    public accountHolderName: string;

    @IsString()
    @IsNotEmpty({ message: 'IBAN is required' })
    public IBAN: string;

    @IsString()
    @IsNotEmpty({ message: 'chequeImage is required' })
    public chequeImage: string;

    @IsNumber()
    @IsNotEmpty({ message: 'branchCode is required' })
    public branchCode: number;

    @IsNumber()
    @IsNotEmpty({ message: 'bankId is required' })
    public bankId: number;
}

export class UserEditProfileRequest {
    // @IsString()
    // @MaxLength(32, { message: 'firstName should be maximum 32 character' })
    // @IsNotEmpty({ message: 'firstName is required' })
    public firstName: string;

    // @MaxLength(32, { message: 'lastName should be maximum 32 character' })
    public lastName: string;

    // @MaxLength(96, { message: 'email should be maximum 96 character' })
    // @IsNotEmpty({ message: 'emailId is required' })
    public emailId: string;

    // @ValidateIf(o => o.phoneNumber !== '')
    // @MaxLength(15, { message: 'phoneNumber should be maximum 15 character' })
    public phoneNumber: number;

    public image: string;

    // @MaxLength(128, { message: 'address1 should be maximum 128 characters' })
    // @IsNotEmpty({ message: 'address1 is required' })
    public address1: string;

    public address2: string;

    // @IsNotEmpty({ message: 'countryId is required' })
    public countryId: any;

    // @IsNotEmpty({ message: 'cityId is required' })
    public cityId: any;

    // @IsNotEmpty({ message: 'stateId is required' })
    public stateId: any;

    // @IsNotEmpty({ message: 'type is required' })
    public type: any;

    // @IsNotEmpty({ message: 'isDefault is required' })
    public isDefault: number;

    // @IsNotEmpty({ message: 'address name is required' })
    public name: any;

    // @ValidateIf(o => o.zipcode !== '')
    public postcode: number;


}

export class SellerStoreProfileUpdateRequest {
    public siteId: number;
    @IsNotEmpty({ message: 'storeName is required' })
    public storeName: string;

    @IsNotEmpty({ message: 'profileImage is required' })
    public profileImage: string;

    @IsNotEmpty({ message: 'backGroundImage is required' })
    public backGroundImage: string;
    @IsNotEmpty({ message: 'banners is required' })
    @IsArray()
    public banners: [{}]
}

export class SellerSetupBusinessAdressRequest {

    @IsString()
    @IsNotEmpty({ message: 'line_address_1 is required' })
    public line_address_1: string;

    // @IsString()
    // @IsNotEmpty({ message: 'line_address_2 is required' })
    public line_address_2: string;

    public line_address_3: string;

    @IsNumber()
    @IsNotEmpty({ message: 'zipcode is required' })
    public zipcode: number;

    @IsNumber()
    @IsNotEmpty({ message: 'countryId is required' })
    public countryId: number;

    // @IsNumber()
    @IsNotEmpty({ message: 'stateId is required' })
    public stateId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'cityId is required' })
    public cityId: number;

}
export class CreateCouponRequest {

    @MaxLength(255, { message: 'coupon name should be maximum 255 characters' })
    @IsNotEmpty({ message: 'coupon name is required' })
    public couponName: string;

    @MaxLength(30, { message: 'coupon code should be maximum 32 characters' })
    @IsNotEmpty({ message: 'coupon code is required' })
    public couponCode: string;

    @IsInt()
    @IsIn([1, 2])
    @IsNotEmpty({ message: 'value type is required  1-> percentage 2 -> amount' })
    public valueType: number;

    @IsNotEmpty({ message: 'value is required' })
    public value: number;

    @IsNotEmpty({ message: 'coupon type is required' })
    public couponType: string

    public minOrderAmount: number;

    public isStackable: number;

    public is_signup_coupon: number;

    public leftCount: number;

    public maxUsage: number;
    public isActive: number;

    public maxDiscount: number;

    public startDate: string;

    public endDate: string;

    @IsArray()
    public productIds: [];

    @IsArray()
    public categoryIds: [];

    @IsArray()
    public userBased: [];
}

export class UpdateCouponRequest {

    @MaxLength(255, { message: 'coupon name should be maximum 255 characters' })
    @IsNotEmpty({ message: 'coupon name is required' })
    public couponName: string;

    @MaxLength(30, { message: 'coupon code should be maximum 32 characters' })
    @IsNotEmpty({ message: 'coupon code is required' })
    public couponCode: string;

    @IsInt()
    @IsNotEmpty({ message: 'value type is required  1-> percentage 2 -> amount' })
    public valueType: number;

    @IsNotEmpty({ message: 'value is required' })
    public value: number;

    @IsNotEmpty({ message: 'coupon type is required' })
    public couponType: string

    public minOrderAmount: number;

    public isStackable: number;

    public is_signup_coupon: number;

    public leftCount: number;

    public maxDiscount: number;

    public maxUsage: number;

    public isActive: number;

    public startDate: string;

    public endDate: string;

    @IsArray()
    public productIds: [];

    @IsArray()
    public categoryIds: [];

    @IsArray()
    public userBased: [];

}

export class CouponListingRequest {

    @IsNotEmpty({ message: 'limit is required' })
    public limit: number;

    @IsNotEmpty({ message: 'offset is required' })
    public offset: number;

    @IsIn(['all', 'running', 'expired'])
    @IsNotEmpty({ message: 'status is required' })
    public status: string;

    @IsIn(['ASC', 'DESC'])
    @IsNotEmpty({ message: 'sortBy is required' })
    public sortBy: string;

    public keyword: string;
}

export class MarkCategoryFavoriteRequest {
    @IsNotEmpty({ message: 'catId is required' })
    public catId: number;
}

export class CreateComboOfferRequest {

    @IsNotEmpty({ message: 'name is required' })
    public name: string;

    public description: string;

    @IsNumber()
    @IsNotEmpty({ message: 'amount is required' })
    public amount: number;

    @IsNumber()
    @IsIn([1, 2])
    @IsNotEmpty({ message: 'type is required' })
    public type: number;

    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(3)
    public productIds: number[];
}

export class removeVariantsRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'productId is required' })
    public vendorProductVariantId: number;

    public valueFor_ProductVariantValueTable: string;
}

export class ProductListingRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'page is required' })
    public page: number;

    @IsNumber()
    @IsEnum(ProductStatusEnum)
    @IsNotEmpty({ message: 'statusId is required' })
    public statusId: number;

    @IsNumber()
    @IsIn([1, 2])
    @IsNotEmpty({ message: 'viewType is required' })
    public viewType: number;

    public keyword: any;
}

export class relatedProductSuggestionRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'page is required' })
    public page: number;

    @IsNumber()
    @IsEnum(ProductStatusEnum)
    @IsNotEmpty({ message: 'statusId is required' })
    public statusId: number;

    @IsNumber()
    @IsIn([1, 2])
    @IsNotEmpty({ message: 'viewType is required' })
    public viewType: number;

    @IsNumber()
    @IsNotEmpty({ message: 'parentCategoryId is required' })
    parentCategoryId: number;

    @IsString()
    @IsIn(['edit', 'create'])
    @IsNotEmpty({ message: 'type is required' })
    type: 'edit' | 'create';
    public keyword: any;

    @IsNumber()
    @IsNotEmpty({ message: 'limit is required' })
    public limit: number;

    @IsNumber()
    @IsNotEmpty({ message: 'limit is required' })
    public offset: number;

    @IsNumber()
    @IsNotEmpty({ message: 'otherSeller is required' })
    @IsIn([0, 1])
    public otherSeller: number;

    @IsNumber()
    @IsOptional()
    productId: number
}

export class getRelatedProductRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'page is required' })
    public page: number;

    @IsNumber()
    @IsEnum(ProductStatusEnum)
    @IsNotEmpty({ message: 'statusId is required' })
    public statusId: number;

    @IsNumber()
    @IsIn([1, 2])
    @IsNotEmpty({ message: 'viewType is required' })
    public viewType: number;

    public keyword: any;

    @IsNumber()
    @IsNotEmpty({ message: 'limit is required' })
    public limit: number;

    @IsNumber()
    @IsNotEmpty({ message: 'limit is required' })
    public offset: number;

    @IsNumber()
    @IsOptional()
    productId: number
}

export class ProductExportToExcelRequest {
    @IsArray()
    @IsNumber({}, { each: true })
    public prefIds: number[];
}

export class UpdateProducctStockRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'productId is required' })
    public productId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'productVariantId is required' })
    public productVariantId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'quantity is required' })
    public quantity: number;
}

export class UpdateProducctPriceRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'productId is required' })
    public productId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'productVariantId is required' })
    public productVariantId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'price is required' })
    public price: number;
}

export class UpdateProducctAvailabilityRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'vendorProductVariantId is required' })
    public vendorProductVariantId: number;
}

export class DeleteProducctAvailabilityRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'vendorProductVariantId is required' })
    public vendorProductVariantId: number;
}

export class UpdateProductDiscountPriceRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'productId is required' })
    public productId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'productVariantId is required' })
    public productVariantId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'price is required' })
    public price: number;

    @IsNumber()
    @IsNotEmpty({ message: 'discountPrice is required' })
    public discountPrice: string;

    @IsISO8601({ strict: true })
    @Length(10, 10)
    @IsNotEmpty({ message: 'startDate is required' })
    public startDate: string;

    @IsISO8601({ strict: true })
    @Length(10, 10)
    @IsNotEmpty({ message: 'endDate is required' })
    public endDate: string;
    
    public showSaleEndDate: number;
}

export class OrderExcelExportRequest {

    @IsEnum(OrderStatusEnum)
    @IsNotEmpty({ message: 'status is required' })
    @IsNumber()
    public status: number;

    @IsNumber()
    @IsNotEmpty({ message: 'state is required' })
    public state: number;

    @IsNumber()
    @IsNotEmpty({ message: 'city is required' })
    public city: number;

    @IsArray()
    @IsNumber({}, { each: true })
    public prefIds: number[];
}

export class OrderListRequest {
    @IsNotEmpty({ message: 'limit is required' })
    @IsNumber()
    public limit: number;

    // @IsNotEmpty({ message: 'offset is required' })
    // @IsNumber()
    // public offset: number;

    @IsNumber()
    @IsNotEmpty({ message: 'page is required' })
    public page: number;

    @IsEnum(OrderStatusEnum)
    @IsNotEmpty({ message: 'status is required' })
    @IsNumber()
    public status: number;

    @IsIn([1, 2])
    @IsNotEmpty({ message: 'viewType is required 1 for list, 2 for details' })
    @IsNumber()
    public viewType: number;

    @IsNumber()
    @IsNotEmpty({ message: 'day is required' })
    @ValidateIf(n => !n.startDate && !n.endDate)
    public day: number;

    public startDate: string;

    public endDate: string;

    public keyword: string;

    @IsIn(['ASC', 'DESC'])
    @IsNotEmpty({ message: 'sort is required' })
    public sort: string;

    @IsNumber()
    @IsNotEmpty({ message: 'state is required' })
    public state: number;

    @IsNumber()
    @IsNotEmpty({ message: 'city is required' })
    public city: number;

    @IsArray()
    @IsNumber({}, { each: true })
    public prefIds: number[];
}

export class ConfirmShippmentOrderRequest {
    @IsNotEmpty({ message: 'courierId is required' })
    public courierId: number;

    @IsNotEmpty({ message: 'trackingNo is required' })
    public trackingNo: string;

    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    public subOrderId: number[];

    @IsNotEmpty({ message: 'date is required' })
    public date: string;
}

export class VerifyReturnItemRequest {
    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    public subOrderId: number[];
}

export class AcceptOrderRequest {
    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    public subOrderId: number[];
}

export class returnOrderRequestResponseRequest {
    @IsNotEmpty({ message: 'subOrderId is required' })
    public subOrderId: number;

    @IsNotEmpty({ message: 'description is required' })
    public description: string;

}

export class orderDeliveredRequest {
    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    public subOrderId: number[];
}

export class RefundRequestViewRequest {
    @IsNumber()
    public subOrderId: number;
}

export class SellerNotesRequest {
    @IsNotEmpty({ message: 'comments is required' })
    public comments: string;

    @IsNotEmpty({ message: 'orderId is required' })
    public orderId: number;
}

export class OrderCancelRequest {

    @IsNotEmpty({ message: 'reasonId is required' })
    public reasonId: number;

    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    public subOrderId: number[];

    @IsNotEmpty({ message: 'description is required' })
    public description: string;

}


export class CustomerChangeEmailPhoneRequest {
    @IsNotEmpty({ message: 'emailId is required' })
    public email: string;

    @IsIn(['email', 'phone'])
    @IsNotEmpty({ message: 'type is required' })
    public type: string;

    @IsNotEmpty({ message: 'update_value is required' })
    public update_value: string;
}

export class ZoneListRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'countryId is required' })
    public countryId: number;
}
export class CityListRequest {
    @IsNumber()
    @IsNotEmpty({ message: 'stateId is required' })
    public stateId: number;
}

export class UploadFileRequest {

    @IsNotEmpty({ message: 'image is required' })
    public image: string;

    @IsNotEmpty({ message: 'path is required' })
    public path: string;
}

export class GoogleLoginRequest {

    @IsString()
    @IsNotEmpty({ message: 'email is required' })
    @Matches(validateEmailRegex)
    public email: string;

    @IsString()
    @IsNotEmpty({ message: 'fullName is required' })
    public fullName: string;

    @IsString()
    @IsNotEmpty({ message: 'token is required' })
    public token: string;
}

export class FacebookLoginRequest {

    @IsString()
    @IsNotEmpty({ message: 'email is required' })
    @Matches(validateEmailRegex)
    public email: string;

    @IsString()
    @IsNotEmpty({ message: 'fullName is required' })
    public fullName: string;

    @IsString()
    @IsNotEmpty({ message: 'token is required' })
    public token: string;
}

export class validateSlug {
    @IsString()
    @IsNotEmpty({ message: 'slug is required' })
    public slug: string;

    @IsOptional()
    @IsNumber()
    public productId: number;
}