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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const exceljs_1 = require("exceljs");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const moment_1 = require("moment");
const database_1 = require("../database");
const roles_decorator_1 = require("../decorators/roles.decorator");
const auth_guard_1 = require("../gaurds/auth.guard");
const ProductService_1 = require("../services/ProductService");
const requests_1 = require("../requests");
const S3Service_1 = require("../services/S3Service");
const VendorProductVariantService_1 = require("../services/VendorProductVariantService");
const ProductDiscount_1 = require("../database/models/ProductDiscount");
const createProductRequest_1 = require("../requests/createProductRequest");
const UserService_1 = require("../services/UserService");
const Product_1 = require("../database/models/Product");
const utils_1 = require("../utils");
const VendorProduct_1 = require("../database/models/VendorProduct");
const ProductWarranty_1 = require("../services/ProductWarranty");
const ProductMetaInfo_1 = require("../database/models/ProductMetaInfo");
const ProductVariantValue_1 = require("../database/models/ProductVariantValue");
const ProductVariant_1 = require("../database/models/ProductVariant");
const VendorProductVariant_1 = require("../database/models/VendorProductVariant");
const VendorProductStatusLog_1 = require("../database/models/VendorProductStatusLog");
const ProductAttributeVendorValue_1 = require("../database/models/ProductAttributeVendorValue");
const OpenBoxProductPincodeService_1 = require("../services/OpenBoxProductPincodeService");
const SameDayProductPincodeService_1 = require("../services/SameDayProductPincodeService");
const RelatedProductService_1 = require("../services/RelatedProductService");
const EditProductRequest_1 = require("../requests/EditProductRequest");
const ProductShippingInfo_1 = require("../database/models/ProductShippingInfo");
const ProductQuestionsService_1 = require("../services/ProductQuestionsService");
const ProductAnswers_1 = require("../database/models/ProductAnswers");
const CategoryService_1 = require("../services/CategoryService");
const AttributeService_1 = require("../services/AttributeService");
const UserFavCategory_1 = require("../database/models/UserFavCategory");
const ComboOffer_1 = require("../database/models/ComboOffer");
const OpenBoxProductPincodes_1 = require("../database/models/OpenBoxProductPincodes");
const SameDayProductPincodes_1 = require("../database/models/SameDayProductPincodes");
let ProductController = class ProductController {
    constructor(productService, s3Service, vendorProductVariantService, userService, productWarrantyService, openBoxProductPincodeService, sameDayProductPincodeService, relatedProductSevice, productQuestionsService, categoryService, attributeService) {
        this.productService = productService;
        this.s3Service = s3Service;
        this.vendorProductVariantService = vendorProductVariantService;
        this.userService = userService;
        this.productWarrantyService = productWarrantyService;
        this.openBoxProductPincodeService = openBoxProductPincodeService;
        this.sameDayProductPincodeService = sameDayProductPincodeService;
        this.relatedProductSevice = relatedProductSevice;
        this.productQuestionsService = productQuestionsService;
        this.categoryService = categoryService;
        this.attributeService = attributeService;
    }
    async preferenceListing(request, response) {
        const userId = request.user.userId;
        const vendorPreferences = await database_1.UserProductPreferenceRepository.find({ where: { userId } });
        if (vendorPreferences.length === 0) {
            await this.productService.createDefaultPreferences(userId);
        }
        const preferences = await this.productService.productTablePreferences(userId);
        return response.status(200).send({ status: 1, message: "", data: preferences });
    }
    async setOrderPreference(request, response) {
        const userId = request.user.userId;
        let productPreferences = await database_1.UserProductPreferenceRepository.find({ where: { userId } });
        productPreferences = productPreferences.map((item) => item.id);
        if (productPreferences.length) {
            await database_1.UserProductPreferenceRepository.delete(productPreferences);
        }
        let latestProductPreferences = request.body.ids;
        latestProductPreferences = latestProductPreferences.map((productPreferenceId) => {
            return { userId, productPreferenceId };
        });
        await database_1.UserProductPreferenceRepository.save(latestProductPreferences);
        ;
        const data = await this.productService.productTablePreferences(userId);
        return response.status(200).send({ status: 1, message: "Product preferences list", data });
    }
    async productsExport(params, request, response) {
        const vendorId = request.user.userId;
        const preferenceIds = params.prefIds;
        let preferences = await database_1.ProductPreferenceRepository.find({ where: { id: (0, typeorm_1.In)(preferenceIds), isActive: 1 } });
        if (preferences.length !== preferenceIds.length) {
            return response.status(400).send({ status: 1, message: "Invalid preference ids input", data: {} });
        }
        let { data: productsList } = await this.productService.productListing({ siteId: request.siteId, limit: 0, offset: 0,
            statusId: 0, vendorId, viewType: 0,
        });
        productsList = productsList.map((product) => {
            const requiredProductFields = {};
            Object.entries(product).map((key, value) => {
                const isValidPreference = preferences.find((pref) => pref.col === key[0]);
                if (isValidPreference) {
                    Object.assign(requiredProductFields, { [key[0]]: key[1] });
                }
            });
            return requiredProductFields;
        });
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("products");
        worksheet.properties.defaultRowHeight = 30;
        let columns = productsList[0];
        columns = Object.keys(columns).map((key) => {
            return { header: key, key, size: 16, width: 30 };
        });
        worksheet.columns = columns;
        let rows = productsList.map(async (product, itemIndex) => {
            const productInterface = Object.entries(product).map(async (i, index) => {
                const key = i[0];
                const value = i[1];
                if (key == "variant") {
                    const variantValue = value.map((variant) => {
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
                    const imageId = workbook.addImage({ base64: src, extension: "jpeg", });
                    worksheet.addImage(imageId, {
                        tl: { col: index, row: itemIndex + 1 }, ext: { width: 30, height: 30 },
                        hyperlinks: { hyperlink: process.env.BUCKET_BASE_URL + `${value}`, tooltip: process.env.BUCKET_BASE_URL + `${value}` },
                    });
                    return "";
                }
                return value;
            });
            return await Promise.all(productInterface);
        });
        rows = await Promise.all(rows);
        worksheet.addRows(rows);
        const fileName = "product-list" + Date.now() + ".xlsx";
        const excelFile = await workbook.xlsx.writeBuffer(fileName);
        const filePath = await this.s3Service.fileUploadBase64(`excel-exports/${fileName}`, excelFile);
        return response.status(200).send({ status: 1, message: "Product listing exported", data: { path: filePath.path } });
    }
    async productListings(params, request, response) {
        const siteId = request.siteId;
        const limit = 10;
        const offset = params.page === 1 ? 0 : limit * params.page - limit;
        const statusId = params.statusId;
        const vendorId = request.user.userId;
        const viewType = params.viewType;
        const keyword = params.keyword;
        const sellerViewToken = jsonwebtoken_1.default.sign({ id: vendorId }, 'sellerViewToken', { expiresIn: '365d' });
        let { data, totalCount } = await this.productService.productListing({ siteId, limit, offset, statusId, vendorId, viewType, keyword });
        const pN = totalCount / limit;
        const pageNumber = params.page;
        const pages = Math.ceil(pN);
        const stats = await this.productService.productListingCountStats({ siteId, vendorId, viewType, statusId: 0 });
        data = data.map((item) => {
            return {
                ...item, currencySymbol: request.currencySymbol
            };
        });
        const siteData = await database_1.SiteRepository.findOne({ where: { id: request.siteId } });
        data = data.map(i => {
            if (i.statusId && i.statusId === 5) {
                i.slug = `${i.slug}?sellerView=${sellerViewToken}`;
            }
            return i;
        });
        const successResponse = {
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
    async updateProductStock(params, request, response) {
        const siteId = request.siteId;
        const vendorId = request.user.userId;
        const productId = params.productId;
        const productVariantId = params.productVariantId;
        const data = await database_1.VendorProductVariantRepository.findOne({ where: { vendorId, siteId, productId, productVariantId } });
        if (!data) {
            return response.status(400).send({ status: 1, message: "Invalid request", data: {} });
        }
        data.quantity = params.quantity;
        if (params.quantity === 0) {
            data.outOfStock = 1;
        }
        else {
            data.outOfStock = 0;
        }
        const upData = await database_1.VendorProductVariantRepository.save(data);
        return response.status(200).send({ status: 1, message: "Success", data: upData });
    }
    async updateProductVariantPrice(params, request, response) {
        const siteId = request.siteId;
        const vendorId = request.user.userId;
        const productId = params.productId;
        const productVariantId = params.productVariantId;
        const data = await database_1.VendorProductVariantRepository.findOne({ where: { vendorId, siteId, productId, productVariantId } });
        if (!data) {
            return response.status(400).send({ status: 1, message: "Invalid request", data: {} });
        }
        let amountInclusiveOfTax = '0';
        const VP = await database_1.VendorProductRepository.findOne({ where: { productId, vendorId, siteId } });
        if (VP.taxClassId) {
            amountInclusiveOfTax = await this.productService.calculateTaxForIndiaByClass(params.price.toString(), VP.taxClassId);
        }
        data.price2 = params.price;
        if (amountInclusiveOfTax != '0') {
            data.price = amountInclusiveOfTax;
        }
        else {
            data.price = params.price;
        }
        const updated = await database_1.VendorProductVariantRepository.save(data);
        return response.status(200).send({ status: 1, message: "Success", data: { price: updated.price } });
    }
    async updateDiscountPrice(params, request, response) {
        const siteId = request.siteId;
        const vendorId = request.user.userId;
        const productId = params.productId;
        const productVariantId = params.productVariantId;
        let upPrice;
        let data = await database_1.VendorProductVariantRepository.findOne({ where: { vendorId, siteId, productId, productVariantId } });
        if (!data) {
            return response.status(400).send({ status: 1, message: "Invalid request", data: {} });
        }
        let amountInclusiveOfTax = '0';
        const VP = await database_1.VendorProductRepository.findOne({ where: { productId, vendorId, siteId } });
        if (VP.taxClassId) {
            amountInclusiveOfTax = await this.productService.calculateTaxForIndiaByClass(params.price.toString(), VP.taxClassId);
        }
        data.price2 = params.price;
        if (amountInclusiveOfTax != '0') {
            data.price = amountInclusiveOfTax;
        }
        else {
            data.price = params.price;
        }
        data = await database_1.VendorProductVariantRepository.save(data);
        const discount = await database_1.ProductDiscountRepository.findOne({ where: { vendorProductVariantId: data.id } });
        amountInclusiveOfTax = '0';
        if (VP.taxClassId) {
            amountInclusiveOfTax = await this.productService.calculateTaxForIndiaByClass(params.discountPrice.toString(), VP.taxClassId);
        }
        if (discount) {
            discount.price2 = params.discountPrice;
            if (amountInclusiveOfTax != '0') {
                discount.price = amountInclusiveOfTax;
            }
            else {
                discount.price = params.discountPrice;
            }
            discount.startDate = (0, moment_1.default)(params.startDate).format("YYYY-MM-DD") + ' 00:00:00';
            discount.endDate = (0, moment_1.default)(params.endDate).format("YYYY-MM-DD") + ' 23:59:59';
            discount.showSaleEndDate = params.showSaleEndDate;
            upPrice = await database_1.ProductDiscountRepository.save(discount);
        }
        else {
            const newD = new ProductDiscount_1.ProductDiscount();
            newD.price2 = params.discountPrice;
            if (amountInclusiveOfTax != '0') {
                newD.price = amountInclusiveOfTax;
            }
            else {
                newD.price = params.discountPrice;
            }
            newD.startDate = params.startDate;
            newD.endDate = params.endDate;
            newD.vendorProductVariantId = data.id;
            newD.showSaleEndDate = params.showSaleEndDate;
            upPrice = await database_1.ProductDiscountRepository.save(newD);
        }
        return response.status(200).send({ status: 1, message: "Success", data: { price: data.price2, discountPrice: upPrice.price2,
                startDate: upPrice.startDate, endDate: upPrice.endDate },
        });
    }
    async deleteDiscountOffer(params, request, response) {
        await database_1.ProductDiscountRepository.createQueryBuilder().delete().where('vendorProductVariantId = :id', { id: params.vendorProductVariantId }).execute();
        return response.status(200).send({ status: 1, message: "Success", data: {} });
    }
    async createProduct(params, request, response) {
        for (const v of params.variants_info) {
            if (v.sale_price) {
                if (parseFloat(v.sale_price) > parseFloat(v.price)) {
                    return response.status(400).send({ status: 0, message: "Discount price should be less than price", data: {} });
                }
            }
        }
        const siteId = request.siteId;
        const vendorId = request.user.userId;
        const checkProfile = await this.userService.checkVendorProfileCompleted(vendorId);
        if (checkProfile.vendorProfileCompleted === 0) {
            return response.status(400).send({ status: 0, message: "Please complete your profile to create products!", data: checkProfile });
        }
        let p = new Product_1.Product();
        p.name = params.p_name;
        p.longDesc = params.long_desc;
        p.descEditorDesign = params.desc_editor_design;
        p.moreInformation = params.moreInformation;
        p.bulletPoints = JSON.stringify(params.bulletPoints);
        p = await database_1.ProductRepository.save(p);
        const csin = await (0, utils_1.productSlug)(siteId, p.id);
        const slug = await this.productService.checkAndGenerateSlug(params.slug);
        let vp = new VendorProduct_1.VendorProduct();
        if (checkProfile.productAutoApproval == 1) {
            vp.statusId = 1;
        }
        vp.fakeOrders = checkProfile.isCybermartSeller == 1 ? params.fakeOrders : 0;
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
        vp = await database_1.VendorProductRepository.save(vp);
        await this.productWarrantyService.insertWarranty(params.warrantySettings, vp.id);
        let pmi = new ProductMetaInfo_1.ProductMetaInfo();
        pmi.productId = p.id;
        pmi.siteId = siteId;
        pmi.langId = request.langId;
        pmi.title = params.title ? params.title : params.p_name;
        pmi.description = params.description ? params.description : params.title;
        pmi.keyword = params.keyword ? params.keyword : params.p_name;
        pmi = await database_1.ProductMetaInfoRepository.save(pmi);
        if (params.variants && params.variants.length > 0) {
            const variantsValues = params.variants.map((item, index) => {
                const vv = new ProductVariantValue_1.ProductVariantValue();
                vv.productId = p.id;
                vv.variantId = item.id;
                vv.name = item.value;
                vv.value = item.value;
                return vv;
            });
            await database_1.ProductVariantValueRepository.save(variantsValues);
        }
        for (let i = 0; i < params.variants_info.length; i++) {
            const v = params.variants_info[i];
            const whereCondition = {
                sku: v.sku,
                vendorId: vendorId
            };
            const vv = v.variant_value;
            const pv = new ProductVariant_1.ProductVariant();
            pv.productId = p.id;
            pv.productVariantValuesId = JSON.stringify(vv);
            const pvariant = await database_1.ProductVariantRepository.save(pv);
            const vpv = new VendorProductVariant_1.VendorProductVariant();
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
            const vendorProductVariant = await database_1.VendorProductVariantRepository.save(vpv);
            v.images.map(async (image) => {
                await database_1.ProductVariantImageRepository.save({
                    image: image.image,
                    isDefault: image.is_default,
                    variantId: image.variantId,
                    isActive: 1,
                    productVariantsId: pvariant.id,
                });
            });
            if (v.sale_price) {
                await database_1.ProductDiscountRepository.save({
                    vendorProductVariantId: vendorProductVariant.id,
                    price: await this.productService.calculateTaxForIndiaByClass(v.sale_price, params.tax_class_handling),
                    price2: this.productService.handleProductPrice2(v.sale_price, params.tax_class_handling),
                    startDate: (0, moment_1.default)(v.start_sale_date).format('YYYY-MM-DD') + ' 00:00:00',
                    endDate: (0, moment_1.default)(v.end_sale_date).format('YYYY-MM-DD') + ' 23:59:59',
                    showSaleEndDate: v.showSaleEndDate
                });
            }
        }
        const p_cats = params.categories.map((cat, i) => {
            return { categoryId: cat, vendorProductId: vp.id };
        });
        await database_1.VendorProductCategoryRepository.save(p_cats);
        ;
        const asd = params.shipping.filter(i => i.type != 'open-box' && i.type != 'same-day').map(async (item, index) => {
            return { days: item.days, charges: item.charges, charges2: item.charges, type: item.type, siteId: siteId, vendorId: vendorId,
                productId: p.id,
            };
        });
        const shippingArr = await Promise.all(asd);
        await database_1.ProductShippingInfoRepository.save(shippingArr);
        const plog = new VendorProductStatusLog_1.VendorProductStatusLog();
        plog.productId = p.id;
        plog.vendorId = vendorId;
        plog.productStatus = utils_1.ProductStatusEnum.Draft;
        await database_1.VendorProductStatusLogRepository.save(plog);
        const dynamicAttrs = params.additionalInfo.map((item, i) => {
            const a = new ProductAttributeVendorValue_1.ProductAttributeVendorValue();
            a.categoryId = item.categoryId;
            a.productAttributeId = item.productAttributesId;
            a.productAttributeValueId = item.optionValue;
            a.productId = p.id;
            return a;
        });
        const obProduct = params.shipping.find(option => option.type === 'open-box');
        const sdProduct = params.shipping.find(option => option.type === 'same-day');
        if (obProduct) {
            await this.openBoxProductPincodeService.setOpenBoxProductPincodes(vendorId, p.id, obProduct.pincodes);
        }
        if (sdProduct) {
            await this.sameDayProductPincodeService.setSameDayProductPincodes(vendorId, p.id, sdProduct.pincodes);
        }
        if (params.relatedVariantIds && params.relatedVariantIds.length > 0) {
            await this.relatedProductSevice.setRelatedProducts(Number(p.id), params.relatedVariantIds);
        }
        await database_1.ProductAttributeVendorValueRepository.save(dynamicAttrs);
        return response.status(200).send({ status: 1, message: "Product Created" });
    }
    async editProduct(params, request, response) {
        const productInfo = await database_1.ProductRepository.findOne({ where: { id: params.productId } });
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
        await database_1.ProductRepository.save(productInfo);
        const vendorProductInfo = await database_1.VendorProductRepository.findOne({ where: { vendorId: params.vendorId, productId: params.productId } });
        const checkVendorProfile = await this.userService.checkVendorProfileCompleted(params.vendorId);
        const csin = (0, utils_1.productSlug)(request.siteId, params.productId);
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
        }
        else {
            vendorProductInfo.taxClassId = null;
        }
        if (params.sizeChartImage) {
            vendorProductInfo.sizeChartImage = params.sizeChartImage;
        }
        else {
            vendorProductInfo.sizeChartImage = null;
        }
        vendorProductInfo.fakeOrders = checkVendorProfile.isCybermartSeller == 1 ? params.fakeOrders : 0;
        await database_1.VendorProductRepository.save(vendorProductInfo);
        const productmetaInfo = await database_1.ProductMetaInfoRepository.findOne({ where: { productId: params.productId, siteId: request.siteId, langId: request.langId } });
        if (!productmetaInfo) {
            let pmi = new ProductMetaInfo_1.ProductMetaInfo();
            pmi.productId = params.productId;
            pmi.siteId = request.siteId;
            pmi.langId = request.langId;
            pmi.title = params.title ? params.title : params.p_name;
            pmi.description = params.description ? params.description : params.title;
            pmi.keyword = params.keyword ? params.keyword : params.p_name;
            pmi = await database_1.ProductMetaInfoRepository.save(pmi);
        }
        else {
            productmetaInfo.title = params.title ? params.title : params.p_name;
            productmetaInfo.description = params.description ? params.description : params.title;
            productmetaInfo.keyword = params.keyword ? params.keyword : params.p_name;
            await database_1.ProductMetaInfoRepository.save(productmetaInfo);
        }
        await database_1.ProductShippingInfoRepository.createQueryBuilder()
            .where('vendorId = :vendorId AND productId = :productId AND siteId = :siteId', { vendorId: params.vendorId, productId: params.productId, siteId: request.siteId }).delete().execute();
        await database_1.ProductShippingInfoRepository.createQueryBuilder()
            .where('vendorId = :vendorId AND productId = :productId AND siteId = :siteId', { vendorId: params.vendorId, productId: params.productId, siteId: request.siteId }).delete().execute();
        const asd = params.shipping.filter(i => i.type != 'open-box' && i.type != 'same-day').map(async (item) => {
            return {
                days: item.days, charges: item.charges, charges2: item.charges, type: item.type, siteId: request.siteId, vendorId: params.vendorId,
                productId: params.productId,
            };
        });
        await this.productWarrantyService.updateWarranty(params.warrantySettings, vendorProductInfo.id);
        const shippingArr = await Promise.all(asd);
        const obProduct = params.shipping.find(option => option.type === 'open-box');
        const sdProduct = params.shipping.find(option => option.type === 'same-day');
        if (obProduct) {
            await this.openBoxProductPincodeService.setOpenBoxProductPincodes(params.vendorId, params.productId, obProduct.pincodes);
        }
        else {
            await database_1.ProductShippingInfoRepository.createQueryBuilder('PSI').delete().from(ProductShippingInfo_1.ProductShippingInfo)
                .where('product_id = :pId', { pId: params.productId }).andWhere('type = :x', { x: 'open-box' }).execute();
            await database_1.OpenBoxProductPincodeRepository.createQueryBuilder('SDP').delete().from(OpenBoxProductPincodes_1.OpenBoxProductPincodes)
                .where('vendor_id = :vid', { vid: params.vendorId }).andWhere('product_id = :pid', { pid: params.productId }).execute();
        }
        if (sdProduct) {
            await this.sameDayProductPincodeService.setSameDayProductPincodes(params.vendorId, params.productId, sdProduct.pincodes);
        }
        else {
            await database_1.ProductShippingInfoRepository.createQueryBuilder('PSI').delete().from(ProductShippingInfo_1.ProductShippingInfo)
                .where('product_id = :pId', { pId: params.productId }).andWhere('type = :x', { x: 'same-day' }).execute();
            await database_1.SameDayProductPincodeRepository.createQueryBuilder('SDP').delete().from(SameDayProductPincodes_1.SameDayProductPincodes)
                .where('vendor_id = :vid', { vid: params.vendorId }).andWhere('product_id = :pid', { pid: params.productId }).execute();
        }
        await this.relatedProductSevice.setRelatedProducts(Number(params.productId), params.relatedVariantIds);
        await database_1.ProductShippingInfoRepository.save(shippingArr);
        const variantsForUpdate = params.variants_info.filter(i => i.vendorProductVariantId !== 0);
        const newProductVariants = params.variants_info.filter(i => i.vendorProductVariantId === 0);
        for (let i = 0; i < variantsForUpdate.length; i++) {
            const item = variantsForUpdate[i];
            const pvv = await database_1.ProductVariantRepository.findOne({ where: { id: item.productVariantId } });
            pvv.productVariantValuesId = JSON.stringify(item.variant_value);
            await database_1.ProductVariantRepository.save(pvv);
            const variantInfo = await database_1.VendorProductVariantRepository.findOne({ where: { id: item.vendorProductVariantId } });
            if (variantInfo) {
                const whereCondition = {
                    sku: item.sku,
                    id: (0, typeorm_1.Not)(item.vendorProductVariantId),
                    vendorId: params.vendorId
                };
                variantInfo.price = await this.productService.calculateTaxForIndiaByClass(item.price, params.tax_class_handling);
                variantInfo.price2 = this.productService.handleProductPrice2(item.price, params.tax_class_handling);
                variantInfo.sku = await this.vendorProductVariantService.checkAndGenerateSKU(item.sku, whereCondition, params.vendorId);
                variantInfo.quantity = item.quantity;
                variantInfo.is_default = item.is_default;
                variantInfo.outOfStock = Number(item.quantity) > 0 ? 0 : 1;
                await database_1.VendorProductVariantRepository.save(variantInfo);
                const discountInfo = await database_1.ProductDiscountRepository.findOne({ where: { vendorProductVariantId: item.vendorProductVariantId } });
                if (item.sale_price) {
                    if (discountInfo) {
                        discountInfo.price = await this.productService.calculateTaxForIndiaByClass(item.sale_price, params.tax_class_handling);
                        discountInfo.price2 = this.productService.handleProductPrice2(item.sale_price, params.tax_class_handling);
                        discountInfo.startDate = (0, moment_1.default)(item.start_sale_date).format('YYYY-MM-DD') + ' 00:00:00';
                        discountInfo.endDate = (0, moment_1.default)(item.end_sale_date).format('YYYY-MM-DD') + ' 23:59:59';
                        discountInfo.showSaleEndDate = item.showSaleEndDate;
                        await database_1.ProductDiscountRepository.save(discountInfo);
                    }
                    else {
                        await database_1.ProductDiscountRepository.save({
                            vendorProductVariantId: item.vendorProductVariantId,
                            price: await this.productService.calculateTaxForIndiaByClass(item.sale_price, params.tax_class_handling),
                            price2: this.productService.handleProductPrice2(item.sale_price, params.tax_class_handling),
                            startDate: (0, moment_1.default)(item.start_sale_date).format(utils_1.AppLevelDateTimeFormat),
                            endDate: (0, moment_1.default)(item.end_sale_date).format(utils_1.AppLevelDateTimeFormat),
                            showSaleEndDate: item.showSaleEndDate
                        });
                    }
                }
                if (discountInfo) {
                    if (!item.sale_price) {
                        await database_1.ProductDiscountRepository.createQueryBuilder().delete().where('vendorProductVariantId = :id', { id: item.vendorProductVariantId }).execute();
                    }
                }
                await database_1.ProductVariantImageRepository.createQueryBuilder().where('productVariantsId = :productVariantId', { productVariantId: item.productVariantId })
                    .delete().execute();
                for (let imageIndex = 0; imageIndex < item.images.length; imageIndex++) {
                    const image = item.images[imageIndex];
                    await database_1.ProductVariantImageRepository.save({
                        image: image.image,
                        isDefault: image.is_default,
                        variantId: image.variantId,
                        isActive: 1,
                        productVariantsId: item.productVariantId,
                    });
                }
            }
        }
        ;
        if (newProductVariants.length > 0) {
            for (let ii = 0; ii < newProductVariants.length; ii++) {
                const v = newProductVariants[ii];
                const whereCondition = {
                    sku: v.sku,
                    id: (0, typeorm_1.Not)(v.vendorProductVariantId),
                    vendorId: params.vendorId
                };
                const vv = v.variant_value;
                const pv = new ProductVariant_1.ProductVariant();
                pv.productId = params.productId;
                pv.productVariantValuesId = JSON.stringify(vv);
                const pvariant = await database_1.ProductVariantRepository.save(pv);
                const vpv = new VendorProductVariant_1.VendorProductVariant();
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
                const vendorProductVariant = await database_1.VendorProductVariantRepository.save(vpv);
                for (let newImageIndex = 0; newImageIndex < v.images.length; newImageIndex++) {
                    const image = v.images[newImageIndex];
                    await database_1.ProductVariantImageRepository.save({
                        image: image.image,
                        isDefault: image.is_default,
                        variantId: image.variantId,
                        isActive: 1,
                        productVariantsId: pvariant.id,
                    });
                }
                if (v.sale_price) {
                    await database_1.ProductDiscountRepository.save({
                        vendorProductVariantId: vendorProductVariant.id,
                        price: await this.productService.calculateTaxForIndiaByClass(v.sale_price, params.tax_class_handling),
                        price2: this.productService.handleProductPrice2(v.sale_price, params.tax_class_handling),
                        startDate: (0, moment_1.default)(v.start_sale_date).format('YYYY-MM-DD') + ' 00:00:00',
                        endDate: (0, moment_1.default)(v.end_sale_date).format('YYYY-MM-DD') + ' 23:59:59',
                        showSaleEndDate: v.showSaleEndDate
                    });
                }
            }
            ;
        }
        if (params.variants && params.variants.length > 0) {
            await database_1.ProductVariantValueRepository.createQueryBuilder().delete().where('productId = :id', { id: params.productId }).execute();
            const variantsValues = params.variants.reverse().map((item, index) => {
                const vv = new ProductVariantValue_1.ProductVariantValue();
                vv.productId = params.productId;
                vv.variantId = item.id;
                vv.name = item.value;
                vv.value = item.value;
                return vv;
            });
            await database_1.ProductVariantValueRepository.save(variantsValues);
        }
        return response.status(200).send({ status: 1, message: "Updated Successfully!" });
    }
    async questionList(params, request, response) {
        const siteId = request.siteId;
        const userId = request.user.userId;
        let qali = await this.productQuestionsService.qaListForVendorr(params.limit, params.offset, siteId, userId, false, false);
        let total = await this.productQuestionsService.qaListForVendorr(params.limit, params.offset, siteId, userId, true, false);
        const pN = total / params.limit;
        const pages = Math.ceil(pN);
        let new_qali = qali.map(async (i) => {
            const rating = await this.productService.getProductRatingByProductId(i.productId);
            i.stars = rating.stars;
            i.avgRating = rating.avgRating;
            i.reviewCount = rating.reviewCount;
            return {
                ...i
            };
        });
        new_qali = await Promise.all(new_qali);
        const successResponse = {
            status: 1,
            message: "Successfully get all question List",
            data: new_qali,
            total: total,
            page: params.page,
            pages,
            CurrencySymbol: request.currencySymbol
        };
        return response.status(200).send(successResponse);
    }
    async addAnswer(params, request, response) {
        const questionexist = await database_1.ProductQuestionsRepository.findOne({ where: { id: params.productQuestionId } });
        if (!questionexist) {
            const successResponse = { status: 1, message: "no question" };
            return response.status(400).send(successResponse);
        }
        const answer = new ProductAnswers_1.ProductAnswers();
        answer.productQuestionId = params.productQuestionId;
        answer.answer = params.answer.replace(/[\u0800-\uFFFF]/g, '');
        answer.userId = request.user.userId;
        answer.userType = request.user.userType;
        questionexist.answered = 1;
        await database_1.ProductQuestionsRepository.save(questionexist);
        await database_1.ProductAnswersRepository.save(answer);
        const qali = await this.productQuestionsService.qaListForVendorr(50, 0, request.siteId, request.user.userId, false, false);
        const results = await Promise.all(qali);
        const successResponse = {
            status: 1,
            message: "replied successfully",
            data: results,
        };
        return response.status(200).send(successResponse);
    }
    async updateVariantAvailabilityStatus(params, request, response) {
        const vendorId = request.user.userId;
        const data = await database_1.VendorProductVariantRepository.findOne({ where: { vendorId, id: params.vendorProductVariantId } });
        if (!data) {
            return response.status(400).send({ status: 1, message: "Invalid request", data: {} });
        }
        if (data.available == 1) {
            data.available = 0;
        }
        else {
            data.available = 1;
        }
        await database_1.VendorProductVariantRepository.save(data);
        return response.status(200).send({ status: 1, message: "Success", data: {} });
    }
    async updateProductAvailabilityStatus(params, request, response) {
        const vendorId = request.user.userId;
        const allVariants = await database_1.VendorProductVariantRepository.find({ where: { vendorId, productId: params.productId }, });
        let alv = allVariants.map(async (i) => {
            const uresul = await this.productService.updateProductsAllVendorProdVar(i.id, i.vendorId);
            if (uresul.status === 0) {
                return response.status(400).send({ status: 0, message: uresul.message, data: {} });
            }
        });
        alv = Promise.all(alv);
        return response.status(200).send({ status: 1, message: "Success", data: {} });
    }
    async activeDeactiveProductV1(params, request, response) {
        const viewType = params.viewType;
        const vendorId = request.user.userId;
        if (viewType == 1) {
            const resl = await this.productService.updateProd(params.productId, vendorId);
            if (resl.status === 0) {
                return response.status(400).send({ status: 0, message: resl.message, data: {} });
            }
            const allVariants = await database_1.VendorProductVariantRepository.find({ where: { vendorId, productId: params.productId }, });
            let alv = allVariants.map(async (i) => {
                const uresul = await this.productService.updateVendorProdVar(i.id, i.vendorId);
                if (uresul.status === 0) {
                    return response.status(400).send({ status: 0, message: uresul.message, data: {} });
                }
            });
            alv = Promise.all(alv);
            return response.status(200).send({ status: 1, message: "Success", data: {} });
        }
        else {
            const vPr = await database_1.VendorProductRepository.findOne({ where: { vendorId, productId: params.productId }, });
            if (!vPr) {
                return { status: 0, message: "No product found against given Id", data: {} };
            }
            const resul = await this.productService.updateVendorProdVar(params.productVariantId, vendorId);
            if (resul.status === 0) {
                return response.status(400).send({ status: 0, message: resul.message, data: {} });
            }
            if (vPr.statusId == 2) {
                const resl = await this.productService.updateProd(params.productId, vendorId);
                if (resl.status === 0) {
                    return response.status(400).send({ status: 0, message: resl.message + '(--)', data: {} });
                }
            }
            const allVars = await database_1.VendorProductVariantRepository.find({ where: { vendorId, productId: params.productId }, });
            if (allVars.length > 0) {
                const allNonActiveVars = allVars.filter(i => i.isActive == 0);
                if (allVars.length == allNonActiveVars.length) {
                    const res = await this.productService.updateProd(params.productId, vendorId);
                    if (res.status === 0) {
                        return response.status(400).send({ status: 0, message: res.message, data: {} });
                    }
                    return response.status(200).send({ status: 1, message: "Success", data: {} });
                }
            }
            return response.status(200).send({ status: 1, message: "variant updated Successfully", data: {} });
        }
    }
    async activeDeactiveProduct(params, request, response) {
        const vendorId = request.user.userId;
        const resl = await this.productService.updateProd(params.productId, vendorId);
        if (resl.status === 0) {
            return response.status(400).send({ status: 0, message: resl.message, data: {} });
        }
        return response.status(200).send({ status: 1, message: "Success", data: {} });
    }
    async otherSellerListing(params, request, response) {
        const successResponse = {
            status: 1,
            message: "list",
            pages: 0,
            data: [],
        };
        return response.status(200).send(successResponse);
    }
    async getProductAttributesV2(request, response) {
        const siteId = request.siteId;
        const productId = request.query.productId;
        const vendorId = request.user.userId;
        let categoryId = request.query.catId;
        if (productId) {
            const vendorProduct = await this.productService.findProductRawQuery(productId, vendorId);
            const categories = await database_1.VendorProductCategoryRepository.find({ where: { vendorProductId: vendorProduct.vendorProductId } });
            const lastCategory = categories[categories.length - 1];
            categoryId = lastCategory.categoryId;
        }
        const selectedCategory = await this.categoryService.categoryPath(categoryId);
        let attributes = await this.attributeService.getProductAttributes(categoryId, siteId);
        attributes = attributes.map((v) => {
            return {
                ...v,
                value: null,
            };
        });
        let variants = await this.productService.variantsByCategoryId(categoryId, siteId);
        variants = variants.map((v) => {
            return {
                ...v,
                values: [],
            };
        });
        let taxClasses = await database_1.TaxClassRepository.find({ where: { isActive: 1 } });
        taxClasses = taxClasses.map(i => {
            return {
                ...i,
                selected: 0
            };
        });
        let productDetails;
        if (productId) {
            productDetails = await this.productService.productDetails(productId, vendorId, siteId, request.langId);
            const varaintValues = await database_1.ProductVariantValueRepository.find({ where: { productId, isActive: 1 }, order: { id: 'ASC' } });
            variants = variants.map((item) => {
                const vv = varaintValues.filter((v) => v.variantId === item.id);
                return {
                    ...item,
                    values: vv,
                };
            });
            const dynamicAttrs = await database_1.ProductAttributeVendorValueRepository.find({ where: { productId } });
            attributes = attributes.map((item) => {
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
                const o = {
                    ...i
                };
                if (productDetails.taxClassId === i.id) {
                    o.selected = 1;
                }
                return o;
            });
        }
        const warrantyTypes = await this.productWarrantyService.getProductWarrantyTypes(productDetails);
        const productWarranty = await this.productWarrantyService.getProductWarranty(productDetails);
        const categoryD = await database_1.CategoryRepository.findOne({ where: { id: categoryId } });
        let freeShippingAllow = await database_1.VendorRepository.findOne({ where: { userId: vendorId } });
        freeShippingAllow = freeShippingAllow.canAddFreeShip;
        if (siteId == utils_1.SitesEnum.US || siteId == utils_1.SitesEnum.Pakistan) {
            freeShippingAllow = 1;
        }
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
                }];
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
                }];
        }
        if (productDetails) {
            try {
                productDetails.bulletPoints = JSON.parse(productDetails.bulletPoints);
                if (!productDetails.bulletPoints) {
                    productDetails.bulletPoints = [];
                }
            }
            catch (error) {
                productDetails.bulletPoints = [];
            }
        }
        const data = {
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
            }
        };
        return response.status(200).send({ status: 1, message: "", data });
    }
    async ParentCategoryListRaw(request, response) {
        const siteId = request.siteId;
        const userId = request.user.userId;
        const langId = 1;
        const d = await this.categoryService.vendorCategories(siteId, null, langId, userId);
        return response.status(200).send({ status: 1, data: d });
    }
    async markfavorite(params, request, response) {
        const siteId = request.siteId;
        const userId = request.user.userId;
        const checkFavCategory = await database_1.UserFavCategoryRepository.findOne({ where: { siteId, catId: params.catId, userId } });
        if (!checkFavCategory) {
            const newFavCat = new UserFavCategory_1.UserFavCategory();
            newFavCat.userId = userId;
            newFavCat.siteId = siteId;
            newFavCat.catId = params.catId;
            const FavCatSave = await database_1.UserFavCategoryRepository.save(newFavCat);
            return response.status(200).send({ status: 1, message: "Fav category Created Successfully", data: FavCatSave });
        }
        await database_1.UserFavCategoryRepository.delete({ id: checkFavCategory.id });
        return response.status(200).send({ status: 1, message: "Fav Category Deleted Successfully", data: {} });
    }
    async createComboOffer(params, request, response) {
        const userId = request.user.userId;
        const co = new ComboOffer_1.ComboOffer();
        co.name = params.name;
        co.description = params.description;
        co.vendorId = userId;
        co.isActive = 1;
        co.type = params.type;
        co.discount = params.amount;
        co.productIds = params.productIds.toString();
        await database_1.ComboOfferRepository.save(co);
        return response
            .status(200)
            .send({ status: 1, message: "Combo Offer Created!", data: {} });
    }
    async removeVariants(params, request, response) {
        const vendorId = request.user.userId;
        const vendorProductVariant = await database_1.VendorProductVariantRepository.findOne({ where: { id: params.vendorProductVariantId, vendorId } });
        await database_1.ProductVariantRepository.createQueryBuilder().update().where('id = :id', { id: vendorProductVariant.productVariantId }).set({ isActive: 0 }).execute();
        await database_1.VendorProductVariantRepository.createQueryBuilder().update().where('id =:id', { id: params.vendorProductVariantId }).set({ isActive: 0 }).execute();
        if (params.valueFor_ProductVariantValueTable) {
            await database_1.ProductVariantValueRepository.createQueryBuilder().update().where('productId = :productId AND name = :name', { productId: vendorProductVariant.productId, name: params.valueFor_ProductVariantValueTable })
                .set({ isActive: 0 })
                .execute();
        }
        return response.status(200).send({ status: 1, message: 'sucess' });
    }
    async getRelatedProductSuggestions(params, request, response) {
        const siteId = request.siteId;
        const limit = params.limit;
        const offset = params.page === 1 ? 0 : limit * params.page - limit;
        const statusId = params.statusId;
        const vendorId = request.user.userId;
        const viewType = params.viewType;
        const keyword = params.keyword;
        const categoryId = params.parentCategoryId;
        const type = params.type;
        const otherSeller = params.otherSeller;
        const productId = params.productId;
        let { vendorRelatedProducts } = await this.productService.relatedProductSuggestion({ siteId, limit, offset, statusId, vendorId, viewType,
            keyword, categoryId, type, otherSeller, productId
        });
        const pageNumber = params.page;
        const vendorPN = vendorRelatedProducts.totalCount / limit;
        const vendorPages = Math.ceil(vendorPN);
        let vendorData = vendorRelatedProducts.data.map((item) => {
            return {
                ...item,
                currencySymbol: request.currencySymbol
            };
        });
        const siteData = await database_1.SiteRepository.findOne({ where: { id: request.siteId } });
        const successResponse = {
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
    async getRelatedProduct(params, request, response) {
        const siteId = request.siteId;
        const limit = params.limit;
        const offset = params.page === 1 ? 0 : limit * params.page - limit;
        const statusId = params.statusId;
        const vendorId = request.user.userId;
        const viewType = params.viewType;
        const keyword = params.keyword;
        const productId = params.productId;
        let { vendorRelatedProducts } = await this.productService.relatedProducts({ siteId, limit, offset, statusId, vendorId, viewType, keyword,
            productId
        });
        const pageNumber = params.page;
        const vendorPN = vendorRelatedProducts.totalCount / limit;
        const vendorPages = Math.ceil(vendorPN);
        let vendorData = vendorRelatedProducts.data.map((item, index) => {
            return {
                ...item,
                currencySymbol: request.currencySymbol
            };
        });
        const siteData = await database_1.SiteRepository.findOne({ where: { id: request.siteId } });
        const successResponse = {
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
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)("/preferences-listing"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "preferenceListing", null);
__decorate([
    (0, common_1.Post)("/set-preferences"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "setOrderPreference", null);
__decorate([
    (0, common_1.Post)("/excel-export"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.ProductExportToExcelRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productsExport", null);
__decorate([
    (0, common_1.Post)("/listings"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.ProductListingRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productListings", null);
__decorate([
    (0, common_1.Post)("/update-stock"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.UpdateProducctStockRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductStock", null);
__decorate([
    (0, common_1.Post)("/update-price"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.UpdateProducctPriceRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductVariantPrice", null);
__decorate([
    (0, common_1.Post)("/update-discount-price"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.UpdateProductDiscountPriceRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateDiscountPrice", null);
__decorate([
    (0, common_1.Post)("/delete-discount-offer"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.DeleteProducctAvailabilityRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteDiscountOffer", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductRequest_1.CreateProductRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Post)("/edit"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EditProductRequest_1.EditProductRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "editProduct", null);
__decorate([
    (0, common_1.Post)("/question-list"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductRequest_1.GetQuestionListRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "questionList", null);
__decorate([
    (0, common_1.Post)("/add-answer"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductRequest_1.AddAnswerRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addAnswer", null);
__decorate([
    (0, common_1.Post)("/update-availability"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.UpdateProducctAvailabilityRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateVariantAvailabilityStatus", null);
__decorate([
    (0, common_1.Post)("/update-Product-availability"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductRequest_1.UpdateProductAvailabilityForAllVariantsRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductAvailabilityStatus", null);
__decorate([
    (0, common_1.Post)("/active-deactive-product-v1"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductRequest_1.activeDeactiveRequestV1, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "activeDeactiveProductV1", null);
__decorate([
    (0, common_1.Post)("/active-deactive-product"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductRequest_1.activeDeactiveRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "activeDeactiveProduct", null);
__decorate([
    (0, common_1.Post)("/other-seller-listing"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProductRequest_1.otherSellerListing, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "otherSellerListing", null);
__decorate([
    (0, common_1.Post)("/get-product-attributes"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductAttributesV2", null);
__decorate([
    (0, common_1.Post)("/category-list"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "ParentCategoryListRaw", null);
__decorate([
    (0, common_1.Post)("/mark-favorite-category"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.MarkCategoryFavoriteRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "markfavorite", null);
__decorate([
    (0, common_1.Post)("/create-combo-offer"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.CreateComboOfferRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createComboOffer", null);
__decorate([
    (0, common_1.Post)("/remove-variants"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.removeVariantsRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "removeVariants", null);
__decorate([
    (0, common_1.Post)("/choose-related-product"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.relatedProductSuggestionRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getRelatedProductSuggestions", null);
__decorate([
    (0, common_1.Post)('/get-related-products'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.getRelatedProductRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getRelatedProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('/product'),
    __metadata("design:paramtypes", [ProductService_1.ProductService,
        S3Service_1.S3Service,
        VendorProductVariantService_1.VendorProductVariantService,
        UserService_1.UserService,
        ProductWarranty_1.ProductWarrantyService,
        OpenBoxProductPincodeService_1.OpenBoxProductPincodeService,
        SameDayProductPincodeService_1.SameDayProductPincodeService,
        RelatedProductService_1.RelatedProductService,
        ProductQuestionsService_1.ProductQuestionsService,
        CategoryService_1.CategoryService,
        AttributeService_1.AttributeService])
], ProductController);
//# sourceMappingURL=ProductController.js.map