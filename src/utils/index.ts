/* eslint-disable prettier/prettier */
import axios from 'axios';
import * as FormData from 'form-data';
import { envConfig } from 'src/config/env.config';
import { join } from 'path';
import * as bcrypt from 'bcrypt';
import moment from 'moment';

export const AppLevelDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

export enum OrderStatusEnum {
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
  RTODelivered = 19,
}
export enum ShipmentType {
  INPROGRESS = 'Inprogress',
  PICKUP = 'pickup',
  DROP = 'drop',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
}

export enum CourierServiceLogStatuses {
  INPROGRESS = 'Inprogress',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  UNDELIVERED = 'Undelivered',
  RETURN_INITIATED = 'ReturnInitiated',
  RETURN_IN_TRANSIT = 'ReturnInTransit',
  RETURN_DELIVERED = 'ReturnDelivered',
  RTO_INITIATED = 'RTOInitiated',
  RTO_IN_TRANSIT = 'RTOInTransit',
  RTO_DELIVERED = 'RTODelivered',
  Cancelled = 'Cancelled',
}

export enum ShippingOption {
  STANDARD = 'standard',
  EXPRESS = 'express',
  SAMEDAY = 'sameday',
}

export enum SrWebHookOrderStatuses {
  PICKED_UP = 'PICKED UP',
  DELIVERED = 'DELIVERED',
  UNDELIVERED = 'UNDELIVERED',
  RETURN_INITIATED = 'RETURN INITIATED',
  RETURN_IN_TRANSIT = 'RETURN IN TRANSIT',
  RETURN_DELIVERED = 'RETURN DELIVERED',
  RTO_INITIATED = 'RTO INITIATED',
  RTO_IN_TRANSIT = 'RTO IN TRANSIT',
  RTO_DELIVERED = 'RTO DELIVERED',
  REACHED_AT_DESTINATION_HUB = 'REACHED AT DESTINATION HUB',
  OUT_FOR_DELIVERY = 'OUT FOR DELIVERY',
}

export enum bdCronStatuses {
  SHIPMENT_PICKED_UP = 'SHIPMENT PICKED UP',
  SHIPMENT_DELIVERED = 'SHIPMENT DELIVERED',
  CONSIGNEE_REFUSED_TO_ACCEPT = 'CONSIGNEE REFUSED TO ACCEPT',
  UNDELIVERED_SHIPMENT_HELD_AT_LOCATION = 'UNDELIVERED SHIPMENT HELD AT LOCATION',
  RETURNED_TO_ORIGIN_AT_SHIPPERS_REQUEST = "RETURNED TO ORIGIN AT SHIPPER'S REQUEST",
  CONSIGNEE_OUT_OF_STATION = 'CONSIGNEE OUT OF STATION',
  SHIPPER_INSTRUCTED_TO_RTO_THE_SHIPMENT = 'SHIPPER INSTRUCTED TO RTO THE SHIPMENT',
  SHIPMENT_OUT_FOR_DELIVERY = 'SHIPMENT OUT FOR DELIVERY',
  SHIPMENT_ARRIVED_AT_HUB = 'SHIPMENT ARRIVED AT HUB',
}

export const statusIdObject = {
  4: CourierServiceLogStatuses.SHIPPED,

  5: CourierServiceLogStatuses.DELIVERED,

  14: CourierServiceLogStatuses.RETURN_INITIATED,

  15: CourierServiceLogStatuses.RETURN_IN_TRANSIT,

  16: CourierServiceLogStatuses.RETURN_DELIVERED,

  17: CourierServiceLogStatuses.RTO_INITIATED,

  18: CourierServiceLogStatuses.RETURN_IN_TRANSIT,

  19: CourierServiceLogStatuses.RTO_DELIVERED,
};

export const uploadFileS3 = async (
  file: any,
  filePath: string,
  fileName: string,
) => {
  const formData = new FormData();
  formData.append('file', file, {
    filename: 'file.pdf',
    contentType: 'application/pdf',
  });
  formData.append('filePath', filePath);
  formData.append('fileName', fileName);
  try {
    // http://localhost:4010
    // https://devsellerapi.cybermart.pk
    const axiosResponse = await axios.post(
      `${envConfig.sellerAPiBaseUrl}/api/buyer/media/upload-multipart-file`,
      formData,
      {
        headers: {
          ...formData.getHeaders(), // Include necessary headers for FormData
        },
      },
    );

    return axiosResponse.data.data.data.Location;
  } catch (error) {
    return null;
  }
};

