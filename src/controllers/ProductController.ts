import { Controller, Post, Req, Res, UseGuards, Body } from '@nestjs/common';
import excel from "exceljs";
import { In, Not } from 'typeorm';
import jwt from 'jsonwebtoken'
import moment from 'moment';
import { CategoryRepository, ComboOfferRepository, OpenBoxProductPincodeRepository, ProductAnswersRepository,
  ProductAttributeVendorValueRepository, ProductDiscountRepository, ProductMetaInfoRepository, ProductPreferenceRepository,
  ProductQuestionsRepository, ProductRepository, ProductShippingInfoRepository, ProductVariantImageRepository,
  ProductVariantRepository, ProductVariantValueRepository, SameDayProductPincodeRepository, SiteRepository,
  TaxClassRepository, UserFavCategoryRepository, UserProductPreferenceRepository, VendorProductCategoryRepository,
  VendorProductRepository, VendorProductStatusLogRepository, VendorProductVariantRepository, VendorRepository } from 'src/database';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/gaurds/auth.guard';
import { ProductService } from 'src/services/ProductService';
import { CreateComboOfferRequest, DeleteProducctAvailabilityRequest, MarkCategoryFavoriteRequest, ProductExportToExcelRequest,
  ProductListingRequest, UpdateProducctAvailabilityRequest, UpdateProducctPriceRequest, UpdateProducctStockRequest,
  UpdateProductDiscountPriceRequest, getRelatedProductRequest, relatedProductSuggestionRequest, removeVariantsRequest } from 'src/requests';
import { S3Service } from "../services/S3Service";
import {VendorProductVariantService} from '../services/VendorProductVariantService'
import { ProductDiscount } from 'src/database/models/ProductDiscount';
import { AddAnswerRequest, CreateProductRequest, GetQuestionListRequest, UpdateProductAvailabilityForAllVariantsRequest,
  activeDeactiveRequest, activeDeactiveRequestV1, otherSellerListing } from 'src/requests/createProductRequest';
import { UserService } from 'src/services/UserService';
import { Product } from 'src/database/models/Product';
import { AppLevelDateTimeFormat, ProductStatusEnum, SitesEnum, productSlug } from 'src/utils';
import { VendorProduct } from 'src/database/models/VendorProduct';
import { ProductWarrantyService } from 'src/services/ProductWarranty';
import { ProductMetaInfo } from 'src/database/models/ProductMetaInfo';
import { ProductVariantValue } from 'src/database/models/ProductVariantValue';
import { ProductVariant } from 'src/database/models/ProductVariant';
import { VendorProductVariant } from 'src/database/models/VendorProductVariant';
import { VendorProductStatusLog } from 'src/database/models/VendorProductStatusLog';
import { ProductAttributeVendorValue } from 'src/database/models/ProductAttributeVendorValue';
import { OpenBoxProductPincodeService } from 'src/services/OpenBoxProductPincodeService';
import { SameDayProductPincodeService } from 'src/services/SameDayProductPincodeService';
import { RelatedProductService } from 'src/services/RelatedProductService';
import { EditProductRequest } from 'src/requests/EditProductRequest';
import { ProductShippingInfo } from 'src/database/models/ProductShippingInfo';
import { ProductQuestionsService } from 'src/services/ProductQuestionsService';
import { ProductAnswers } from 'src/database/models/ProductAnswers';
import { CategoryService } from 'src/services/CategoryService';
import { AttributeService } from 'src/services/AttributeService';
import { UserFavCategory } from 'src/database/models/UserFavCategory';
import { ComboOffer } from 'src/database/models/ComboOffer';
import { OpenBoxProductPincodes } from 'src/database/models/OpenBoxProductPincodes';
import { SameDayProductPincodes } from 'src/database/models/SameDayProductPincodes';

