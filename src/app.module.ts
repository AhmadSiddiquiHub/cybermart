import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBSource } from './database';
import { ProductController } from './controllers/ProductController';
import { ProductService } from './services/ProductService';
import { S3Service } from './services/S3Service';
import { VendorProductVariantService } from './services/VendorProductVariantService';
import { ProductDiscountService } from './services/ProductDiscountService';
import { UserService } from './services/UserService';
import { OpenBoxProductPincodeService } from './services/OpenBoxProductPincodeService';
import { SameDayProductPincodeService } from './services/SameDayProductPincodeService';
import { RelatedProductService } from './services/RelatedProductService';
import { ProductWarrantyService } from './services/ProductWarranty';
import { ProductQuestionsService } from './services/ProductQuestionsService';
import { ProductAnswersService } from './services/ProductAnswersService';
import { CategoryService } from './services/CategoryService';
import { AttributeService } from './services/AttributeService';
import { SiteService } from './services/SiteService';
import { CampaignController } from './controllers/CampaignController';
import { CampaignService } from './services/CampaignService';
import { CampaignVendorsService } from './services/CampaignVendorsService';
import { CampaignProductsService } from './services/CampaignProductsService';
import { SubOrderService } from './services/SubOrderService';

@Module({
  imports: [],
  controllers: [AppController, ProductController, CampaignController],
  providers: [
    // Product Services
    AppService, ProductService, S3Service, VendorProductVariantService, ProductDiscountService, UserService,
    OpenBoxProductPincodeService, SameDayProductPincodeService, RelatedProductService, ProductWarrantyService,
    ProductQuestionsService, ProductAnswersService, SiteService, CategoryService, AttributeService, 
     // Campaign Services
     CampaignService, CampaignVendorsService, CampaignProductsService, SubOrderService
  ],
 

})
export class AppModule {}

(async () => {
  try {
    await DBSource.initialize();
    console.log('Database connected!');
  } catch (error) {
    console.log('Could not connect db:', error)
    process.exit(1);
  }
})();
