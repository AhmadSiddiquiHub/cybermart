"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_1 = require("./database");
const ProductController_1 = require("./controllers/ProductController");
const ProductService_1 = require("./services/ProductService");
const S3Service_1 = require("./services/S3Service");
const VendorProductVariantService_1 = require("./services/VendorProductVariantService");
const ProductDiscountService_1 = require("./services/ProductDiscountService");
const UserService_1 = require("./services/UserService");
const OpenBoxProductPincodeService_1 = require("./services/OpenBoxProductPincodeService");
const SameDayProductPincodeService_1 = require("./services/SameDayProductPincodeService");
const RelatedProductService_1 = require("./services/RelatedProductService");
const ProductWarranty_1 = require("./services/ProductWarranty");
const ProductQuestionsService_1 = require("./services/ProductQuestionsService");
const ProductAnswersService_1 = require("./services/ProductAnswersService");
const CategoryService_1 = require("./services/CategoryService");
const AttributeService_1 = require("./services/AttributeService");
const SiteService_1 = require("./services/SiteService");
const CampaignController_1 = require("./controllers/CampaignController");
const CampaignService_1 = require("./services/CampaignService");
const CampaignVendorsService_1 = require("./services/CampaignVendorsService");
const CampaignProductsService_1 = require("./services/CampaignProductsService");
const SubOrderService_1 = require("./services/SubOrderService");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController, ProductController_1.ProductController, CampaignController_1.CampaignController],
        providers: [
            app_service_1.AppService, ProductService_1.ProductService, S3Service_1.S3Service, VendorProductVariantService_1.VendorProductVariantService, ProductDiscountService_1.ProductDiscountService, UserService_1.UserService,
            OpenBoxProductPincodeService_1.OpenBoxProductPincodeService, SameDayProductPincodeService_1.SameDayProductPincodeService, RelatedProductService_1.RelatedProductService, ProductWarranty_1.ProductWarrantyService,
            ProductQuestionsService_1.ProductQuestionsService, ProductAnswersService_1.ProductAnswersService, SiteService_1.SiteService, CategoryService_1.CategoryService, AttributeService_1.AttributeService,
            CampaignService_1.CampaignService, CampaignVendorsService_1.CampaignVendorsService, CampaignProductsService_1.CampaignProductsService, SubOrderService_1.SubOrderService
        ],
    })
], AppModule);
(async () => {
    try {
        await database_1.DBSource.initialize();
        console.log('Database connected!');
    }
    catch (error) {
        console.log('Could not connect db:', error);
        process.exit(1);
    }
})();
//# sourceMappingURL=app.module.js.map