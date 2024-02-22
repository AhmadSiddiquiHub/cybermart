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
exports.EditProductRequest = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
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
class VariantInfo {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'vendorProductVariantId is required' }),
    __metadata("design:type", Number)
], VariantInfo.prototype, "vendorProductVariantId", void 0);
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
class EditProductRequest {
}
exports.EditProductRequest = EditProductRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'productId is required' }),
    __metadata("design:type", Number)
], EditProductRequest.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'vendorId is required' }),
    __metadata("design:type", Number)
], EditProductRequest.prototype, "vendorId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'p_name is required' }),
    __metadata("design:type", String)
], EditProductRequest.prototype, "p_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'brandId is required' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EditProductRequest.prototype, "brandId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'long_desc is required' }),
    __metadata("design:type", String)
], EditProductRequest.prototype, "long_desc", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], EditProductRequest.prototype, "bulletPoints", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'desc_editor_design is required' }),
    __metadata("design:type", String)
], EditProductRequest.prototype, "desc_editor_design", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'return_days is required' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EditProductRequest.prototype, "return_days", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => ProductShipping),
    __metadata("design:type", Array)
], EditProductRequest.prototype, "shipping", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => VariantInfo),
    __metadata("design:type", Array)
], EditProductRequest.prototype, "variants_info", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => VariantObject),
    __metadata("design:type", Array)
], EditProductRequest.prototype, "variants", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditProductRequest.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EditProductRequest.prototype, "fakeOrders", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditProductRequest.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditProductRequest.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditProductRequest.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], EditProductRequest.prototype, "warrantySettings", void 0);
//# sourceMappingURL=EditProductRequest.js.map