export const generatePDFFileWithS3 = async (
  contentString: any,
  options: any,
  filePath: string,
  fileName: string,
) => {
  const payload = {
    contentString,
    options,
    filePath,
    fileName,
  };
  // https://indevsellerapi.cybermart.in
  try {
    const axiosResponse = await axios.post(
      `${envConfig.sellerAPiBaseUrl}/api/buyer/media/generate-pdf`,
      payload,
    );

    return axiosResponse.data.data.data.Location;
  } catch (error) {
    console.log('error s3', error);
    return null;
  }
};

export const intimationEmailSmsOnShipment = async ({
  orderId,
  siteId,
  vendorId,
  subOrderIds,
  userId,
  trackingNo,
  courierName,
}) => {
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
    const axiosResponse = await axios.post(
      `${envConfig.sellerAPiBaseUrl}/api/seller/order/intimate-buye-on-shipment`,
      payload,
    );
    return axiosResponse.data;
  } catch (error) {
    console.log('error s3', error);
    return null;
  }
};

export const intimationEmailSmsOnDelivery = async ({
  orderId,
  siteId,
  vendorId,
  subOrderIds,
  userId,
  trackingNo,
  courierName,
  subOrders,
}) => {
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
    const axiosResponse = await axios.post(
      `${envConfig.sellerAPiBaseUrl}/api/seller/order/intimate-on-delivery`,
      payload,
    );
    return axiosResponse.data;
  } catch (error) {
    console.log('error s3', error);
    return null;
  }
};

export const intimationEmailSmsReachedAtDestinationHub = async ({
  orderId,
  siteId,
  vendorId,
  subOrderIds,
  userId,
  trackingNo,
  courierName,
}) => {
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
    const axiosResponse = await axios.post(
      `${envConfig.sellerAPiBaseUrl}/api/seller/order/intimate-buyer-on-reached-destination-hub`,
      payload,
    );

    return axiosResponse.data;
  } catch (error) {
    console.log('error s3', error);

    return null;
  }
};

export const intimationEmailSmsOutForDelivery = async ({
  orderId,
  siteId,
  vendorId,
  subOrderIds,
  userId,
  trackingNo,
  courierName,
}) => {
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
    const axiosResponse = await axios.post(
      `${envConfig.sellerAPiBaseUrl}/api/seller/order/intimate-buyer-on-out-for-delivery`,
      payload,
    );

    return axiosResponse.data;
  } catch (error) {
    console.log('error s3', error);
    return null;
  }
};

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
    return (
      (0 != digit && 1 != next ? ' ' + single[digit] : '') +
      (0 != next || digit > 0 ? ' ' + denom : '')
    );
  };
  let res = '';
  let index = 0;
  let digit = 0;
  let next = 0;
  const words = [];
  if (((num += ''), isNaN(parseInt(num)))) {
    res = '';
  } else if (parseInt(num) > 0 && num.length <= 10) {
    for (index = num.length - 1; index >= 0; index--)
      switch (
        ((digit = num[index] - 0),
        (next = index > 0 ? num[index - 1] - 0 : 0),
        num.length - index - 1)
      ) {
        case 0:
          words.push(formatOther(digit, next, ''));
          break;
        case 1:
          words.push(formatTenth(digit, num[index + 1]));
          break;
        case 2:
          words.push(
            0 != digit
              ? ' ' +
                  single[digit] +
                  ' Hundred' +
                  (0 != num[index + 1] && 0 != num[index + 2] ? ' and' : '')
              : '',
          );
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
          words.push(
            0 != digit
              ? ' ' +
                  single[digit] +
                  ' Hundred' +
                  (0 != num[index + 1] || 0 != num[index + 2]
                    ? ' and'
                    : ' Crore')
              : '',
          );
      }
    res = words.reverse().join('');
  } else res = '';
  return res;
}
export function translate(price) {
  const priceStr = String(price);

  if (priceStr.includes('.')) {
    const nums = priceStr.split('.');
    if (nums[1] == '00') {
      return amountToWords(nums[0]) + ' Only';
    } else {
      const wholeStr = amountToWords(nums[0]);
      const decimalStr = amountToWords(nums[1]) + ' Paise Only';
      return wholeStr + ' And ' + decimalStr;
    }
  }

  return amountToWords(price) + ' Only';
}




