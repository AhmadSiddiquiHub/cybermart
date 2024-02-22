"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const morgan = require("morgan");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const dotenv = require("dotenv");
const validationPipeFilter_1 = require("./utils/validationPipeFilter");
dotenv.config();
async function bootstrap() {
    const httpApp = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    httpApp.setGlobalPrefix('api/seller');
    httpApp.setBaseViewsDir((0, path_1.join)(__dirname, '../', 'views'));
    httpApp.setViewEngine('hbs');
    httpApp.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    httpApp.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    httpApp.useGlobalFilters(new validationPipeFilter_1.ValidationExceptionFilter());
    await httpApp.listen(process.env.APP_PORT || 4020);
    console.log(`HTTP server running on PORT = ${process.env.APP_PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map