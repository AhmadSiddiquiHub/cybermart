"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailEnv = exports.env = void 0;
const dotenv = require("dotenv");
const path = require("path");
const utils_1 = require("./utils");
dotenv.config({
    path: path.join(process.cwd(), `.env${((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? '' : '.' + process.env.NODE_ENV)}`),
});
exports.env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    cryptoSecret: (0, utils_1.getOsEnv)('CRYPTO_SECRET'),
    jwtSecret: (0, utils_1.getOsEnv)('JWT_SECRET'),
    availImageTypes: (0, utils_1.getOsEnv)('AVAILABLE_IMAGE_TYPES'),
    baseUrl: (0, utils_1.getOsEnv)('BASE_URL'),
    app: {
        name: (0, utils_1.getOsEnv)('APP_NAME'),
        host: (0, utils_1.getOsEnv)('APP_HOST'),
        schema: (0, utils_1.getOsEnv)('APP_SCHEMA'),
        routePrefix: (0, utils_1.getOsEnv)('APP_ROUTE_PREFIX'),
        port: (0, utils_1.normalizePort)(process.env.PORT || (0, utils_1.getOsEnv)('APP_PORT')),
        dirs: {
            entities: (0, utils_1.getOsPaths)('TYPEORM_ENTITIES'),
            controllers: (0, utils_1.getOsPaths)('CONTROLLERS'),
            middlewares: (0, utils_1.getOsPaths)('MIDDLEWARES'),
        },
    },
    db: {
        type: (0, utils_1.getOsEnv)('TYPEORM_CONNECTION'),
        host: (0, utils_1.getOsEnvOptional)('TYPEORM_HOST'),
        port: (0, utils_1.toNumber)((0, utils_1.getOsEnvOptional)('TYPEORM_PORT')),
        username: (0, utils_1.getOsEnvOptional)('TYPEORM_USERNAME'),
        password: (0, utils_1.getOsEnvOptional)('TYPEORM_PASSWORD'),
        database: (0, utils_1.getOsEnv)('TYPEORM_DATABASE'),
        synchronize: (0, utils_1.toBool)((0, utils_1.getOsEnvOptional)('TYPEORM_SYNCHRONIZE')),
        logging: (0, utils_1.toBool)((0, utils_1.getOsEnv)('TYPEORM_LOGGING')),
    },
    aws: {
        AWS_ACCESS_KEY_ID: (0, utils_1.getOsEnv)('AWS_ACCESS_KEY_ID'),
        AWS_SECRET_ACCESS_KEY: (0, utils_1.getOsEnv)('AWS_SECRET_ACCESS_KEY'),
        AWS_DEFAULT_REGION: (0, utils_1.getOsEnv)('AWS_DEFAULT_REGION'),
        AWS_BUCKET: (0, utils_1.getOsEnv)('AWS_BUCKET'),
    },
};
exports.mailEnv = {
    SERVICE: (0, utils_1.getOsEnv)('MAIL_DRIVER'),
    HOST: (0, utils_1.getOsEnv)('MAIL_HOST'),
    PORT: (0, utils_1.getOsEnv)('MAIL_PORT'),
    SECURE: (0, utils_1.getOsEnv)('MAIL_SECURE'),
    FROM: (0, utils_1.getOsEnv)('MAIL_FROM'),
    AUTH: {
        user: (0, utils_1.getOsEnv)('MAIL_USERNAME'),
        pass: (0, utils_1.getOsEnv)('MAIL_PASSWORD'),
    }
};
//# sourceMappingURL=env.js.map