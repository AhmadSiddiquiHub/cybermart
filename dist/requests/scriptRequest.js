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
exports.OrdersInsertScriptRequest = exports.UserInsertScriptRequest = exports.BrandsInsertScriptRequest = exports.CategoryInsertScriptRequest = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CategorySchema {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'id is required' }),
    __metadata("design:type", Number)
], CategorySchema.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'parentInt is required' }),
    __metadata("design:type", Number)
], CategorySchema.prototype, "parentInt", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'sortOrder is required' }),
    __metadata("design:type", Number)
], CategorySchema.prototype, "sortOrder", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'urlKey is required' }),
    __metadata("design:type", String)
], CategorySchema.prototype, "urlKey", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'image is required' }),
    __metadata("design:type", String)
], CategorySchema.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'icon is required' }),
    __metadata("design:type", String)
], CategorySchema.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'site_id is required' }),
    __metadata("design:type", Number)
], CategorySchema.prototype, "siteId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'cat_id is required' }),
    __metadata("design:type", Number)
], CategorySchema.prototype, "catId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'showInMenu is required' }),
    __metadata("design:type", Number)
], CategorySchema.prototype, "showInMenu", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'lang_id is required' }),
    __metadata("design:type", Number)
], CategorySchema.prototype, "langId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'name is required' }),
    __metadata("design:type", String)
], CategorySchema.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'metaTitle is required' }),
    __metadata("design:type", String)
], CategorySchema.prototype, "metaTitle", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'metaKeyword is required' }),
    __metadata("design:type", String)
], CategorySchema.prototype, "metaKeyword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'metaDescription is required' }),
    __metadata("design:type", String)
], CategorySchema.prototype, "metaDescription", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CategorySchema.prototype, "path", void 0);
class CategoryInsertScriptRequest {
}
exports.CategoryInsertScriptRequest = CategoryInsertScriptRequest;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => CategorySchema),
    __metadata("design:type", Array)
], CategoryInsertScriptRequest.prototype, "categories", void 0);
class BrandSchema {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'id is required' }),
    __metadata("design:type", Number)
], BrandSchema.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'name is required' }),
    __metadata("design:type", String)
], BrandSchema.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'image is required' }),
    __metadata("design:type", String)
], BrandSchema.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'slug is required' }),
    __metadata("design:type", String)
], BrandSchema.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'siteId is required' }),
    __metadata("design:type", Number)
], BrandSchema.prototype, "siteId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'brandId is required' }),
    __metadata("design:type", Number)
], BrandSchema.prototype, "brandId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'langId is required' }),
    __metadata("design:type", Number)
], BrandSchema.prototype, "langId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'metaTitle is required' }),
    __metadata("design:type", String)
], BrandSchema.prototype, "metaTitle", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'metaKeyword is required' }),
    __metadata("design:type", String)
], BrandSchema.prototype, "metaKeyword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'metaDescription is required' }),
    __metadata("design:type", String)
], BrandSchema.prototype, "metaDescription", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], BrandSchema.prototype, "categories", void 0);
class BrandsInsertScriptRequest {
}
exports.BrandsInsertScriptRequest = BrandsInsertScriptRequest;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => BrandSchema),
    __metadata("design:type", Array)
], BrandsInsertScriptRequest.prototype, "brands", void 0);
class UserSchema {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'id is required' }),
    __metadata("design:type", Number)
], UserSchema.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'siteId is required' }),
    __metadata("design:type", Number)
], UserSchema.prototype, "siteId", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['B', 'S']),
    (0, class_validator_1.IsNotEmpty)({ message: 'typeId is required' }),
    __metadata("design:type", String)
], UserSchema.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'firstName is required' }),
    __metadata("design:type", String)
], UserSchema.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'lastName is required' }),
    __metadata("design:type", String)
], UserSchema.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email is required' }),
    __metadata("design:type", String)
], UserSchema.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'emailVerified is required' }),
    __metadata("design:type", Number)
], UserSchema.prototype, "emailVerified", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password is required' }),
    __metadata("design:type", String)
], UserSchema.prototype, "password", void 0);
class UserInsertScriptRequest {
}
exports.UserInsertScriptRequest = UserInsertScriptRequest;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => UserSchema),
    __metadata("design:type", Array)
], UserInsertScriptRequest.prototype, "users", void 0);
class OrderSchema {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'orderId is required' }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "orderId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'userId is required' }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'siteId is required' }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "siteId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'countryId is required' }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "countryId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'stateId is required' }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "stateId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'cityId is required' }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "cityId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'name is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'lineAddress1 is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "lineAddress1", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'lineAddress2 is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "lineAddress2", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'lineAddress3 is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "lineAddress3", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'zipcode is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "zipcode", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'addrType is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "addrType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'statusId is required' }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "statusId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'orderNo is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "orderNo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'totalAmount is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "totalAmount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'paymentMethodId is required' }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "paymentMethodId", void 0);
__decorate([
    (0, class_validator_1.IsIn)([1, 0]),
    (0, class_validator_1.IsNotEmpty)({ message: 'paymentStatus is required' }),
    __metadata("design:type", Number)
], OrderSchema.prototype, "paymentStatus", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'comments is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "comments", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'coupon is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "coupon", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'discount is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "discount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'createdAt is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'updatedAt is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "updatedAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'invoice is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "invoice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'trackingSlip is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "trackingSlip", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'shippingCharges is required' }),
    __metadata("design:type", String)
], OrderSchema.prototype, "shippingCharges", void 0);
class OrdersInsertScriptRequest {
}
exports.OrdersInsertScriptRequest = OrdersInsertScriptRequest;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => OrderSchema),
    __metadata("design:type", Array)
], OrdersInsertScriptRequest.prototype, "orders", void 0);
//# sourceMappingURL=scriptRequest.js.map