export enum SitesEnum {
    Pakistan = '1',
    India = '2',
    US = '3',
}

// Phone Number Regex Validators
// https://github.com/fWd82/Pakistan-Mobile-Number-Validator
// ^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$
// ^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm
export const PakistanPhoneNumberlRegex = /^((\+92)?(0)?)(3)([0-9]{9})$/;
// https://stackoverflow.com/questions/18351553/regular-expression-validation-for-indian-phone-number-and-mobile-number
// For India Phone Number Regex
export const IndiaPhoneNumberlRegex = /^((\+91)?(0)?)(9)([0-9]{9})$/gm;
export const validatePhoneNumber = (siteId, phoneNumber) => {
    let status = false;
    switch(siteId) {
        case SitesEnum.Pakistan:
            status = PakistanPhoneNumberlRegex.test(phoneNumber);
            break;
        case SitesEnum.India:
            status = IndiaPhoneNumberlRegex.test(phoneNumber);
            break;
        case SitesEnum.US:
            status = false;
            break;
        default:
            status;
    }
    return status;
}
export const validateEmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const todayDate = () => {
    const a = moment().format('YYYY-MM-DD');
    return a;
}

export enum CustomStatusCodes {
    EmailOtpRequired = 11,
    SMSOtpRequired = 12,
    SMSAndEmailOtpCodeRequired = 13,
}

export enum UserTypes {
    Admin = 'A',
    Buyer = 'B',
    Seller = 'S',
    SuperAdmin = 'U',
}

export enum LoginTypes {
    FACEBOOK = 'Facebook',
    GMAIL = 'Gmail',
    NORMAL = 'Normal',
}

export enum Roles {
    Buyer = 1,
    Seller = 2,
}

export enum ProductStatusEnum {
    All = 0,
    Active = 1,
    InActive = 2,
    Draft = 3,
    Approved = 4,
    Rejected = 5,
    ApprovalPending = 6,
    ImprovementsRequired = 7,
}

export enum attributeType {
    DROPDOWN = 'dropdown',
    TEXT = 'input_text',
    NUMBER = 'input_number',
    DECIMAL= 'input_decimal',
    CALENDER= 'calender',
}

export const hashPassword = async (password: any): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (userPassword: any, password: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, userPassword, (err, res) => {
            resolve(res === true);
        });
    });
}

export function getOsEnv(key: string): string {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string;
}

export function normalizePort(port: string): number | string | boolean {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) { // named pipe
        return port;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
}

export function getOsEnvOptional(key: string): string | undefined {
    return process.env[key];
}

export function toNumber(value: string): number {
    return parseInt(value, 10);
}

export function toBool(value: string): boolean {
    return value === 'true';
}

export function getOsEnvArray(key: string, delimiter: string = ','): string[] {
    return process.env[key] && process.env[key].split(delimiter) || [];
}

export function getPath(path: string): string {
    return (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'qa' || process.env.NODE_ENV === 'development')
        ? join(process.cwd(), path.replace('src/', 'dist/').slice(0, -3) + '.js')
        : join(process.cwd(), path);
}

export function getPaths(paths: string[]): string[] {
    return paths.map(p => getPath(p));
}

export function getOsPaths(key: string): string[] {
    return getPaths(getOsEnvArray(key));
}

export function getOsPath(key: string): string {
    return getPath(getOsEnv(key));
}

export function capatilize(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  
    // For the time being, we will comment out this function instead of removing it, as it may be useful in the future.

    export function productSlug(siteId: any, productId: any): string {
        const productIdLength = productId.toString().length;
        const countryCode = getCountryCode(siteId); 
        
        if(productIdLength >= 7) {
            return `CM${countryCode}${productId}`
        }
        for (let i = 0; i < 7 - productIdLength; i++) {
            productId = `0${productId}`;
        }
        return `CM${countryCode}${productId}`;
    }

export function getCountryCode(siteId: any): string {
    let countryCode = '01';
    switch(siteId.toString()) {
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
