"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfigLoader = exports.envConfig = void 0;
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
dotenv.config();
const class_validator_1 = require("class-validator");
const validate_config_1 = require("../utils/validate.config");
class EnvironmentVariablesValidator {
}
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.APP_PORT),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "APP_PORT", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_TYPE),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "TYPEORM_TYPE", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_HOST),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "TYPEORM_HOST", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_PORT),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(65535),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EnvironmentVariablesValidator.prototype, "TYPEORM_PORT", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_USERNAME),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "TYPEORM_USERNAME", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_PASSWORD),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "TYPEORM_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_DATABASE),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "TYPEORM_DATABASE", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_SYNCHRONIZE),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "TYPEORM_SYNCHRONIZE", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_LOGGER),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "TYPEORM_LOGGER", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_LOGGING),
    __metadata("design:type", Object)
], EnvironmentVariablesValidator.prototype, "TYPEORM_LOGGING", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_ACQUIRE_TIMEOUT),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], EnvironmentVariablesValidator.prototype, "TYPEORM_ACQUIRE_TIMEOUT", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.TYPEORM_CONNECTION_TIMEOUT),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], EnvironmentVariablesValidator.prototype, "TYPEORM_CONNECTION_TIMEOUT", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.SR_XAPI_KEY),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "SR_XAPI_KEY", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.SR_LOGIN_EMAIL),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "SR_LOGIN_EMAIL", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.SR_LOGIN_EMAIL),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "SR_LOGIN_PWD", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.AREA),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "AREA", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.CUSTOMER_CODE),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariablesValidator.prototype, "CUSTOMER_CODE", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.LICENCE_KEY),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "LICENCE_KEY", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.CUSTOMER_PINCODE),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariablesValidator.prototype, "CUSTOMER_PINCODE", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.LOGIN_ID),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "LOGIN_ID", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.API_TYPE),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "API_TYPE", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => !envValues.SELLER_API_BASE_URL),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "SELLER_API_BASE_URL", void 0);
exports.envConfig = {
    appPort: process.env.APP_PORT,
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
    srLoginEmail: process.env.SR_LOGIN_EMAIL,
    srLoginPwd: process.env.SR_LOGIN_PWD,
    xApikey: process.env.SR_XAPI_KEY,
    area: process.env.AREA,
    customerCode: process.env.CUSTOMER_CODE,
    licenceKey: process.env.LICENCE_KEY,
    customerPincode: process.env.CUSTOMER_PINCODE,
    loginId: process.env.LOGIN_ID,
    apiType: process.env.API_TYPE,
    sellerAPiBaseUrl: process.env.SELLER_API_BASE_URL,
};
exports.envConfigLoader = (0, config_1.registerAs)('env', () => {
    (0, validate_config_1.default)(process.env, EnvironmentVariablesValidator);
    return exports.envConfig;
});
//# sourceMappingURL=env.config.js.map