import { IsNotEmpty, IsIn, IsArray, ValidateNested, ArrayMinSize, IsNumber, ValidateIf, IsDateString, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ProductShipping {
    @IsOptional({ message: 'days are required in shipping array' })
    public days: number;

    @IsOptional({ message: 'charges are required in shipping array' })
    public charges: number;

    @IsNotEmpty({ message: 'type are required in shipping array' })
    @IsIn(['free', 'standard', 'express', 'same-day', 'open-box'])
    public type: string;

    @IsOptional({ message: 'pincodes are optional' })
    public pincodes: number[]
}

class VariantValue {
    @IsNotEmpty({ message: 'name is required in variant_value array' })
    public name: string;

    @IsNotEmpty({ message: 'value is required in variant_value array' })
    public value: string;
}

class Images {
    @IsNumber()
    @IsIn([0, 1])
    @IsNotEmpty({ message: 'is_default is required in images array' })
    public is_default: number;

    @IsNumber()
    @IsNotEmpty({ message: 'variantId is required in images array' })
    public variantId: number;

    @IsString()
    @IsNotEmpty({ message: 'image is required in images array' })
    public image: string;
}

class VariantInfo {

    @IsNotEmpty({ message: 'vendorProductVariantId is required' })
    public vendorProductVariantId: number;

    @IsNotEmpty({ message: 'sku is required' })
    public sku: string;

    @IsNotEmpty({ message: 'price is required' })
    public price: string;

    @IsNotEmpty({ message: 'quantity is required' })
    public quantity: number;

    @IsNotEmpty({ message: 'condition is required' })
    public condition: string;

    public productVariantId: number;

    public sale_price: string;

    public showSaleEndDate: number;

    @IsNotEmpty({ message: 'start_sale_date is required' })
    @ValidateIf(n => n.sale_price !== undefined && n.sale_price !== null && n.sale_price !== '' && n.sale_price !== 0)
    public start_sale_date: string;

    @IsNotEmpty({ message: 'end_sale_date is required' })
    @IsDateString()
    @ValidateIf(n => n.sale_price !== undefined && n.sale_price !== null && n.sale_price !== '' && n.sale_price !== 0)
    public end_sale_date: string;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(2)
    @Type(() => Images)
    public images: Images[];

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => VariantValue)
    public variant_value: VariantValue[];
    is_default: boolean;
}

class VariantObject {
    @IsNumber()
    @IsNotEmpty({ message: 'id is required in variant array' })
    public id: number;

    @IsString()
    @IsNotEmpty({ message: 'value is required in variant array' })
    public value: string;
}

export class EditProductRequest {
    @IsNotEmpty({ message: 'productId is required' })
    public productId: number;

    @IsNotEmpty({ message: 'vendorId is required' })
    public vendorId: number;

    @IsNotEmpty({ message: 'p_name is required' })
    public p_name: string;

    @IsNotEmpty({ message: 'brandId is required' })
    @IsNumber()
    public brandId: number;

    @IsNotEmpty({ message: 'long_desc is required' })
    public long_desc: string;

    public short_desc: string;

    @IsArray()
    public bulletPoints: string[];

    // @IsNotEmpty({ message: 'moreInformation is required' })
    public moreInformation: string;

    @IsNotEmpty({ message: 'desc_editor_design is required' })
    public desc_editor_design: string;

    @IsNotEmpty({ message: 'return_days is required' })
    @IsNumber()
    public return_days: number;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => ProductShipping)
    public shipping: ProductShipping[];

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => VariantInfo)
    public variants_info: VariantInfo[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantObject)
    public variants: VariantObject[];

    // @IsNotEmpty({ message: 'slug is required' })
    @IsString()
    @IsOptional()
    public slug: string;

    public tax_class_handling: string;
    public sizeChartImage: string;

    @IsOptional()
    @IsNumber()
    public fakeOrders: number;


    @IsOptional()
    @IsString()
    public title: string;

    @IsOptional()
    @IsString()
    public keyword: string;

    @IsOptional()
    @IsString()
    public description: string;

    // @IsNotEmpty({ message: 'relatedVariantIds array is required' })
    // @IsArray()
    // @IsNumber({}, { each: true })
    // @ArrayMinSize(1)
    public relatedVariantIds: number[];

    @IsArray()
    @ArrayMinSize(1)
    public warrantySettings: any[];
}