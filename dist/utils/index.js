"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryCode = exports.productSlug = exports.capatilize = exports.getOsPath = exports.getOsPaths = exports.getPaths = exports.getPath = exports.getOsEnvArray = exports.toBool = exports.toNumber = exports.getOsEnvOptional = exports.normalizePort = exports.getOsEnv = exports.comparePassword = exports.hashPassword = exports.attributeType = exports.ProductStatusEnum = exports.Roles = exports.LoginTypes = exports.UserTypes = exports.CustomStatusCodes = exports.todayDate = exports.validateEmailRegex = exports.validatePhoneNumber = exports.IndiaPhoneNumberlRegex = exports.PakistanPhoneNumberlRegex = exports.SitesEnum = exports.translate = exports.intimationEmailSmsOutForDelivery = exports.intimationEmailSmsReachedAtDestinationHub = exports.intimationEmailSmsOnDelivery = exports.intimationEmailSmsOnShipment = exports.generatePDFFileWithS3 = exports.uploadFileS3 = exports.statusIdObject = exports.bdCronStatuses = exports.SrWebHookOrderStatuses = exports.ShippingOption = exports.CourierServiceLogStatuses = exports.ShipmentType = exports.OrderStatusEnum = exports.AppLevelDateTimeFormat = void 0;
const axios_1 = require("axios");
const FormData = require("form-data");
const env_config_1 = require("../config/env.config");
const path_1 = require("path");
const bcrypt = require("bcrypt");
const moment_1 = require("moment");
exports.AppLevelDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum[OrderStatusEnum["All"] = 0] = "All";
    OrderStatusEnum[OrderStatusEnum["Pending"] = 1] = "Pending";
    OrderStatusEnum[OrderStatusEnum["Placed"] = 2] = "Placed";
    OrderStatusEnum[OrderStatusEnum["PackingInProgress"] = 3] = "PackingInProgress";
    OrderStatusEnum[OrderStatusEnum["Shipped"] = 4] = "Shipped";
    OrderStatusEnum[OrderStatusEnum["Delivered"] = 5] = "Delivered";
    OrderStatusEnum[OrderStatusEnum["CancellationPending"] = 6] = "CancellationPending";
    OrderStatusEnum[OrderStatusEnum["Cancelled"] = 7] = "Cancelled";
    OrderStatusEnum[OrderStatusEnum["ReturnPending"] = 8] = "ReturnPending";
    OrderStatusEnum[OrderStatusEnum["Returned"] = 9] = "Returned";
    OrderStatusEnum[OrderStatusEnum["ReturnRequestApproved"] = 10] = "ReturnRequestApproved";
    OrderStatusEnum[OrderStatusEnum["WayBillGemerated"] = 11] = "WayBillGemerated";
    OrderStatusEnum[OrderStatusEnum["ReturnShipment"] = 12] = "ReturnShipment";
    OrderStatusEnum[OrderStatusEnum["Undelivered"] = 13] = "Undelivered";
    OrderStatusEnum[OrderStatusEnum["ReturnInitiated"] = 14] = "ReturnInitiated";
    OrderStatusEnum[OrderStatusEnum["ReturnInTransit"] = 15] = "ReturnInTransit";
    OrderStatusEnum[OrderStatusEnum["ReturnDelivered"] = 16] = "ReturnDelivered";
    OrderStatusEnum[OrderStatusEnum["RTOInitiated"] = 17] = "RTOInitiated";
    OrderStatusEnum[OrderStatusEnum["RTOInTransit"] = 18] = "RTOInTransit";
    OrderStatusEnum[OrderStatusEnum["RTODelivered"] = 19] = "RTODelivered";
})(OrderStatusEnum || (exports.OrderStatusEnum = OrderStatusEnum = {}));
var ShipmentType;
(function (ShipmentType) {
    ShipmentType["INPROGRESS"] = "Inprogress";
    ShipmentType["PICKUP"] = "pickup";
    ShipmentType["DROP"] = "drop";
    ShipmentType["SHIPPED"] = "Shipped";
    ShipmentType["DELIVERED"] = "Delivered";
})(ShipmentType || (exports.ShipmentType = ShipmentType = {}));
var CourierServiceLogStatuses;
(function (CourierServiceLogStatuses) {
    CourierServiceLogStatuses["INPROGRESS"] = "Inprogress";
    CourierServiceLogStatuses["SHIPPED"] = "Shipped";
    CourierServiceLogStatuses["DELIVERED"] = "Delivered";
    CourierServiceLogStatuses["UNDELIVERED"] = "Undelivered";
    CourierServiceLogStatuses["RETURN_INITIATED"] = "ReturnInitiated";
    CourierServiceLogStatuses["RETURN_IN_TRANSIT"] = "ReturnInTransit";
    CourierServiceLogStatuses["RETURN_DELIVERED"] = "ReturnDelivered";
    CourierServiceLogStatuses["RTO_INITIATED"] = "RTOInitiated";
    CourierServiceLogStatuses["RTO_IN_TRANSIT"] = "RTOInTransit";
    CourierServiceLogStatuses["RTO_DELIVERED"] = "RTODelivered";
    CourierServiceLogStatuses["Cancelled"] = "Cancelled";
})(CourierServiceLogStatuses || (exports.CourierServiceLogStatuses = CourierServiceLogStatuses = {}));
var ShippingOption;
(function (ShippingOption) {
    ShippingOption["STANDARD"] = "standard";
    ShippingOption["EXPRESS"] = "express";
    ShippingOption["SAMEDAY"] = "sameday";
})(ShippingOption || (exports.ShippingOption = ShippingOption = {}));
var SrWebHookOrderStatuses;
(function (SrWebHookOrderStatuses) {
    SrWebHookOrderStatuses["PICKED_UP"] = "PICKED UP";
    SrWebHookOrderStatuses["DELIVERED"] = "DELIVERED";
    SrWebHookOrderStatuses["UNDELIVERED"] = "UNDELIVERED";
    SrWebHookOrderStatuses["RETURN_INITIATED"] = "RETURN INITIATED";
    SrWebHookOrderStatuses["RETURN_IN_TRANSIT"] = "RETURN IN TRANSIT";
    SrWebHookOrderStatuses["RETURN_DELIVERED"] = "RETURN DELIVERED";
    SrWebHookOrderStatuses["RTO_INITIATED"] = "RTO INITIATED";
    SrWebHookOrderStatuses["RTO_IN_TRANSIT"] = "RTO IN TRANSIT";
    SrWebHookOrderStatuses["RTO_DELIVERED"] = "RTO DELIVERED";
    SrWebHookOrderStatuses["REACHED_AT_DESTINATION_HUB"] = "REACHED AT DESTINATION HUB";
    SrWebHookOrderStatuses["OUT_FOR_DELIVERY"] = "OUT FOR DELIVERY";
})(SrWebHookOrderStatuses || (exports.SrWebHookOrderStatuses = SrWebHookOrderStatuses = {}));
var bdCronStatuses;
(function (bdCronStatuses) {
    bdCronStatuses["SHIPMENT_PICKED_UP"] = "SHIPMENT PICKED UP";
    bdCronStatuses["SHIPMENT_DELIVERED"] = "SHIPMENT DELIVERED";
    bdCronStatuses["CONSIGNEE_REFUSED_TO_ACCEPT"] = "CONSIGNEE REFUSED TO ACCEPT";
    bdCronStatuses["UNDELIVERED_SHIPMENT_HELD_AT_LOCATION"] = "UNDELIVERED SHIPMENT HELD AT LOCATION";
    bdCronStatuses["RETURNED_TO_ORIGIN_AT_SHIPPERS_REQUEST"] = "RETURNED TO ORIGIN AT SHIPPER'S REQUEST";
    bdCronStatuses["CONSIGNEE_OUT_OF_STATION"] = "CONSIGNEE OUT OF STATION";
    bdCronStatuses["SHIPPER_INSTRUCTED_TO_RTO_THE_SHIPMENT"] = "SHIPPER INSTRUCTED TO RTO THE SHIPMENT";
    bdCronStatuses["SHIPMENT_OUT_FOR_DELIVERY"] = "SHIPMENT OUT FOR DELIVERY";
    bdCronStatuses["SHIPMENT_ARRIVED_AT_HUB"] = "SHIPMENT ARRIVED AT HUB";
})(bdCronStatuses || (exports.bdCronStatuses = bdCronStatuses = {}));
exports.statusIdObject = {
    4: CourierServiceLogStatuses.SHIPPED,
    5: CourierServiceLogStatuses.DELIVERED,
    14: CourierServiceLogStatuses.RETURN_INITIATED,
    15: CourierServiceLogStatuses.RETURN_IN_TRANSIT,
    16: CourierServiceLogStatuses.RETURN_DELIVERED,
    17: CourierServiceLogStatuses.RTO_INITIATED,
    18: CourierServiceLogStatuses.RETURN_IN_TRANSIT,
    19: CourierServiceLogStatuses.RTO_DELIVERED,
};
const uploadFileS3 = async (file, filePath, fileName) => {
    const formData = new FormData();
    formData.append('file', file, {
        filename: 'file.pdf',
        contentType: 'application/pdf',
    });
    formData.append('filePath', filePath);
    formData.append('fileName', fileName);
    try {
        const axiosResponse = await axios_1.default.post(`${env_config_1.envConfig.sellerAPiBaseUrl}/api/buyer/media/upload-multipart-file`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        return axiosResponse.data.data.data.Location;
    }
    catch (error) {
        return null;
    }
};
exports.uploadFileS3 = uploadFileS3;
const generatePDFFileWithS3 = async (contentString, options, filePath, fileName) => {
    const payload = {
        contentString,
        options,
        filePath,
        fileName,
    };
    try {
        const axiosResponse = await axios_1.default.post(`${env_config_1.envConfig.sellerAPiBaseUrl}/api/buyer/media/generate-pdf`, payload);
        return axiosResponse.data.data.data.Location;
    }
    catch (error) {
        console.log('error s3', error);
        return null;
    }
};
exports.generatePDFFileWithS3 = generatePDFFileWithS3;
const intimationEmailSmsOnShipment = async ({ orderId, siteId, vendorId, subOrderIds, userId, trackingNo, courierName, }) => {
    const payload = {
        orderId,
        siteId,
        vendorId,
        subOrderIds,
        userId,
        trackingNo,
        courierName,
    };
    try {
        const axiosResponse = await axios_1.default.post(`${env_config_1.envConfig.sellerAPiBaseUrl}/api/seller/order/intimate-buye-on-shipment`, payload);
        return axiosResponse.data;
    }
    catch (error) {
        console.log('error s3', error);
        return null;
    }
};
exports.intimationEmailSmsOnShipment = intimationEmailSmsOnShipment;
const intimationEmailSmsOnDelivery = async ({ orderId, siteId, vendorId, subOrderIds, userId, trackingNo, courierName, subOrders, }) => {
    const payload = {
        orderId,
        siteId,
        vendorId,
        subOrderIds,
        userId,
        trackingNo,
        courierName,
        subOrders,
    };
    try {
        const axiosResponse = await axios_1.default.post(`${env_config_1.envConfig.sellerAPiBaseUrl}/api/seller/order/intimate-on-delivery`, payload);
        return axiosResponse.data;
    }
    catch (error) {
        console.log('error s3', error);
        return null;
    }
};
exports.intimationEmailSmsOnDelivery = intimationEmailSmsOnDelivery;
const intimationEmailSmsReachedAtDestinationHub = async ({ orderId, siteId, vendorId, subOrderIds, userId, trackingNo, courierName, }) => {
    const payload = {
        orderId,
        siteId,
        vendorId,
        subOrderIds,
        userId,
        trackingNo,
        courierName,
    };
    try {
        const axiosResponse = await axios_1.default.post(`${env_config_1.envConfig.sellerAPiBaseUrl}/api/seller/order/intimate-buyer-on-reached-destination-hub`, payload);
        return axiosResponse.data;
    }
    catch (error) {
        console.log('error s3', error);
        return null;
    }
};
exports.intimationEmailSmsReachedAtDestinationHub = intimationEmailSmsReachedAtDestinationHub;
const intimationEmailSmsOutForDelivery = async ({ orderId, siteId, vendorId, subOrderIds, userId, trackingNo, courierName, }) => {
    const payload = {
        orderId,
        siteId,
        vendorId,
        subOrderIds,
        userId,
        trackingNo,
        courierName,
    };
    try {
        const axiosResponse = await axios_1.default.post(`${env_config_1.envConfig.sellerAPiBaseUrl}/api/seller/order/intimate-buyer-on-out-for-delivery`, payload);
        return axiosResponse.data;
    }
    catch (error) {
        console.log('error s3', error);
        return null;
    }
};
exports.intimationEmailSmsOutForDelivery = intimationEmailSmsOutForDelivery;
function amountToWords(num) {
    const single = [
        'Zero',
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
    ];
    const double = [
        'Ten',
        'Eleven',
        'Twelve',
        'Thirteen',
        'Fourteen',
        'Fifteen',
        'Sixteen',
        'Seventeen',
        'Eighteen',
        'Nineteen',
    ];
    const tens = [
        '',
        'Ten',
        'Twenty',
        'Thirty',
        'Forty',
        'Fifty',
        'Sixty',
        'Seventy',
        'Eighty',
        'Ninety',
    ];
    const formatTenth = (digit, prev) => {
        return 0 == digit ? '' : ' ' + (1 == digit ? double[prev] : tens[digit]);
    };
    const formatOther = (digit, next, denom) => {
        return ((0 != digit && 1 != next ? ' ' + single[digit] : '') +
            (0 != next || digit > 0 ? ' ' + denom : ''));
    };
    let res = '';
    let index = 0;
    let digit = 0;
    let next = 0;
    const words = [];
    if (((num += ''), isNaN(parseInt(num)))) {
        res = '';
    }
    else if (parseInt(num) > 0 && num.length <= 10) {
        for (index = num.length - 1; index >= 0; index--)
            switch (((digit = num[index] - 0),
                (next = index > 0 ? num[index - 1] - 0 : 0),
                num.length - index - 1)) {
                case 0:
                    words.push(formatOther(digit, next, ''));
                    break;
                case 1:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 2:
                    words.push(0 != digit
                        ? ' ' +
                            single[digit] +
                            ' Hundred' +
                            (0 != num[index + 1] && 0 != num[index + 2] ? ' and' : '')
                        : '');
                    break;
                case 3:
                    words.push(formatOther(digit, next, 'Thousand'));
                    break;
                case 4:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 5:
                    words.push(formatOther(digit, next, 'Lakh'));
                    break;
                case 6:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 7:
                    words.push(formatOther(digit, next, 'Crore'));
                    break;
                case 8:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 9:
                    words.push(0 != digit
                        ? ' ' +
                            single[digit] +
                            ' Hundred' +
                            (0 != num[index + 1] || 0 != num[index + 2]
                                ? ' and'
                                : ' Crore')
                        : '');
            }
        res = words.reverse().join('');
    }
    else
        res = '';
    return res;
}
function translate(price) {
    const priceStr = String(price);
    if (priceStr.includes('.')) {
        const nums = priceStr.split('.');
        if (nums[1] == '00') {
            return amountToWords(nums[0]) + ' Only';
        }
        else {
            const wholeStr = amountToWords(nums[0]);
            const decimalStr = amountToWords(nums[1]) + ' Paise Only';
            return wholeStr + ' And ' + decimalStr;
        }
    }
    return amountToWords(price) + ' Only';
}
exports.translate = translate;
var SitesEnum;
(function (SitesEnum) {
    SitesEnum["Pakistan"] = "1";
    SitesEnum["India"] = "2";
    SitesEnum["US"] = "3";
})(SitesEnum || (exports.SitesEnum = SitesEnum = {}));
exports.PakistanPhoneNumberlRegex = /^((\+92)?(0)?)(3)([0-9]{9})$/;
exports.IndiaPhoneNumberlRegex = /^((\+91)?(0)?)(9)([0-9]{9})$/gm;
const validatePhoneNumber = (siteId, phoneNumber) => {
    let status = false;
    switch (siteId) {
        case SitesEnum.Pakistan:
            status = exports.PakistanPhoneNumberlRegex.test(phoneNumber);
            break;
        case SitesEnum.India:
            status = exports.IndiaPhoneNumberlRegex.test(phoneNumber);
            break;
        case SitesEnum.US:
            status = false;
            break;
        default:
            status;
    }
    return status;
};
exports.validatePhoneNumber = validatePhoneNumber;
exports.validateEmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const todayDate = () => {
    const a = (0, moment_1.default)().format('YYYY-MM-DD');
    return a;
};
exports.todayDate = todayDate;
var CustomStatusCodes;
(function (CustomStatusCodes) {
    CustomStatusCodes[CustomStatusCodes["EmailOtpRequired"] = 11] = "EmailOtpRequired";
    CustomStatusCodes[CustomStatusCodes["SMSOtpRequired"] = 12] = "SMSOtpRequired";
    CustomStatusCodes[CustomStatusCodes["SMSAndEmailOtpCodeRequired"] = 13] = "SMSAndEmailOtpCodeRequired";
})(CustomStatusCodes || (exports.CustomStatusCodes = CustomStatusCodes = {}));
var UserTypes;
(function (UserTypes) {
    UserTypes["Admin"] = "A";
    UserTypes["Buyer"] = "B";
    UserTypes["Seller"] = "S";
    UserTypes["SuperAdmin"] = "U";
})(UserTypes || (exports.UserTypes = UserTypes = {}));
var LoginTypes;
(function (LoginTypes) {
    LoginTypes["FACEBOOK"] = "Facebook";
    LoginTypes["GMAIL"] = "Gmail";
    LoginTypes["NORMAL"] = "Normal";
})(LoginTypes || (exports.LoginTypes = LoginTypes = {}));
var Roles;
(function (Roles) {
    Roles[Roles["Buyer"] = 1] = "Buyer";
    Roles[Roles["Seller"] = 2] = "Seller";
})(Roles || (exports.Roles = Roles = {}));
var ProductStatusEnum;
(function (ProductStatusEnum) {
    ProductStatusEnum[ProductStatusEnum["All"] = 0] = "All";
    ProductStatusEnum[ProductStatusEnum["Active"] = 1] = "Active";
    ProductStatusEnum[ProductStatusEnum["InActive"] = 2] = "InActive";
    ProductStatusEnum[ProductStatusEnum["Draft"] = 3] = "Draft";
    ProductStatusEnum[ProductStatusEnum["Approved"] = 4] = "Approved";
    ProductStatusEnum[ProductStatusEnum["Rejected"] = 5] = "Rejected";
    ProductStatusEnum[ProductStatusEnum["ApprovalPending"] = 6] = "ApprovalPending";
    ProductStatusEnum[ProductStatusEnum["ImprovementsRequired"] = 7] = "ImprovementsRequired";
})(ProductStatusEnum || (exports.ProductStatusEnum = ProductStatusEnum = {}));
var attributeType;
(function (attributeType) {
    attributeType["DROPDOWN"] = "dropdown";
    attributeType["TEXT"] = "input_text";
    attributeType["NUMBER"] = "input_number";
    attributeType["DECIMAL"] = "input_decimal";
    attributeType["CALENDER"] = "calender";
})(attributeType || (exports.attributeType = attributeType = {}));
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
exports.hashPassword = hashPassword;
const comparePassword = async (userPassword, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, userPassword, (err, res) => {
            resolve(res === true);
        });
    });
};
exports.comparePassword = comparePassword;
function getOsEnv(key) {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    return process.env[key];
}
exports.getOsEnv = getOsEnv;
function normalizePort(port) {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) {
        return port;
    }
    if (parsedPort >= 0) {
        return parsedPort;
    }
    return false;
}
exports.normalizePort = normalizePort;
function getOsEnvOptional(key) {
    return process.env[key];
}
exports.getOsEnvOptional = getOsEnvOptional;
function toNumber(value) {
    return parseInt(value, 10);
}
exports.toNumber = toNumber;
function toBool(value) {
    return value === 'true';
}
exports.toBool = toBool;
function getOsEnvArray(key, delimiter = ',') {
    return process.env[key] && process.env[key].split(delimiter) || [];
}
exports.getOsEnvArray = getOsEnvArray;
function getPath(path) {
    return (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'qa' || process.env.NODE_ENV === 'development')
        ? (0, path_1.join)(process.cwd(), path.replace('src/', 'dist/').slice(0, -3) + '.js')
        : (0, path_1.join)(process.cwd(), path);
}
exports.getPath = getPath;
function getPaths(paths) {
    return paths.map(p => getPath(p));
}
exports.getPaths = getPaths;
function getOsPaths(key) {
    return getPaths(getOsEnvArray(key));
}
exports.getOsPaths = getOsPaths;
function getOsPath(key) {
    return getPath(getOsEnv(key));
}
exports.getOsPath = getOsPath;
function capatilize(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
exports.capatilize = capatilize;
function productSlug(siteId, productId) {
    const productIdLength = productId.toString().length;
    const countryCode = getCountryCode(siteId);
    if (productIdLength >= 7) {
        return `CM${countryCode}${productId}`;
    }
    for (let i = 0; i < 7 - productIdLength; i++) {
        productId = `0${productId}`;
    }
    return `CM${countryCode}${productId}`;
}
exports.productSlug = productSlug;
function getCountryCode(siteId) {
    let countryCode = '01';
    switch (siteId.toString()) {
        case SitesEnum.Pakistan:
            countryCode = '92';
            break;
        case SitesEnum.India:
            countryCode = '91';
            break;
        case SitesEnum.US:
            countryCode = '01';
            break;
        default:
            countryCode;
    }
    return countryCode;
}
exports.getCountryCode = getCountryCode;
//# sourceMappingURL=index.js.map