@Controller('/product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private s3Service: S3Service, 
    private vendorProductVariantService: VendorProductVariantService,
    private userService: UserService,
    private productWarrantyService: ProductWarrantyService,
    private openBoxProductPincodeService: OpenBoxProductPincodeService,
    private sameDayProductPincodeService: SameDayProductPincodeService,
    private relatedProductSevice: RelatedProductService,
    private productQuestionsService: ProductQuestionsService,
    private categoryService: CategoryService,
    private attributeService: AttributeService,
  ) {}


  // /api/seller/product/preferences-listing
  @Post("/preferences-listing")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async preferenceListing(@Req() request: any, @Res() response: any): Promise<any> {
    const userId = request.user.userId;
    const vendorPreferences = await UserProductPreferenceRepository.find({ where: { userId } });
    if (vendorPreferences.length === 0) {
      await this.productService.createDefaultPreferences(userId);
    }
    const preferences = await this.productService.productTablePreferences(userId);
    return response.status(200).send({ status: 1, message: "", data: preferences });
  }


  // /api/seller/product/set-preferences
  @Post("/set-preferences")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async setOrderPreference(@Req() request: any,@Res() response: any): Promise<any> {
    const userId = request.user.userId;
    let productPreferences: any = await UserProductPreferenceRepository.find({ where: { userId } });
    productPreferences = productPreferences.map((item) => item.id);
    if (productPreferences.length) {
      await UserProductPreferenceRepository.delete(productPreferences);
    }
    let latestProductPreferences = request.body.ids;
    latestProductPreferences = latestProductPreferences.map(
      (productPreferenceId: any) => {
        return {userId, productPreferenceId};
      }
    );
    await UserProductPreferenceRepository.save(latestProductPreferences);;
    const data = await this.productService.productTablePreferences(userId);
    return response.status(200).send({ status: 1, message: "Product preferences list", data });
  }


   // /api/seller/product/excel-export
   @Post("/excel-export")
   @UseGuards(AuthGuard)
   @Roles('seller')
   public async productsExport(@Body() params: ProductExportToExcelRequest,@Req() request: any,@Res() response: any): Promise<any> {
     const vendorId = request.user.userId;
     const preferenceIds = params.prefIds;
     let preferences = await ProductPreferenceRepository.find({ where: { id: In(preferenceIds), isActive: 1 } });
     if (preferences.length !== preferenceIds.length) {
       return response.status(400).send({ status: 1, message: "Invalid preference ids input", data: {} });
     }
     let { data: productsList } = await this.productService.productListing({siteId: request.siteId,limit: 0,offset: 0,
      statusId: 0, vendorId,viewType: 0,
     });
     // below we are making object of each array according to the user preferences columns of table in product listing table
     productsList = productsList.map((product: any) => {
       const requiredProductFields = {};
       Object.entries(product).map((key, value) => {
         const isValidPreference = preferences.find((pref) => pref.col === key[0]);
         if (isValidPreference) {
           Object.assign(requiredProductFields, { [key[0]]: key[1] });
         }
       });
       return requiredProductFields;
     });
     const workbook = new excel.Workbook();
     const worksheet = workbook.addWorksheet("products");
     worksheet.properties.defaultRowHeight = 30;
     let columns = productsList[0];
     columns = Object.keys(columns).map((key) => {
       return {header: key,key,size: 16,width: 30};
     });
     worksheet.columns = columns;
     let rows = productsList.map(async (product: any, itemIndex: any) => {
       const productInterface = Object.entries(product).map(async (i, index) => {
         const key = i[0];
         const value: any = i[1];
         if (key == "variant") {
           // const parsedValue = JSON.parse(value);
           const variantValue = value.map((variant: any) => {
             if (variant.name === "default") {
               return "";
             }
             return `${variant.name}: ${variant.value} `;
           });
           return variantValue.toString();
         }
         if (key == "image") {
           const file = await this.s3Service.getObject(value);
           const base64String = file.Body.toString("base64");
           const src = `data:${file.ContentType};base64,${base64String}`;
           // const extension = value.split('.').pop();
           const imageId = workbook.addImage({base64: src, extension: "jpeg",});
           worksheet.addImage(imageId, {
             tl: { col: index, row: itemIndex + 1 }, ext: { width: 30, height: 30 },
             hyperlinks: {hyperlink: process.env.BUCKET_BASE_URL + `${value}`, tooltip: process.env.BUCKET_BASE_URL + `${value}`},
           });
           return "";
         }
         return value;
       });
       return await Promise.all(productInterface);
     });
     rows = await Promise.all(rows);
     worksheet.addRows(rows);
     const fileName: any = "product-list" + Date.now() + ".xlsx";
     const excelFile = await workbook.xlsx.writeBuffer(fileName);
     const filePath = await this.s3Service.fileUploadBase64(`excel-exports/${fileName}`, excelFile);
     return response.status(200).send({status: 1, message: "Product listing exported", data: {path: filePath.path}});
   }


   // api/seller/product/listings
  @Post("/listings")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async productListings(@Body() params: ProductListingRequest,@Req() request: any,@Res() response: any): Promise<any> {
    const siteId = request.siteId;
    const limit = 10;
    const offset = params.page === 1 ? 0 : limit * params.page - limit;
    const statusId = params.statusId;
    const vendorId = request.user.userId;
    const viewType = params.viewType;
    const keyword = params.keyword;
    // sellerViewToken will be used with url to preview products in pending approval state. sellerViewToken is being used in SellerProductService and BuyerProductService
    const sellerViewToken = jwt.sign({ id: vendorId }, 'sellerViewToken', { expiresIn: '365d' });
    let { data, totalCount } = await this.productService.productListing({siteId, limit, offset, statusId, vendorId, viewType, keyword});
    const pN = totalCount / limit;
    const pageNumber = params.page;
    const pages = Math.ceil(pN);
    const stats = await this.productService.productListingCountStats({siteId, vendorId, viewType, statusId: 0});
    data = data.map((item) => {
      return {
        ...item, currencySymbol: request.currencySymbol
      }
    });
    const siteData = await SiteRepository.findOne({ where: { id: request.siteId } });
    // statusId 5 is pending Approval.
    data = data.map(i => {
      if (i.statusId && i.statusId === 5) {
        i.slug = `${i.slug}?sellerView=${sellerViewToken}`;
      }
      return i;
    });
    const successResponse: any = {
      status: 1,
      message: "product list",
      total: totalCount,
      page: pageNumber,
      pages,
      siteData: {
        websiteLink: siteData.websiteLink,
      },
      stats,
      data,
    };
    return response.status(200).send(successResponse);
  }


  // api/seller/product/update-stock
  @Post("/update-stock")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async updateProductStock(@Body() params: UpdateProducctStockRequest, @Req() request: any, @Res() response: any): Promise<any> {
    const siteId = request.siteId;
    const vendorId = request.user.userId;
    const productId = params.productId;
    const productVariantId = params.productVariantId;
    
    const data = await VendorProductVariantRepository.findOne({ where: { vendorId, siteId, productId, productVariantId }});
    if (!data) {
      return response.status(400).send({ status: 1, message: "Invalid request", data: {} });
    }
    data.quantity = params.quantity;
    if (params.quantity === 0) {
      data.outOfStock = 1;
    } else {
      data.outOfStock = 0;
    }
    const upData = await VendorProductVariantRepository.save(data);
    return response.status(200).send({ status: 1, message: "Success", data: upData });
  }


  // api/seller/product/update-price
  @Post("/update-price")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async updateProductVariantPrice(@Body() params: UpdateProducctPriceRequest, @Req() request: any, @Res() response: any): Promise<any> {
    const siteId = request.siteId;
    const vendorId = request.user.userId;
    const productId = params.productId;
    const productVariantId = params.productVariantId;
    const data: any = await VendorProductVariantRepository.findOne({ where: { vendorId, siteId, productId, productVariantId } });
    if (!data) {
      return response.status(400).send({ status: 1, message: "Invalid request", data: {} });
    }
    let amountInclusiveOfTax = '0';
    const VP = await VendorProductRepository.findOne({ where: { productId, vendorId, siteId } });
    if (VP.taxClassId) {
      amountInclusiveOfTax = await this.productService.calculateTaxForIndiaByClass(params.price.toString(), VP.taxClassId);
    }
    data.price2 = params.price;
    if (amountInclusiveOfTax != '0') {
      data.price = amountInclusiveOfTax;
    } else {
      data.price = params.price;
    }
    const updated = await VendorProductVariantRepository.save(data);
    return response.status(200).send({ status: 1, message: "Success", data: { price: updated.price } });
  }

  // api/seller/product/update-discount-price
  @Post("/update-discount-price")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async updateDiscountPrice(@Body() params: UpdateProductDiscountPriceRequest,@Req() request: any,@Res() response: any): Promise<any> {
    const siteId = request.siteId;
    const vendorId = request.user.userId;
    const productId = params.productId;
    const productVariantId = params.productVariantId;
    let upPrice: any;
    let data: any = await VendorProductVariantRepository.findOne({ where: { vendorId, siteId, productId, productVariantId }});
    if (!data) {
      return response.status(400).send({ status: 1, message: "Invalid request", data: {} });
    }

    let amountInclusiveOfTax = '0';
    const VP = await VendorProductRepository.findOne({ where: { productId, vendorId, siteId } });
    if (VP.taxClassId) {
      amountInclusiveOfTax = await this.productService.calculateTaxForIndiaByClass(params.price.toString(), VP.taxClassId);
    }
    data.price2 = params.price;
    if (amountInclusiveOfTax != '0') {
      data.price = amountInclusiveOfTax;
    } else {
      data.price = params.price;
    }
    data = await VendorProductVariantRepository.save(data);
    const discount = await ProductDiscountRepository.findOne({where: { vendorProductVariantId: data.id }});
    amountInclusiveOfTax = '0';
    if (VP.taxClassId) {
      amountInclusiveOfTax = await this.productService.calculateTaxForIndiaByClass(params.discountPrice.toString(), VP.taxClassId);
    }
    if (discount) {
      discount.price2 = params.discountPrice;
      if (amountInclusiveOfTax != '0') {
        discount.price = amountInclusiveOfTax;
      } else {
        discount.price = params.discountPrice;
      }
      discount.startDate = moment(params.startDate).format("YYYY-MM-DD") + ' 00:00:00';
      discount.endDate = moment(params.endDate).format("YYYY-MM-DD") + ' 23:59:59';
      discount.showSaleEndDate = params.showSaleEndDate;
      upPrice = await ProductDiscountRepository.save(discount);
    } else {
      const newD = new ProductDiscount();
      newD.price2 = params.discountPrice;
      if (amountInclusiveOfTax != '0') {
        newD.price = amountInclusiveOfTax;
      } else {
        newD.price = params.discountPrice;
      }
      newD.startDate = params.startDate;
      newD.endDate = params.endDate;
      newD.vendorProductVariantId = data.id;
      newD.showSaleEndDate = params.showSaleEndDate;
      upPrice = await ProductDiscountRepository.save(newD);
    }
    return response.status(200).send({ status: 1, message: "Success", data: {price: data.price2, discountPrice: upPrice.price2,
        startDate: upPrice.startDate, endDate: upPrice.endDate},
      });
  }

  // api/seller/product/delete-discount-offer
  @Post("/delete-discount-offer")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async deleteDiscountOffer(@Body() params: DeleteProducctAvailabilityRequest, @Req() request: any, @Res() response: any): Promise<any> {
    await ProductDiscountRepository.createQueryBuilder().delete().where('vendorProductVariantId = :id', { id: params.vendorProductVariantId }).execute();
    return response.status(200).send({ status: 1, message: "Success", data: {} });
  }


  // api/seller/product/create
  @Post("/create")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async createProduct(@Body() params: CreateProductRequest, @Req() request: any, @Res() response: any): Promise<any> {
    for (const v of params.variants_info) {
      if (v.sale_price) {
        if (parseFloat(v.sale_price) > parseFloat(v.price)) {
          return response.status(400).send({status: 0, message: "Discount price should be less than price", data: {}});
        }
      }
    }
    const siteId = request.siteId;
    const vendorId = request.user.userId;
    const checkProfile = await this.userService.checkVendorProfileCompleted(vendorId);
    if (checkProfile.vendorProfileCompleted === 0) {
      return response.status(400).send({status: 0,message: "Please complete your profile to create products!",data: checkProfile});
    }
    // create products and vendor_product tables record
    let p = new Product();
    p.name = params.p_name;
    p.longDesc = params.long_desc;
    p.descEditorDesign = params.desc_editor_design;
    p.moreInformation = params.moreInformation;
    p.bulletPoints = JSON.stringify(params.bulletPoints);
    p = await ProductRepository.save(p);
    const csin = await productSlug(siteId, p.id)
    const slug = await this.productService.checkAndGenerateSlug(params.slug);
    let vp: any = new VendorProduct();
    if (checkProfile.productAutoApproval == 1) {
      vp.statusId = 1;
    }
    vp.fakeOrders = checkProfile.isCybermartSeller == 1 ? params.fakeOrders: 0;
    vp.productId = p.id;
    vp.siteId = siteId;
    vp.vendorId = vendorId;
    vp.brandId = params.brandId;
    vp.isProductOwner = 1;
    vp.slug = `${slug}-${csin}`;
    vp.returnDays = params.return_days;
    vp.search_keywords = params.search_keywords.toString();
    if (params.tax_class_handling !== '0') {
      vp.taxClassId = Number(params.tax_class_handling);
    }
    if (params.sizeChartImage) {
      vp.sizeChartImage = params.sizeChartImage;
    }
    vp = await VendorProductRepository.save(vp);

    await this.productWarrantyService.insertWarranty(params.warrantySettings, vp.id)

    //Add product meta info
    let pmi = new ProductMetaInfo();
    pmi.productId = p.id;
    pmi.siteId = siteId;
    pmi.langId = request.langId;
    pmi.title = params.title ? params.title : params.p_name;
    // If product meta description is empty then assign product short description to it.
    pmi.description = params.description ? params.description : params.title;
    pmi.keyword = params.keyword ? params.keyword : params.p_name;
    pmi = await ProductMetaInfoRepository.save(pmi);
    if (params.variants && params.variants.length > 0) {
      const variantsValues = params.variants.map((item, index) => {
        const vv = new ProductVariantValue();
        vv.productId = p.id;
        vv.variantId = item.id;
        vv.name = item.value;
        vv.value = item.value;
        return vv;
      });
      await ProductVariantValueRepository.save(variantsValues);
    }
    for (let i = 0; i < params.variants_info.length; i++) {
      const v = params.variants_info[i];
      const whereCondition = {
        sku: v.sku,
        vendorId: vendorId
      }
      const vv: any = v.variant_value;
      const pv = new ProductVariant();
      pv.productId = p.id;
      pv.productVariantValuesId = JSON.stringify(vv);
      const pvariant = await ProductVariantRepository.save(pv);
      const vpv = new VendorProductVariant();
      vpv.vendorId = vendorId;
      vpv.siteId = siteId;
      vpv.productId = p.id;
      vpv.productVariantId = pvariant.id;
      vpv.price = await this.productService.calculateTaxForIndiaByClass(v.price, params.tax_class_handling);
      vpv.price2 = this.productService.handleProductPrice2(v.price, params.tax_class_handling);
      vpv.sku = await this.vendorProductVariantService.checkAndGenerateSKU(v.sku, whereCondition, vendorId);
      vpv.isActive = 1;
      vpv.available = 1;
      vpv.quantity = v.quantity;
      vpv.outOfStock = v.quantity > 0 ? 0 : 1;
      vpv.is_default = v.is_default;
      const vendorProductVariant = await VendorProductVariantRepository.save(vpv);
      v.images.map(async (image) => {
        await ProductVariantImageRepository.save({
          image: image.image,
          isDefault: image.is_default,
          variantId: image.variantId,
          isActive: 1,
          productVariantsId: pvariant.id,
        });
      });
      if (v.sale_price) {
        await ProductDiscountRepository.save({
          vendorProductVariantId: vendorProductVariant.id,
          price: await this.productService.calculateTaxForIndiaByClass(v.sale_price, params.tax_class_handling),
          price2: this.productService.handleProductPrice2(v.sale_price, params.tax_class_handling),
          startDate: moment(v.start_sale_date).format('YYYY-MM-DD') + ' 00:00:00',
          endDate: moment(v.end_sale_date).format('YYYY-MM-DD') + ' 23:59:59',
          showSaleEndDate: v.showSaleEndDate
        });
      }
    }
    const p_cats = params.categories.map((cat, i) => {
      return { categoryId: cat, vendorProductId: vp.id};
    });
    await VendorProductCategoryRepository.save(p_cats);;
    // insert into product_shipping_info table to log the shipping details of product
    const asd = params.shipping.filter(i => i.type != 'open-box' && i.type != 'same-day').map(async (item, index) => {
      return {days: item.days, charges: item.charges, charges2: item.charges, type: item.type, siteId: siteId, vendorId: vendorId,
        productId: p.id,
      };
    });
    const shippingArr: any = await Promise.all(asd);
    await ProductShippingInfoRepository.save(shippingArr);
    // track status of product whether it is approved by admin or admin ask seller to improve information of product
    const plog = new VendorProductStatusLog();
    plog.productId = p.id;
    plog.vendorId = vendorId;
    plog.productStatus = ProductStatusEnum.Draft;
    await VendorProductStatusLogRepository.save(plog);
    const dynamicAttrs = params.additionalInfo.map((item, i) => {
      const a = new ProductAttributeVendorValue();
      a.categoryId = item.categoryId;
      a.productAttributeId = item.productAttributesId;
      a.productAttributeValueId = item.optionValue;
      a.productId = p.id;
      return a;
    });

    const obProduct = params.shipping.find(option => option.type === 'open-box');
    const sdProduct = params.shipping.find(option => option.type === 'same-day');

    if (obProduct) {
      await this.openBoxProductPincodeService.setOpenBoxProductPincodes(vendorId, p.id, obProduct.pincodes)
    }

    if (sdProduct) {
      await this.sameDayProductPincodeService.setSameDayProductPincodes(vendorId, p.id, sdProduct.pincodes);
    }

    //Setting Related Products
    if (params.relatedVariantIds && params.relatedVariantIds.length > 0) {
      await this.relatedProductSevice.setRelatedProducts(Number(p.id), params.relatedVariantIds);
    }

    await ProductAttributeVendorValueRepository.save(dynamicAttrs);
    // await this.emailService
    return response.status(200).send({ status: 1, message: "Product Created" });
  }

 // api/seller/product/edit
 @Post("/edit")
 @UseGuards(AuthGuard)
 @Roles('seller')
 public async editProduct(@Body() params: EditProductRequest, @Req() request: any, @Res() response: any): Promise<any> {
   const productInfo = await ProductRepository.findOne({ where: { id: params.productId } });
   productInfo.name = params.p_name;
   productInfo.longDesc = params.long_desc;
   productInfo.descEditorDesign = params.desc_editor_design;
   productInfo.moreInformation = params.moreInformation;
   if (params.short_desc) {
     productInfo.shortDesc = params.short_desc;
   }
   if (params.bulletPoints && params.bulletPoints.length > 0) {
     productInfo.bulletPoints = JSON.stringify(params.bulletPoints);
   }
   await ProductRepository.save(productInfo);
   const vendorProductInfo = await VendorProductRepository.findOne({ where: { vendorId: params.vendorId, productId: params.productId } });
   const checkVendorProfile = await this.userService.checkVendorProfileCompleted(params.vendorId);
   const csin = productSlug(request.siteId, params.productId)
   const vpvSlug = await vendorProductInfo?.slug.includes(csin) ? `${params.slug}-${csin}` : params.slug;

   vendorProductInfo.slug = params.slug ? vpvSlug : vendorProductInfo.slug;
   vendorProductInfo.brandId = params.brandId;
   vendorProductInfo.returnDays = params.return_days;
   vendorProductInfo.statusId = 5;
   if (checkVendorProfile && checkVendorProfile.productAutoApproval == 1) {
     vendorProductInfo.statusId = 1;
   }
   if (params.tax_class_handling !== '0') {
     vendorProductInfo.taxClassId = Number(params.tax_class_handling);
   } else {
     vendorProductInfo.taxClassId = null;
   }
   if (params.sizeChartImage) {
     vendorProductInfo.sizeChartImage = params.sizeChartImage;
   } else {
     vendorProductInfo.sizeChartImage = null;
   }
   vendorProductInfo.fakeOrders = checkVendorProfile.isCybermartSeller == 1 ? params.fakeOrders: 0;

   await VendorProductRepository.save(vendorProductInfo);

   //Edit product meta info
   
   const productmetaInfo = await ProductMetaInfoRepository.findOne({ where: { productId: params.productId, siteId: request.siteId, langId: request.langId } });
   if (!productmetaInfo) {
     let pmi = new ProductMetaInfo();
     pmi.productId = params.productId;
     pmi.siteId = request.siteId;
     pmi.langId = request.langId;
     pmi.title = params.title ? params.title : params.p_name;
     // If product meta description is empty then assign product short description to it.
     pmi.description = params.description ? params.description : params.title;
     pmi.keyword = params.keyword ? params.keyword : params.p_name;
     pmi = await ProductMetaInfoRepository.save(pmi);
   } else {
     productmetaInfo.title = params.title ? params.title : params.p_name;
     // If product meta description is empty then assign product short description to it.
     productmetaInfo.description = params.description ? params.description : params.title;
     productmetaInfo.keyword = params.keyword ? params.keyword : params.p_name;
     await ProductMetaInfoRepository.save(productmetaInfo);
   }

   // insert into product_shipping_info table to log the shipping details of product
   await ProductShippingInfoRepository.createQueryBuilder()
      .where('vendorId = :vendorId AND productId = :productId AND siteId = :siteId', 
      { vendorId: params.vendorId, productId: params.productId, siteId:request.siteId }).delete().execute();
   await ProductShippingInfoRepository.createQueryBuilder()
   .where('vendorId = :vendorId AND productId = :productId AND siteId = :siteId', 
   { vendorId: params.vendorId, productId: params.productId, siteId: request.siteId }).delete().execute();
   const asd = params.shipping.filter(i => i.type != 'open-box' && i.type != 'same-day').map(async (item) => {
    return {
      days: item.days,charges: item.charges,charges2: item.charges,type: item.type,siteId: request.siteId,vendorId: params.vendorId,
      productId: params.productId,
    };
   });
   await this.productWarrantyService.updateWarranty(params.warrantySettings, vendorProductInfo.id)
   const shippingArr: any = await Promise.all(asd);
   const obProduct = params.shipping.find(option => option.type === 'open-box');
   const sdProduct = params.shipping.find(option => option.type === 'same-day');
   if (obProduct) {
     await this.openBoxProductPincodeService.setOpenBoxProductPincodes(params.vendorId, params.productId, obProduct.pincodes)
   }
   else {
    await ProductShippingInfoRepository.createQueryBuilder('PSI').delete().from(ProductShippingInfo)
    .where('product_id = :pId', { pId: params.productId }).andWhere('type = :x', { x: 'open-box' }).execute();
    await OpenBoxProductPincodeRepository.createQueryBuilder('SDP').delete().from(OpenBoxProductPincodes)
            .where('vendor_id = :vid', { vid: params.vendorId }).andWhere('product_id = :pid', { pid: params.productId }).execute();
   }

   if (sdProduct) {
     await this.sameDayProductPincodeService.setSameDayProductPincodes(params.vendorId, params.productId, sdProduct.pincodes)
   }
   else {
    await ProductShippingInfoRepository.createQueryBuilder('PSI').delete().from(ProductShippingInfo)
    .where('product_id = :pId', { pId: params.productId }).andWhere('type = :x', { x: 'same-day' }).execute();
    await SameDayProductPincodeRepository.createQueryBuilder('SDP').delete().from(SameDayProductPincodes)
            .where('vendor_id = :vid', { vid: params.vendorId }).andWhere('product_id = :pid', { pid: params.productId }).execute();
   }

   //Setting Related Products
   // if (params.relatedVariantIds && params.relatedVariantIds.length > 0) {
   await this.relatedProductSevice.setRelatedProducts(Number(params.productId), params.relatedVariantIds);
   // }

   await ProductShippingInfoRepository.save(shippingArr);
   // update variants data here
   const variantsForUpdate = params.variants_info.filter(i => i.vendorProductVariantId !== 0);
   const newProductVariants = params.variants_info.filter(i => i.vendorProductVariantId === 0);
   for (let i = 0; i < variantsForUpdate.length; i++) {
     const item = variantsForUpdate[i];
   // const waitFor = variantsForUpdate.map(async (item, i) => {
     const pvv = await ProductVariantRepository.findOne({ where: { id: item.productVariantId } });
     pvv.productVariantValuesId = JSON.stringify(item.variant_value)
     await ProductVariantRepository.save(pvv);
     const variantInfo = await VendorProductVariantRepository.findOne({ where: { id: item.vendorProductVariantId } });
     if (variantInfo) {
       const whereCondition = {
         sku: item.sku,
         id: Not(item.vendorProductVariantId),
         vendorId: params.vendorId
       }
       variantInfo.price = await this.productService.calculateTaxForIndiaByClass(item.price, params.tax_class_handling);
       variantInfo.price2 = this.productService.handleProductPrice2(item.price, params.tax_class_handling);
       variantInfo.sku = await this.vendorProductVariantService.checkAndGenerateSKU(item.sku, whereCondition, params.vendorId);
       variantInfo.quantity = item.quantity;
       variantInfo.is_default = item.is_default;
       variantInfo.outOfStock = Number(item.quantity) > 0 ? 0 : 1;
       await VendorProductVariantRepository.save(variantInfo);
       const discountInfo = await ProductDiscountRepository.findOne({ where: { vendorProductVariantId: item.vendorProductVariantId } });
       if (item.sale_price) {
         if (discountInfo) {
           discountInfo.price = await this.productService.calculateTaxForIndiaByClass(item.sale_price, params.tax_class_handling);
           discountInfo.price2 = this.productService.handleProductPrice2(item.sale_price, params.tax_class_handling);
           discountInfo.startDate = moment(item.start_sale_date).format('YYYY-MM-DD') + ' 00:00:00';
           discountInfo.endDate = moment(item.end_sale_date).format('YYYY-MM-DD') + ' 23:59:59';
           discountInfo.showSaleEndDate = item.showSaleEndDate;
           await ProductDiscountRepository.save(discountInfo);
         } else {
            await ProductDiscountRepository.save({
              vendorProductVariantId: item.vendorProductVariantId,
              price: await this.productService.calculateTaxForIndiaByClass(item.sale_price, params.tax_class_handling),
              price2: this.productService.handleProductPrice2(item.sale_price, params.tax_class_handling),
              startDate: moment(item.start_sale_date).format(AppLevelDateTimeFormat),
              endDate: moment(item.end_sale_date).format(AppLevelDateTimeFormat),
              showSaleEndDate: item.showSaleEndDate
            });
         }
       }
       if (discountInfo) {
         if (!item.sale_price) {
           await ProductDiscountRepository.createQueryBuilder().delete().where('vendorProductVariantId = :id', { id: item.vendorProductVariantId }).execute();
         }
       }
       // delete and recreate variant images 
       await ProductVariantImageRepository.createQueryBuilder().where('productVariantsId = :productVariantId', { productVariantId: item.productVariantId })
       .delete().execute();
       for (let imageIndex = 0; imageIndex < item.images.length; imageIndex++) {
         const image = item.images[imageIndex];
         await ProductVariantImageRepository.save({
          image: image.image,
          isDefault: image.is_default,
          variantId: image.variantId,
          isActive: 1,
          productVariantsId: item.productVariantId,
        });
       }
     }
   };
   if (newProductVariants.length > 0) {
     for (let ii = 0; ii < newProductVariants.length; ii++) {
       const v = newProductVariants[ii];
     // newProductVariants.map(async (v, i) => {
       const whereCondition = {
         sku: v.sku,
         id: Not(v.vendorProductVariantId),
         vendorId: params.vendorId
       }
       const vv: any = v.variant_value;
       const pv = new ProductVariant();
       pv.productId = params.productId;
       pv.productVariantValuesId = JSON.stringify(vv);
       const pvariant = await ProductVariantRepository.save(pv);
       const vpv = new VendorProductVariant();
       vpv.vendorId = params.vendorId;
       vpv.siteId = request.siteId;
       vpv.productId = params.productId;
       vpv.productVariantId = pvariant.id;
       vpv.price = await this.productService.calculateTaxForIndiaByClass(v.price, params.tax_class_handling);
       vpv.price2 = this.productService.handleProductPrice2(v.price, params.tax_class_handling);
       vpv.sku = await this.vendorProductVariantService.checkAndGenerateSKU(v.sku, whereCondition, params.vendorId);
       vpv.isActive = 1;
       vpv.available = 1;
       vpv.quantity = v.quantity;
       const vendorProductVariant = await VendorProductVariantRepository.save(vpv);
       for (let newImageIndex = 0; newImageIndex < v.images.length; newImageIndex++) {
         const image = v.images[newImageIndex];
         await ProductVariantImageRepository.save({
          image: image.image,
          isDefault: image.is_default,
          variantId: image.variantId,
          isActive: 1,
          productVariantsId: pvariant.id,
        });
       }
       if (v.sale_price) {
        await ProductDiscountRepository.save({
          vendorProductVariantId: vendorProductVariant.id,
          price: await this.productService.calculateTaxForIndiaByClass(v.sale_price, params.tax_class_handling),
          price2: this.productService.handleProductPrice2(v.sale_price, params.tax_class_handling),
          startDate: moment(v.start_sale_date).format('YYYY-MM-DD') + ' 00:00:00',
          endDate: moment(v.end_sale_date).format('YYYY-MM-DD') + ' 23:59:59',
          showSaleEndDate: v.showSaleEndDate
        });
       }
     };
   }
   if (params.variants && params.variants.length > 0) {
     await ProductVariantValueRepository.createQueryBuilder().delete().where('productId = :id', { id: params.productId }).execute();
     // reversing the array because of certain reason and just to fullfill requirement of retaining variant order. so do not remove reverse
     const variantsValues = params.variants.reverse().map((item, index) => {
       const vv = new ProductVariantValue();
       vv.productId = params.productId;
       vv.variantId = item.id;
       vv.name = item.value;
       vv.value = item.value;
       return vv;
     });
     await ProductVariantValueRepository.save(variantsValues);
   }
   return response.status(200).send({ status: 1, message: "Updated Successfully!" });
 }

  // api/seller/product/question-list
  @Post("/question-list")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async questionList(@Body() params: GetQuestionListRequest, @Req() request: any, @Res() response: any): Promise<any> {
    const siteId = request.siteId;
    const userId = request.user.userId;
    let qali = await this.productQuestionsService.qaListForVendorr(params.limit,params.offset,siteId,userId,false,false);
    let total = await this.productQuestionsService.qaListForVendorr(params.limit,params.offset,siteId,userId,true,false);
    const pN = total / params.limit;
    const pages = Math.ceil(pN);
    let new_qali = qali.map(async i => {
      const rating = await this.productService.getProductRatingByProductId(i.productId);
      i.stars = rating.stars;
      i.avgRating = rating.avgRating;
      i.reviewCount = rating.reviewCount;
      return {
        ...i
      };
    });
    new_qali = await Promise.all(new_qali);
    const successResponse: any = {
      status: 1,
      message: "Successfully get all question List",
      data: new_qali,
      total: total,
      page: params.page,
      pages,
      // new_qali,
      CurrencySymbol: request.currencySymbol
    };
    return response.status(200).send(successResponse);
  }

  // api/seller/product/add-answer
  @Post("/add-answer")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async addAnswer(@Body() params: AddAnswerRequest,@Req() request: any,@Res() response: any): Promise<any> {
    const questionexist = await ProductQuestionsRepository.findOne({where: { id: params.productQuestionId }});
    if (!questionexist) {
      const successResponse: any = { status: 1, message: "no question" };
      return response.status(400).send(successResponse);
    }
    const answer = new ProductAnswers();
    answer.productQuestionId = params.productQuestionId;
    answer.answer = params.answer.replace(/[\u0800-\uFFFF]/g, '');
    answer.userId = request.user.userId;
    answer.userType = request.user.userType;
    questionexist.answered = 1;
    await ProductQuestionsRepository.save(questionexist);
    await ProductAnswersRepository.save(answer);
    const qali = await this.productQuestionsService.qaListForVendorr(50,0,request.siteId,request.user.userId,false,false);
    const results = await Promise.all(qali);
    const successResponse: any = {
      status: 1,
      message: "replied successfully",
      data: results,
    };
    return response.status(200).send(successResponse);
  }

   // api/seller/product/update-availability
   @Post("/update-availability")
   @UseGuards(AuthGuard)
   @Roles('seller')
   public async updateVariantAvailabilityStatus(@Body() params: UpdateProducctAvailabilityRequest,@Req() request: any,
   @Res() response: any): Promise<any> {
     const vendorId = request.user.userId;
     const data = await VendorProductVariantRepository.findOne({ where: { vendorId, id: params.vendorProductVariantId }});
     if (!data) {
       return response.status(400).send({ status: 1, message: "Invalid request", data: {} });
     }
     if (data.available == 1) {
       data.available = 0;
     } else {
       data.available = 1;
     }
     await VendorProductVariantRepository.save(data);
     return response.status(200).send({ status: 1, message: "Success", data: {} });
   }

    // api/seller/product/update-product-availability
  @Post("/update-Product-availability")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async updateProductAvailabilityStatus(@Body() params: UpdateProductAvailabilityForAllVariantsRequest,@Req() request: any,
  @Res() response: any): Promise<any> {
    const vendorId = request.user.userId;
    const allVariants = await VendorProductVariantRepository.find({ where: { vendorId, productId: params.productId }, });
    let alv: any = allVariants.map(async (i) => {
      const uresul: any = await this.productService.updateProductsAllVendorProdVar(i.id, i.vendorId); // available
      if (uresul.status === 0) {
        return response.status(400).send({ status: 0, message: uresul.message, data: {} });
      }
    });
    alv = Promise.all(alv);
    return response.status(200).send({ status: 1, message: "Success", data: {} });
  }

   // api/seller/product/active-deactive-product-v1
   @Post("/active-deactive-product-v1")
   @UseGuards(AuthGuard)
   @Roles('seller')
   public async activeDeactiveProductV1(@Body() params: activeDeactiveRequestV1,@Req() request: any,@Res() response: any): Promise<any> {
     const viewType = params.viewType;
     const vendorId = request.user.userId;
     if (viewType == 1) {
       const resl: any = await this.productService.updateProd(params.productId, vendorId); //statusId
       if (resl.status === 0) {
         return response.status(400).send({ status: 0, message: resl.message, data: {} });
       }
       const allVariants = await VendorProductVariantRepository.find({ where: { vendorId, productId: params.productId }, });
       let alv: any = allVariants.map(async (i) => {
         const uresul: any = await this.productService.updateVendorProdVar(i.id, i.vendorId); // isActive
         if (uresul.status === 0) {
           return response.status(400).send({ status: 0, message: uresul.message, data: {} });
         }
       });
       alv = Promise.all(alv);
       return response.status(200).send({ status: 1, message: "Success", data: {} });
     }
     else {
       const vPr = await VendorProductRepository.findOne({ where: { vendorId, productId: params.productId }, });
       if (!vPr) {
         return { status: 0, message: "No product found against given Id", data: {} };
       }
       const resul: any = await this.productService.updateVendorProdVar(params.productVariantId, vendorId);
       if (resul.status === 0) {
         return response.status(400).send({ status: 0, message: resul.message, data: {} });
       }
       if (vPr.statusId == 2) {
         const resl: any = await this.productService.updateProd(params.productId, vendorId); // enable
         if (resl.status === 0) {
           return response.status(400).send({ status: 0, message: resl.message + '(--)', data: {} });
         }
       }
       const allVars = await VendorProductVariantRepository.find({ where: { vendorId, productId: params.productId }, });
       // if (allVars === undefined || allVars.length == 0) {
       //   return response.status(400).send({ status: 0, message: "invalid productId (could not find variants for this product id", data: {} });
       // }
       // const allActiveVars = allVars.filter(i=>i.isActive==1);
       if (allVars.length > 0) {
         const allNonActiveVars = allVars.filter(i => i.isActive == 0);
         if (allVars.length == allNonActiveVars.length) {
           const res: any = await this.productService.updateProd(params.productId, vendorId);// disable
           if (res.status === 0) {
             return response.status(400).send({ status: 0, message: res.message, data: {} });
           }
           return response.status(200).send({ status: 1, message: "Success", data: {} });
         }
       }
       return response.status(200).send({ status: 1, message: "variant updated Successfully", data: {} });
     }
   }


    // api/seller/product/active-deactive-product
  @Post("/active-deactive-product")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async activeDeactiveProduct(@Body() params: activeDeactiveRequest,@Req() request: any,@Res() response: any): Promise<any> {
    const vendorId = request.user.userId;
    const resl: any = await this.productService.updateProd(params.productId, vendorId); //statusId
    if (resl.status === 0) {
      return response.status(400).send({ status: 0, message: resl.message, data: {} });
    }
    return response.status(200).send({ status: 1, message: "Success", data: {} });
  }

 // api/seller/product/other-seller-listing
 @Post("/other-seller-listing")
 @UseGuards(AuthGuard)
 @Roles('seller')
 public async otherSellerListing(@Body() params: otherSellerListing,@Req() request: any,@Res() response: any): Promise<any> {
   const successResponse: any = {
     status: 1,
     message: "list",
     pages: 0,
     data: [],
   };
   return response.status(200).send(successResponse);
 }

 // api/seller/product/get-product-attributes
 @Post("/get-product-attributes")
 @UseGuards(AuthGuard)
 @Roles('seller')
 public async getProductAttributesV2(@Req() request: any,@Res() response: any): Promise<any> {
   const siteId = request.siteId;
   const productId = request.query.productId;
   const vendorId = request.user.userId;
   let categoryId = request.query.catId;
   if (productId) {
     const vendorProduct = await this.productService.findProductRawQuery(
       productId,
       vendorId
     );
     const categories = await VendorProductCategoryRepository.find({ where: { vendorProductId: vendorProduct.vendorProductId }});
     const lastCategory: any = categories[categories.length - 1];
     categoryId = lastCategory.categoryId;
   }
   const selectedCategory = await this.categoryService.categoryPath(
     categoryId
   );
   let attributes = await this.attributeService.getProductAttributes(
     categoryId,
     siteId
   );
   attributes = attributes.map((v) => {
     return {
       ...v,
       value: null,
     };
   });
   let variants = await this.productService.variantsByCategoryId(
     categoryId,
     siteId
   );
   variants = variants.map((v) => {
     return {
       ...v,
       values: [],
     };
   });
   let taxClasses = await TaxClassRepository.find({ where: { isActive: 1 } });
   taxClasses = taxClasses.map(i => {
     return {
       ...i,
       selected: 0
     }
   });
   let productDetails;
   if (productId) {
     productDetails = await this.productService.productDetails(
       productId,
       vendorId,
       siteId,
       request.langId
     );
     // =======================================================================
     
     const varaintValues = await ProductVariantValueRepository.find({ where: { productId, isActive: 1 }, order: { id: 'ASC' }});
     variants = variants.map((item) => {
       const vv = varaintValues.filter((v) => v.variantId === item.id);
       return {
         ...item,
         values: vv,
       };
     });
     // get dynamic product attribute values and set into the array
     
     const dynamicAttrs = await ProductAttributeVendorValueRepository.find({ where: { productId }});
     attributes = attributes.map((item) => {
       // common attributes do not have id. dynamic attributes are comming from db
       if (item.id) {
         const a = dynamicAttrs.find((d) => d.productAttributeId === item.id);
         if (a) {
           return {
             ...item,
             value: a.productAttributeValueId,
           };
         }
       }
       return {
         ...item,
         value: null,
       };
     });

     taxClasses = taxClasses.map(i => {
       const o: any = {
         ...i
       }
       if (productDetails.taxClassId === i.id) {
         o.selected = 1;
       }
       return o;
     })
   }
   
   const warrantyTypes = await this.productWarrantyService.getProductWarrantyTypes(productDetails);
   const productWarranty =  await this.productWarrantyService.getProductWarranty(productDetails);
   const categoryD = await CategoryRepository.findOne({ where: { id: categoryId } });
   let freeShippingAllow: any = await VendorRepository.findOne({ where: { userId: vendorId } });
   freeShippingAllow = freeShippingAllow.canAddFreeShip;
   if (siteId == SitesEnum.US || siteId == SitesEnum.Pakistan) {
     freeShippingAllow = 1;
   }
   // sameDayProductPincodes and openBoxProductPincodes are for India only. check if there then add objects into productShippingInfo array for frontend side handling
   if (productDetails && productDetails.sameDayProductPincodes) {
     productDetails.productShippingInfo = [...productDetails.productShippingInfo, {
       charges: '0.00',
       charges2: 0,
       days: 0,
       id: 0,
       productId: productDetails.id,
       siteId,
       type: 'same-day',
       vendorId
     }]
   }
   if (productDetails && productDetails.openBoxProductPincodes) {
     productDetails.productShippingInfo = [...productDetails.productShippingInfo, {
       charges: '0.00',
       charges2: 0,
       days: 0,
       id: 0,
       productId: productDetails.id,
       siteId,
       type: 'open-box',
       vendorId
     }]
   }
   if (productDetails) {
     try {
       productDetails.bulletPoints = JSON.parse(productDetails.bulletPoints);
       if (!productDetails.bulletPoints) {
         productDetails.bulletPoints = [];
       }
     } catch (error) {
       productDetails.bulletPoints = [];
     }
   }
   const data: any = {
     attributes,
     variants,
     selectedCategory,
     productDetails,
     taxClasses,
     sizeChartRequired: categoryD.sizeChartImageRequired,
     freeShippingAllow: freeShippingAllow,
     warrantySettings: {
       warrantyTypes,
       ...productWarranty,
       // values
     }
   };
   return response.status(200).send({ status: 1, message: "", data });
 }

  // api/seller/product/category-list
  @Post("/category-list")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async ParentCategoryListRaw(@Req() request: any,@Res() response: any): Promise<any> {
    const siteId = request.siteId;
    const userId = request.user.userId;
    const langId = 1;
    const d = await this.categoryService.vendorCategories(siteId,null,langId,userId);
    return response.status(200).send({ status: 1, data: d });
  }

  // api/seller/product/mark-favorite-category
  @Post("/mark-favorite-category")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async markfavorite(@Body() params: MarkCategoryFavoriteRequest,@Req() request: any,@Res() response: any): Promise<any> {
    const siteId = request.siteId;
    const userId = request.user.userId;
    const checkFavCategory: any =
    await UserFavCategoryRepository.findOne({ where: { siteId, catId: params.catId, userId }});
    if (!checkFavCategory) {
      const newFavCat = new UserFavCategory();
      newFavCat.userId = userId;
      newFavCat.siteId = siteId;
      newFavCat.catId = params.catId;
      const FavCatSave = await UserFavCategoryRepository.save(newFavCat);
      return response.status(200).send({status: 1,message: "Fav category Created Successfully",data: FavCatSave});
    }
    await UserFavCategoryRepository.delete({id: checkFavCategory.id});
    return response.status(200).send({status: 1,message: "Fav Category Deleted Successfully",data: {}});
  }

  // api/seller/product/create-combo-offer
  @Post("/create-combo-offer")
  @UseGuards(AuthGuard)
  @Roles('seller')
  public async createComboOffer(@Body() params: CreateComboOfferRequest,@Req() request: any,@Res() response: any): Promise<any> {
    // const siteId = request.siteId;
    const userId = request.user.userId;
    const co = new ComboOffer();
    co.name = params.name;
    co.description = params.description;
    co.vendorId = userId;
    co.isActive = 1;
    co.type = params.type;
    co.discount = params.amount;
    co.productIds = params.productIds.toString();
    await ComboOfferRepository.save(co);
    return response
      .status(200)
      .send({ status: 1, message: "Combo Offer Created!", data: {} });
  }

   // api/seller/product/remove-variants
   @Post("/remove-variants")
   @UseGuards(AuthGuard)
   @Roles('seller')
   public async removeVariants(@Body() params: removeVariantsRequest, @Req() request: any, @Res() response: any): Promise<any> {
     const vendorId = request.user.userId;
     const vendorProductVariant = await VendorProductVariantRepository.findOne({ where: { id: params.vendorProductVariantId, vendorId } });
     await ProductVariantRepository.createQueryBuilder().update().where('id = :id', { id: vendorProductVariant.productVariantId }).set({ isActive: 0 }).execute();
     await VendorProductVariantRepository.createQueryBuilder().update().where('id =:id', { id: params.vendorProductVariantId }).set({ isActive: 0 }).execute();
     if (params.valueFor_ProductVariantValueTable) {
       await ProductVariantValueRepository.createQueryBuilder().update().where('productId = :productId AND name = :name', { productId: vendorProductVariant.productId, name: params.valueFor_ProductVariantValueTable })
         .set({ isActive: 0 })
         .execute();
     }
     return response.status(200).send({ status: 1, message: 'sucess' });
   }

   @Post("/choose-related-product")
   @UseGuards(AuthGuard)
   @Roles('seller')
  public async getRelatedProductSuggestions(@Body() params: relatedProductSuggestionRequest, @Req() request: any,
  @Res() response: any): Promise<any> {
    const siteId = request.siteId;
    const limit = params.limit;
    const offset = params.page === 1 ? 0 : limit * params.page - limit;
    const statusId = params.statusId;
    const vendorId = request.user.userId;
    const viewType = params.viewType;
    const keyword = params.keyword;
    const categoryId = params.parentCategoryId;
    const type = params.type
    const otherSeller = params.otherSeller
    const productId = params.productId

    let { vendorRelatedProducts } = await this.productService.relatedProductSuggestion({siteId,limit,offset,statusId,vendorId,viewType,
      keyword,categoryId,type,otherSeller,productId
    });

    const pageNumber = params.page;

    const vendorPN = vendorRelatedProducts.totalCount / limit;
    const vendorPages = Math.ceil(vendorPN);

    let vendorData = vendorRelatedProducts.data.map((item) => {
      return {
        ...item,
        currencySymbol: request.currencySymbol
      }
    });
    const siteData = await SiteRepository.findOne({ where: { id: request.siteId } });
    const successResponse: any = {
      status: 1,
      message: "related products suggestions",
      products: vendorRelatedProducts.totalCount,
      page: pageNumber,
      vendorPages,
      siteData: {
        websiteLink: siteData.websiteLink,
      },
      vendorData,
    };

    return response.status(200).send(successResponse);

  }

   //TODO make a request validation class for the below api
   @Post('/get-related-products')
   @UseGuards(AuthGuard)
   @Roles('seller')
   public async getRelatedProduct(@Body() params: getRelatedProductRequest, @Req() request: any, @Res() response: any): Promise<any> {
     const siteId = request.siteId;
     const limit = params.limit;
     const offset = params.page === 1 ? 0 : limit * params.page - limit;
     const statusId = params.statusId;
     const vendorId = request.user.userId;
     const viewType = params.viewType;
     const keyword = params.keyword;
     const productId = params.productId
 
     let { vendorRelatedProducts } = await this.productService.relatedProducts({siteId,limit,offset,statusId,vendorId,viewType,keyword,
      productId
     });
 
     const pageNumber = params.page;
 
     const vendorPN = vendorRelatedProducts.totalCount / limit;
     const vendorPages = Math.ceil(vendorPN);
 
     let vendorData = vendorRelatedProducts.data.map((item, index) => {
       return {
         ...item,
         currencySymbol: request.currencySymbol
       }
     });
     const siteData = await SiteRepository.findOne({ where: { id: request.siteId } });
     const successResponse: any = {
       status: 1,
       message: "related products suggestions",
       products: vendorRelatedProducts.totalCount,
       page: pageNumber,
       vendorPages,
       siteData: {
         websiteLink: siteData.websiteLink,
       },
       vendorData,
     };
     return response.status(200).send(successResponse);
   }

}
