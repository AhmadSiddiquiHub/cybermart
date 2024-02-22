"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ValidationExceptionFilter = class ValidationExceptionFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        if (exception instanceof common_1.HttpException) {
            const errorResponse = exception.getResponse();
            if (Array.isArray(errorResponse.message) &&
                this.isValidationError(errorResponse.message)) {
                const validationErrors = this.extractValidationErrors(errorResponse.message);
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Validation failed',
                    errors: validationErrors,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                });
            }
            else {
                const errObj = {
                    ...errorResponse,
                    status: 0,
                    message: Array.isArray(errorResponse.message)
                        ? errorResponse.message.join(' & ')
                        : errorResponse.message,
                };
                response.status(errorResponse.statusCode).json(errObj);
            }
        }
    }
    isValidationError(errors) {
        return (Array.isArray(errors) &&
            errors.every((error) => error instanceof class_validator_1.ValidationError));
    }
    extractValidationErrors(errors) {
        const result = {};
        errors.forEach((error) => {
            Object.keys(error.constraints).forEach((key) => {
                if (!result[error.property]) {
                    result[error.property] = [];
                }
                result[error.property].push(error.constraints[key]);
            });
        });
        return result;
    }
};
exports.ValidationExceptionFilter = ValidationExceptionFilter;
exports.ValidationExceptionFilter = ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], ValidationExceptionFilter);
//# sourceMappingURL=validationPipeFilter.js.map