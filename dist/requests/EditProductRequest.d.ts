declare class ProductShipping {
    days: number;
    charges: number;
    type: string;
    pincodes: number[];
}
declare class VariantValue {
    name: string;
    value: string;
}
declare class Images {
    is_default: number;
    variantId: number;
    image: string;
}
declare class VariantInfo {
    vendorProductVariantId: number;
    sku: string;
    price: string;
    quantity: number;
    condition: string;
    productVariantId: number;
    sale_price: string;
    showSaleEndDate: number;
    start_sale_date: string;
    end_sale_date: string;
    images: Images[];
    variant_value: VariantValue[];
    is_default: boolean;
}
declare class VariantObject {
    id: number;
    value: string;
}
export declare class EditProductRequest {
    productId: number;
    vendorId: number;
    p_name: string;
    brandId: number;
    long_desc: string;
    short_desc: string;
    bulletPoints: string[];
    moreInformation: string;
    desc_editor_design: string;
    return_days: number;
    shipping: ProductShipping[];
    variants_info: VariantInfo[];
    variants: VariantObject[];
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
export {};
