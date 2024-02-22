declare class CategorySchema {
    id: number;
    parentInt: number;
    sortOrder: number;
    urlKey: string;
    image: string;
    icon: string;
    siteId: number;
    catId: number;
    showInMenu: number;
    langId: number;
    name: string;
    metaTitle: string;
    metaKeyword: string;
    metaDescription: string;
    path: number[];
}
export declare class CategoryInsertScriptRequest {
    categories: CategorySchema[];
}
declare class BrandSchema {
    id: number;
    name: string;
    image: string;
    slug: string;
    siteId: number;
    brandId: number;
    langId: number;
    metaTitle: string;
    metaKeyword: string;
    metaDescription: string;
    categories: number[];
}
export declare class BrandsInsertScriptRequest {
    brands: BrandSchema[];
}
declare class UserSchema {
    id: number;
    siteId: number;
    typeId: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: number;
    password: string;
}
export declare class UserInsertScriptRequest {
    users: UserSchema[];
}
declare class OrderSchema {
    orderId: number;
    userId: number;
    siteId: number;
    countryId: number;
    stateId: number;
    cityId: number;
    name: string;
    lineAddress1: string;
    lineAddress2: string;
    lineAddress3: string;
    zipcode: string;
    addrType: string;
    statusId: number;
    orderNo: string;
    totalAmount: string;
    paymentMethodId: number;
    paymentStatus: number;
    comments: string;
    coupon: string;
    discount: string;
    createdAt: string;
    updatedAt: string;
    invoice: string;
    trackingSlip: string;
    shippingCharges: string;
}
export declare class OrdersInsertScriptRequest {
    orders: OrderSchema[];
}
export {};
