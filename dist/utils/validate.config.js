"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const exceptions_1 = require("@nestjs/common/exceptions");
function validateConfig(config, envVariablesClass) {
    const validatedConfig = (0, class_transformer_1.plainToClass)(envVariablesClass, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new exceptions_1.BadRequestException(errors.toString() + 'please define it in .env File', { cause: new Error() });
    }
    return validatedConfig;
}
exports.default = validateConfig;
//# sourceMappingURL=validate.config.js.map