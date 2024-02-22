declare class AdditionalInfoObject {
    categoryId: number;
    productAttributesId: number;
    optionValue: string;
}
declare class VariantObject {
    id: number;
    value: string;
}
declare class ProductShipping {
    days: number;
    charges: number;
    type: string;
    pincodes: number[];
}
declare class Images {
    is_default: number;
    variantId: number;
    image: string;
}
declare class VariantValue {
    name: string;
    value: string;
}
export declare class otherSellerListing {
    limit: number;
    offset: number;
}
declare class VariantInfo {
    sku: string;
    price: string;
    quantity: number;
    condition: string;
    sale_price: string;
    showSaleEndDate: number;
    start_sale_date: string;
    end_sale_date: string;
    images: Images[];
    variant_value: VariantValue[];
    is_default: boolean;
}
export declare class CreateProductRequest {
    p_name: string;
    brandId: number;
    long_desc: string;
    desc_editor_design: string;
    moreInformation: string;
    search_keywords: string[];
    bulletPoints: string[];
    categories: number[];
    shipping: ProductShipping[];
    additionalInfo: AdditionalInfoObject[];
    variants: VariantObject[];
    variants_info: VariantInfo[];
    return_days: number;
    slug: string;
    tax_class_handling: string;
    sizeChartImage: string;
    fakeOrders: number;
    title: string;
    keyword: string;
    description: string;
    relatedVariantIds: number[];
    warrantySettings: any[];
}
export declare class GetQuestionListRequest {
    limit: number;
    offset: number;
    page: number;
    keyword: any;
}
export declare class AddAnswerRequest {
    productQuestionId: number;
    answer: string;
}
export declare class activeDeactiveRequestV1 {
    productId: number;
    productVariantId: number;
    viewType: number;
}
export declare class activeDeactiveRequest {
    productId: number;
    productVariantId: number;
}
export declare class UpdateProductAvailabilityForAllVariantsRequest {
    productId: number;
}
export {};
