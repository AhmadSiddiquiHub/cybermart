import * as dotenv from 'dotenv';
import * as path from 'path';
import { getOsEnv, normalizePort, getOsEnvOptional, toNumber, toBool, getOsPaths } from './utils';

dotenv.config(
    {
        path: path.join(process.cwd(), `.env${((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? '' : '.' + process.env.NODE_ENV)}`),
    }
);
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    cryptoSecret: getOsEnv('CRYPTO_SECRET'),
    jwtSecret: getOsEnv('JWT_SECRET'),
    availImageTypes: getOsEnv('AVAILABLE_IMAGE_TYPES'),
    baseUrl: getOsEnv('BASE_URL'),
    app: {
        name: getOsEnv('APP_NAME'),
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnv('APP_PORT')),
        dirs: {
            entities: getOsPaths('TYPEORM_ENTITIES'),
            controllers: getOsPaths('CONTROLLERS'),
            middlewares: getOsPaths('MIDDLEWARES'),
        },
    },
    db: {
        type: getOsEnv('TYPEORM_CONNECTION'),
        host: getOsEnvOptional('TYPEORM_HOST'),
        port: toNumber(getOsEnvOptional('TYPEORM_PORT')),
        username: getOsEnvOptional('TYPEORM_USERNAME'),
        password: getOsEnvOptional('TYPEORM_PASSWORD'),
        database: getOsEnv('TYPEORM_DATABASE'),
        synchronize: toBool(getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
        logging: toBool(getOsEnv('TYPEORM_LOGGING')),
    },
    aws: {
        AWS_ACCESS_KEY_ID: getOsEnv('AWS_ACCESS_KEY_ID'),
        AWS_SECRET_ACCESS_KEY: getOsEnv('AWS_SECRET_ACCESS_KEY'),
        AWS_DEFAULT_REGION: getOsEnv('AWS_DEFAULT_REGION'),
        AWS_BUCKET: getOsEnv('AWS_BUCKET'),
    },
};

export const mailEnv = {
    SERVICE: getOsEnv('MAIL_DRIVER'),
    HOST: getOsEnv('MAIL_HOST'),
    PORT: getOsEnv('MAIL_PORT'),
    SECURE: getOsEnv('MAIL_SECURE'),
    FROM: getOsEnv('MAIL_FROM'),
    AUTH: {
        user: getOsEnv('MAIL_USERNAME'),
        pass: getOsEnv('MAIL_PASSWORD'),
    }
};