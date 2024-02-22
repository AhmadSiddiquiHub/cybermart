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
exports.UpdateProductAvailabilityForAllVariantsRequest = exports.activeDeactiveRequest = exports.activeDeactiveRequestV1 = exports.AddAnswerRequest = exports.GetQuestionListRequest = exports.CreateProductRequest = exports.otherSellerListing = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AdditionalInfoObject {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'categoryId is required in adittionalInfo array' }),
    __metadata("design:type", Number)
], AdditionalInfoObject.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'productAttributesId is required in adittionalInfo array' }),
    __metadata("design:type", Number)
], AdditionalInfoObject.prototype, "productAttributesId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'optionValue is required in adittionalInfo array' }),
    __metadata("design:type", String)
], AdditionalInfoObject.prototype, "optionValue", void 0);
class VariantObject {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'id is required in variant array' }),
    __metadata("design:type", Number)
], VariantObject.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'value is required in variant array' }),
    __metadata("design:type", String)
], VariantObject.prototype, "value", void 0);
class ProductShipping {
}
__decorate([
    (0, class_validator_1.IsOptional)({ message: 'days are required in shipping array' }),
    __metadata("design:type", Number)
], ProductShipping.prototype, "days", void 0);
__decorate([
    (0, class_validator_1.IsOptional)({ message: 'charges are required in shipping array' }),
    __metadata("design:type", Number)
], ProductShipping.prototype, "charges", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'type are required in shipping array' }),
    (0, class_validator_1.IsIn)(['free', 'standard', 'express', 'same-day', 'open-box']),
    __metadata("design:type", String)
], ProductShipping.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)({ message: 'pincodes are optional' }),
    __metadata("design:type", Array)
], ProductShipping.prototype, "pincodes", void 0);
class Images {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([0, 1]),
    (0, class_validator_1.IsNotEmpty)({ message: 'is_default is required in images array' }),
    __metadata("design:type", Number)
], Images.prototype, "is_default", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'variantId is required in images array' }),
    __metadata("design:type", Number)
], Images.prototype, "variantId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'image is required in images array' }),
    __metadata("design:type", String)
], Images.prototype, "image", void 0);
class VariantValue {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'name is required in variant_value array' }),
    __metadata("design:type", String)
], VariantValue.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'value is required in variant_value array' }),
    __metadata("design:type", String)
], VariantValue.prototype, "value", void 0);
class otherSellerListing {
}
exports.otherSellerListing = otherSellerListing;
class VariantInfo {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'sku is required' }),
    __metadata("design:type", String)
], VariantInfo.prototype, "sku", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'price is required' }),
    __metadata("design:type", String)
], VariantInfo.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'quantity is required' }),
    __metadata("design:type", Number)
], VariantInfo.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'condition is required' }),
    __metadata("design:type", String)
], VariantInfo.prototype, "condition", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'start_sale_date is required' }),
    (0, class_validator_1.ValidateIf)(n => n.sale_price !== undefined && n.sale_price !== null && n.sale_price !== '' && n.sale_price !== 0),
    __metadata("design:type", String)
], VariantInfo.prototype, "start_sale_date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'end_sale_date is required' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)(n => n.sale_price !== undefined && n.sale_price !== null && n.sale_price !== '' && n.sale_price !== 0),
    __metadata("design:type", String)
], VariantInfo.prototype, "end_sale_date", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(2),
    (0, class_transformer_1.Type)(() => Images),
    __metadata("design:type", Array)
], VariantInfo.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => VariantValue),
    __metadata("design:type", Array)
], VariantInfo.prototype, "variant_value", void 0);
class CreateProductRequest {
}
exports.CreateProductRequest = CreateProductRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'p_name is required' }),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "p_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'brandId is required' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductRequest.prototype, "brandId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'long_desc is required' }),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "long_desc", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'desc_editor_design is required' }),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "desc_editor_design", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(3),
    __metadata("design:type", Array)
], CreateProductRequest.prototype, "search_keywords", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(5),
    __metadata("design:type", Array)
], CreateProductRequest.prototype, "bulletPoints", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateProductRequest.prototype, "categories", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => ProductShipping),
    __metadata("design:type", Array)
], CreateProductRequest.prototype, "shipping", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AdditionalInfoObject),
    __metadata("design:type", Array)
], CreateProductRequest.prototype, "additionalInfo", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => VariantObject),
    __metadata("design:type", Array)
], CreateProductRequest.prototype, "variants", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => VariantInfo),
    __metadata("design:type", Array)
], CreateProductRequest.prototype, "variants_info", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'return_days is required' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductRequest.prototype, "return_days", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'slug is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductRequest.prototype, "fakeOrders", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductRequest.prototype, "warrantySettings", void 0);
class GetQuestionListRequest {
}
exports.GetQuestionListRequest = GetQuestionListRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Limit is required' }),
    __metadata("design:type", Number)
], GetQuestionListRequest.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'offset is required' }),
    __metadata("design:type", Number)
], GetQuestionListRequest.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'page is required' }),
    __metadata("design:type", Number)
], GetQuestionListRequest.prototype, "page", void 0);
class AddAnswerRequest {
}
exports.AddAnswerRequest = AddAnswerRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'question Id is required' }),
    __metadata("design:type", Number)
], AddAnswerRequest.prototype, "productQuestionId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'answer is required' }),
    __metadata("design:type", String)
], AddAnswerRequest.prototype, "answer", void 0);
class activeDeactiveRequestV1 {
}
exports.activeDeactiveRequestV1 = activeDeactiveRequestV1;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'productId Id is required' }),
    __metadata("design:type", Number)
], activeDeactiveRequestV1.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'productVariantId Id is required' }),
    __metadata("design:type", Number)
], activeDeactiveRequestV1.prototype, "productVariantId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([1, 2]),
    (0, class_validator_1.IsNotEmpty)({ message: 'viewType is required' }),
    __metadata("design:type", Number)
], activeDeactiveRequestV1.prototype, "viewType", void 0);
class activeDeactiveRequest {
}
exports.activeDeactiveRequest = activeDeactiveRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'productId Id is required' }),
    __metadata("design:type", Number)
], activeDeactiveRequest.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'productVariantId Id is required' }),
    __metadata("design:type", Number)
], activeDeactiveRequest.prototype, "productVariantId", void 0);
class UpdateProductAvailabilityForAllVariantsRequest {
}
exports.UpdateProductAvailabilityForAllVariantsRequest = UpdateProductAvailabilityForAllVariantsRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'productId Id is required' }),
    __metadata("design:type", Number)
], UpdateProductAvailabilityForAllVariantsRequest.prototype, "productId", void 0);
//# sourceMappingURL=createProductRequest.js.map