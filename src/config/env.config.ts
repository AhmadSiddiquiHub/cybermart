/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsNumber,
} from 'class-validator';
import { LoggerOptions } from 'typeorm';

import validateConfig from 'src/utils/validate.config';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => !envValues.APP_PORT)
  @IsString()
  APP_PORT: string;

  // DB CREDENTIALS

  @ValidateIf((envValues) => !envValues.TYPEORM_TYPE)
  @IsString()
  TYPEORM_TYPE: string;

  @ValidateIf((envValues) => !envValues.TYPEORM_HOST)
  @IsString()
  TYPEORM_HOST: string;

  @ValidateIf((envValues) => !envValues.TYPEORM_PORT)
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  TYPEORM_PORT: number;

  @ValidateIf((envValues) => !envValues.TYPEORM_USERNAME)
  @IsString()
  TYPEORM_USERNAME: string;

  @ValidateIf((envValues) => !envValues.TYPEORM_PASSWORD)
  @IsString()
  @IsOptional()
  TYPEORM_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.TYPEORM_DATABASE)
  @IsString()
  TYPEORM_DATABASE: string;

  @ValidateIf((envValues) => !envValues.TYPEORM_SYNCHRONIZE)
  @IsString()
  TYPEORM_SYNCHRONIZE: string;

  @ValidateIf((envValues) => !envValues.TYPEORM_LOGGER)
  @IsString()
  TYPEORM_LOGGER: string;

  @ValidateIf((envValues) => !envValues.TYPEORM_LOGGING)
  TYPEORM_LOGGING: LoggerOptions;

  @ValidateIf((envValues) => !envValues.TYPEORM_ACQUIRE_TIMEOUT)
  @IsInt()
  TYPEORM_ACQUIRE_TIMEOUT: number;

  @ValidateIf((envValues) => !envValues.TYPEORM_CONNECTION_TIMEOUT)
  @IsInt()
  TYPEORM_CONNECTION_TIMEOUT: number;

  //SR CRENDENTIALS

  @ValidateIf((envValues) => !envValues.SR_XAPI_KEY)
  @IsString()
  SR_XAPI_KEY: string;

  @ValidateIf((envValues) => !envValues.SR_LOGIN_EMAIL)
  @IsString()
  SR_LOGIN_EMAIL: string;

  @ValidateIf((envValues) => !envValues.SR_LOGIN_EMAIL)
  @IsString()
  SR_LOGIN_PWD: string;

  //BD CREDENTIALS

  @ValidateIf((envValues) => !envValues.AREA)
  @IsString()
  AREA: string;

  @ValidateIf((envValues) => !envValues.CUSTOMER_CODE)
  @IsNumber()
  CUSTOMER_CODE: number;

  @ValidateIf((envValues) => !envValues.LICENCE_KEY)
  @IsString()
  LICENCE_KEY: string;

  @ValidateIf((envValues) => !envValues.CUSTOMER_PINCODE)
  @IsNumber()
  CUSTOMER_PINCODE: number;

  @ValidateIf((envValues) => !envValues.LOGIN_ID)
  @IsString()
  LOGIN_ID: string;

  @ValidateIf((envValues) => !envValues.API_TYPE)
  @IsString()
  API_TYPE: string;

  @ValidateIf((envValues) => !envValues.SELLER_API_BASE_URL)
  @IsString()
  SELLER_API_BASE_URL: string;
}
export const envConfig = {
  //APP
  appPort: process.env.APP_PORT,

  //DB CRED
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: process.env.TYPEORM_LOGGING,
  logger: process.env.TYPEORM_LOGGER,
  acquireTimeout: +process.env.TYPEORM_ACQUIRE_TIMEOUT,
  connectTimeout: +process.env.TYPEORM_CONNECTION_TIMEOUT,

  //SR CRED
  srLoginEmail: process.env.SR_LOGIN_EMAIL,
  srLoginPwd: process.env.SR_LOGIN_PWD,
  xApikey: process.env.SR_XAPI_KEY,

  //BD CRED
  area: process.env.AREA,
  customerCode: process.env.CUSTOMER_CODE,
  licenceKey: process.env.LICENCE_KEY,
  customerPincode: process.env.CUSTOMER_PINCODE,
  loginId: process.env.LOGIN_ID,
  apiType: process.env.API_TYPE,
  sellerAPiBaseUrl: process.env.SELLER_API_BASE_URL,
};

export const envConfigLoader = registerAs('env', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return envConfig;
});
