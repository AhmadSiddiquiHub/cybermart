export declare const AppLevelDateTimeFormat = "YYYY-MM-DD HH:mm:ss";
export declare enum OrderStatusEnum {
    All = 0,
    Pending = 1,
    Placed = 2,
    PackingInProgress = 3,
    Shipped = 4,
    Delivered = 5,
    CancellationPending = 6,
    Cancelled = 7,
    ReturnPending = 8,
    Returned = 9,
    ReturnRequestApproved = 10,
    WayBillGemerated = 11,
    ReturnShipment = 12,
    Undelivered = 13,
    ReturnInitiated = 14,
    ReturnInTransit = 15,
    ReturnDelivered = 16,
    RTOInitiated = 17,
    RTOInTransit = 18,
    RTODelivered = 19
}
export declare enum ShipmentType {
    INPROGRESS = "Inprogress",
    PICKUP = "pickup",
    DROP = "drop",
    SHIPPED = "Shipped",
    DELIVERED = "Delivered"
}
export declare enum CourierServiceLogStatuses {
    INPROGRESS = "Inprogress",
    SHIPPED = "Shipped",
    DELIVERED = "Delivered",
    UNDELIVERED = "Undelivered",
    RETURN_INITIATED = "ReturnInitiated",
    RETURN_IN_TRANSIT = "ReturnInTransit",
    RETURN_DELIVERED = "ReturnDelivered",
    RTO_INITIATED = "RTOInitiated",
    RTO_IN_TRANSIT = "RTOInTransit",
    RTO_DELIVERED = "RTODelivered",
    Cancelled = "Cancelled"
}
export declare enum ShippingOption {
    STANDARD = "standard",
    EXPRESS = "express",
    SAMEDAY = "sameday"
}
export declare enum SrWebHookOrderStatuses {
    PICKED_UP = "PICKED UP",
    DELIVERED = "DELIVERED",
    UNDELIVERED = "UNDELIVERED",
    RETURN_INITIATED = "RETURN INITIATED",
    RETURN_IN_TRANSIT = "RETURN IN TRANSIT",
    RETURN_DELIVERED = "RETURN DELIVERED",
    RTO_INITIATED = "RTO INITIATED",
    RTO_IN_TRANSIT = "RTO IN TRANSIT",
    RTO_DELIVERED = "RTO DELIVERED",
    REACHED_AT_DESTINATION_HUB = "REACHED AT DESTINATION HUB",
    OUT_FOR_DELIVERY = "OUT FOR DELIVERY"
}
export declare enum bdCronStatuses {
    SHIPMENT_PICKED_UP = "SHIPMENT PICKED UP",
    SHIPMENT_DELIVERED = "SHIPMENT DELIVERED",
    CONSIGNEE_REFUSED_TO_ACCEPT = "CONSIGNEE REFUSED TO ACCEPT",
    UNDELIVERED_SHIPMENT_HELD_AT_LOCATION = "UNDELIVERED SHIPMENT HELD AT LOCATION",
    RETURNED_TO_ORIGIN_AT_SHIPPERS_REQUEST = "RETURNED TO ORIGIN AT SHIPPER'S REQUEST",
    CONSIGNEE_OUT_OF_STATION = "CONSIGNEE OUT OF STATION",
    SHIPPER_INSTRUCTED_TO_RTO_THE_SHIPMENT = "SHIPPER INSTRUCTED TO RTO THE SHIPMENT",
    SHIPMENT_OUT_FOR_DELIVERY = "SHIPMENT OUT FOR DELIVERY",
    SHIPMENT_ARRIVED_AT_HUB = "SHIPMENT ARRIVED AT HUB"
}
export declare const statusIdObject: {
    4: CourierServiceLogStatuses;
    5: CourierServiceLogStatuses;
    14: CourierServiceLogStatuses;
    15: CourierServiceLogStatuses;
    16: CourierServiceLogStatuses;
    17: CourierServiceLogStatuses;
    18: CourierServiceLogStatuses;
    19: CourierServiceLogStatuses;
};
export declare const uploadFileS3: (file: any, filePath: string, fileName: string) => Promise<any>;
export declare const generatePDFFileWithS3: (contentString: any, options: any, filePath: string, fileName: string) => Promise<any>;
export declare const intimationEmailSmsOnShipment: ({ orderId, siteId, vendorId, subOrderIds, userId, trackingNo, courierName, }: {
    orderId: any;
    siteId: any;
    vendorId: any;
    subOrderIds: any;
    userId: any;
    trackingNo: any;
    courierName: any;
}) => Promise<any>;
export declare const intimationEmailSmsOnDelivery: ({ orderId, siteId, vendorId, subOrderIds, userId, trackingNo, courierName, subOrders, }: {
    orderId: any;
    siteId: any;
    vendorId: any;
    subOrderIds: any;
    userId: any;
    trackingNo: any;
    courierName: any;
    subOrders: any;
}) => Promise<any>;
export declare const intimationEmailSmsReachedAtDestinationHub: ({ orderId, siteId, vendorId, subOrderIds, userId, trackingNo, courierName, }: {
    orderId: any;
    siteId: any;
    vendorId: any;
    subOrderIds: any;
    userId: any;
    trackingNo: any;
    courierName: any;
}) => Promise<any>;
export declare const intimationEmailSmsOutForDelivery: ({ orderId, siteId, vendorId, subOrderIds, userId, trackingNo, courierName, }: {
    orderId: any;
    siteId: any;
    vendorId: any;
    subOrderIds: any;
    userId: any;
    trackingNo: any;
    courierName: any;
}) => Promise<any>;
export declare function translate(price: any): string;
export declare enum SitesEnum {
    Pakistan = "1",
    India = "2",
    US = "3"
}
export declare const PakistanPhoneNumberlRegex: RegExp;
export declare const IndiaPhoneNumberlRegex: RegExp;
export declare const validatePhoneNumber: (siteId: any, phoneNumber: any) => boolean;
export declare const validateEmailRegex: RegExp;
export declare const todayDate: () => string;
export declare enum CustomStatusCodes {
    EmailOtpRequired = 11,
    SMSOtpRequired = 12,
    SMSAndEmailOtpCodeRequired = 13
}
export declare enum UserTypes {
    Admin = "A",
    Buyer = "B",
    Seller = "S",
    SuperAdmin = "U"
}
export declare enum LoginTypes {
    FACEBOOK = "Facebook",
    GMAIL = "Gmail",
    NORMAL = "Normal"
}
export declare enum Roles {
    Buyer = 1,
    Seller = 2
}
export declare enum ProductStatusEnum {
    All = 0,
    Active = 1,
    InActive = 2,
    Draft = 3,
    Approved = 4,
    Rejected = 5,
    ApprovalPending = 6,
    ImprovementsRequired = 7
}
export declare enum attributeType {
    DROPDOWN = "dropdown",
    TEXT = "input_text",
    NUMBER = "input_number",
    DECIMAL = "input_decimal",
    CALENDER = "calender"
}
export declare const hashPassword: (password: any) => Promise<string>;
export declare const comparePassword: (userPassword: any, password: string) => Promise<boolean>;
export declare function getOsEnv(key: string): string;
export declare function normalizePort(port: string): number | string | boolean;
export declare function getOsEnvOptional(key: string): string | undefined;
export declare function toNumber(value: string): number;
export declare function toBool(value: string): boolean;
export declare function getOsEnvArray(key: string, delimiter?: string): string[];
export declare function getPath(path: string): string;
export declare function getPaths(paths: string[]): string[];
export declare function getOsPaths(key: string): string[];
export declare function getOsPath(key: string): string;
export declare function capatilize(str: any): any;
export declare function productSlug(siteId: any, productId: any): string;
export declare function getCountryCode(siteId: any): string;
