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
exports.CampaignController = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = require("moment");
const database_1 = require("../database");
const CampaignProducts_1 = require("../database/models/CampaignProducts");
const CampaignVendors_1 = require("../database/models/CampaignVendors");
const ProductDiscount_1 = require("../database/models/ProductDiscount");
const roles_decorator_1 = require("../decorators/roles.decorator");
const auth_guard_1 = require("../gaurds/auth.guard");
const requests_1 = require("../requests");
const CampaignService_1 = require("../services/CampaignService");
const CampaignVendorsService_1 = require("../services/CampaignVendorsService");
const ProductService_1 = require("../services/ProductService");
const utils_1 = require("../utils");
let CampaignController = class CampaignController {
    constructor(productService, campaignService, campaignVendorsService) {
        this.productService = productService;
        this.campaignService = campaignService;
        this.campaignVendorsService = campaignVendorsService;
    }
    async registerCampaign(campaignParam, request, response) {
        const slug = campaignParam.slug;
        const campaign = await database_1.CampaignRepository.findOne({ where: { slug } });
        if (!campaign) {
            const errorResponse = { status: 0, message: 'Invalid campaign slug' };
            return response.status(400).send(errorResponse);
        }
        const cvs = await database_1.CampaignVendorsRepository.findOne({ where: { campaignId: campaign.id, vendorId: request.user.userId } });
        if (cvs) {
            const errorResponse = { status: 0, message: 'this vendor already registered' };
            return response.status(400).send(errorResponse);
        }
        const error = [];
        const products = campaignParam.productIds;
        for (const product of products) {
            const value = await database_1.VendorProductVariantRepository.findOne({ where: { productId: product.productId, vendorId: request.user.userId } });
            if (!value) {
                const errorResponse = { status: 0, message: 'no products against this vendor' };
                return response.status(400).send(errorResponse);
            }
        }
        if (error.length > 0) {
            const errResponse = { status: 0, message: 'Invalid Product, Product price is less than discount' };
            return response.status(400).send(errResponse);
        }
        const campaignVendors = new CampaignVendors_1.CampaignVendors();
        campaignVendors.campaignId = campaign.id;
        campaignVendors.vendorId = request.user.userId;
        await database_1.CampaignVendorsRepository.save(campaignVendors);
        let prods = [];
        prods = campaignParam.productIds;
        for (const prod of prods) {
            const campaignProducts = new CampaignProducts_1.CampaignProducts();
            campaignProducts.campaignId = campaign.id;
            campaignProducts.productId = prod.productId;
            campaignProducts.vendorId = request.user.userId;
            campaignProducts.isActive = 1;
            await database_1.CampaignProductsRepository.save(campaignProducts);
        }
        const successResponse = { status: 1, message: 'Campaign registered Successfully.' };
        return response.status(200).send(successResponse);
    }
    async updateCampaign(campaignParam, request, response) {
        const slug = campaignParam.slug;
        const campaign = await database_1.CampaignRepository.findOne({ where: { slug } });
        const campaignId = campaign.id;
        if (!campaign) {
            const errorResponse = { status: 0, message: 'Invalid Campaign ' };
            return response.status(400).send(errorResponse);
        }
        const error = [];
        const products = campaignParam.productIds;
        for (const product of products) {
            const value = await database_1.VendorProductVariantRepository.findOne({ where: { productId: product.productId, vendorId: request.user.userId } });
            if (!value) {
                const errorResponse = { status: 0, message: 'no products against this vendor' };
                return response.status(400).send(errorResponse);
            }
        }
        if (error.length > 0) {
            const errResponse = { status: 0, message: 'Invalid Product, Product price is less than discount' };
            return response.status(400).send(errResponse);
        }
        const campaignProduct = await database_1.CampaignProductsRepository.find({ where: { campaignId, vendorId: request.user.userId } });
        if (!campaignProduct) {
            const errorResponse = { status: 0, message: 'Invalid Campaign prodIds' };
            return response.status(400).send(errorResponse);
        }
        if (campaignProduct.length >= 1) {
            await database_1.CampaignProductsRepository.delete(campaignProduct);
        }
        let pIds = [];
        pIds = campaignParam.productIds;
        for (const pId of pIds) {
            const campaignProducts = new CampaignProducts_1.CampaignProducts();
            campaignProducts.campaignId = campaign.id;
            campaignProducts.productId = pId.productId;
            campaignProducts.vendorId = request.user.userId;
            campaignProducts.isActive = 1;
            await database_1.CampaignProductsRepository.save(campaignProducts);
        }
        const successResponse = { status: 1, message: 'Campaign updated successfully.' };
        return response.status(200).send(successResponse);
    }
    async listCampaign(params, request, response) {
        const userId = request.user.userId;
        const limit = 30;
        const offset = params.page === 1 ? 0 : params.page * limit;
        const data = await this.campaignService.list(userId, limit, offset);
        return response.status(200).send({ status: 1, message: 'list', pages: data.count, data: data.results });
    }
    async campaignDetail(request, response) {
        const vendorId = request.user.userId;
        const slug = request.body.slug;
        if (!slug) {
            return response.status(400).send({ status: 0, message: 'Add slug in body' });
        }
        const campaign = await database_1.CampaignRepository.findOne({ where: { slug } });
        if (!campaign) {
            return response.status(400).send({ status: 0, message: 'Invalid slug / no campaign' });
        }
        request.body.campaignId = campaign.id;
        let sellerRegistered = false;
        const stats = await this.campaignVendorsService.stats(request);
        const isVendorRegisterInCampaign = await database_1.CampaignVendorsRepository.findOne({ where: { campaignId: campaign.id, vendorId } });
        if (isVendorRegisterInCampaign) {
            sellerRegistered = true;
        }
        const campaignPackages = await database_1.CampaignPackageRepository.find();
        const products = await this.campaignService.vendorProductsInCampaign(request, campaign.id);
        const resObj = { status: 1, message: 'successfully got Vendor Campaign Detail.', data: { stats, campaignPackages, products, sellerRegistered } };
        return response.status(200).send(resObj);
    }
    async deleteCampaign(campaignId, request, response) {
        const campaign = await database_1.CampaignRepository.findOne({ where: { id: campaignId } });
        if (!campaign) {
            const errorResponse = { status: 0, message: 'Invalid Vendor Campaign Id' };
            return response.status(400).send(errorResponse);
        }
        const deleteCampaign = await database_1.CampaignRepository.delete(campaign);
        if (deleteCampaign) {
            const successResponse = { status: 1, message: 'Successfully deleted Campaign' };
            return response.status(200).send(successResponse);
        }
        else {
            const errorResponse = { status: 0, message: 'unable to delete Campaign' };
            return response.status(400).send(errorResponse);
        }
    }
    async updateProductPricing(params, request, response) {
        const vendorId = request.user.userId;
        const slug = params.slug;
        const variant = await database_1.VendorProductVariantRepository.findOne({ where: { productVariantId: params.vendorProductVariantId, vendorId } });
        if (!variant) {
            return response.status(400).send({ status: 0, message: 'Invalid Variant' });
        }
        const campaign = await database_1.CampaignRepository.findOne({ where: { slug } });
        if (!campaign) {
            const errorResponse = { status: 0, message: 'Invalid Campaign ' };
            return response.status(400).send(errorResponse);
        }
        let amountInclusiveOfTax = '0';
        const VP = await database_1.VendorProductRepository.findOne({ where: { productId: variant.productId, vendorId, siteId: variant.siteId } });
        if (VP) {
            amountInclusiveOfTax = await this.productService.calculateTaxForIndiaByClass(params.price.toString(), VP.taxClassId);
        }
        variant.price2 = String(params.price);
        if (amountInclusiveOfTax != '0') {
            variant.price = amountInclusiveOfTax;
        }
        else {
            variant.price = String(params.price);
        }
        await database_1.VendorProductVariantRepository.save(variant);
        amountInclusiveOfTax = '0';
        if (VP.taxClassId) {
            amountInclusiveOfTax = await this.productService.calculateTaxForIndiaByClass(params.discountPrice.toString(), VP.taxClassId);
        }
        const pd = await database_1.ProductDiscountRepository.findOne({ where: { vendorProductVariantId: variant.id } });
        if (parseFloat(String(params.discountPrice)) !== 0) {
            if (parseFloat(String(params.discountPrice)) >= params.price) {
                return response.status(400).send({ status: 0, message: 'Discount Price should be less than Price' });
            }
            if (pd) {
                pd.startDate = (0, moment_1.default)(campaign.startDate).format(utils_1.AppLevelDateTimeFormat);
                pd.endDate = (0, moment_1.default)(campaign.endDate).format(utils_1.AppLevelDateTimeFormat);
                pd.price2 = String(params.discountPrice);
                if (amountInclusiveOfTax != '0') {
                    pd.price = amountInclusiveOfTax;
                }
                else {
                    pd.price = String(params.discountPrice);
                }
                await database_1.ProductDiscountRepository.save(pd);
            }
            else {
                const pD = new ProductDiscount_1.ProductDiscount();
                pD.price2 = params.discountPrice;
                if (amountInclusiveOfTax != '0') {
                    pD.price = amountInclusiveOfTax;
                }
                else {
                    pD.price = params.discountPrice;
                }
                pD.vendorProductVariantId = variant.id;
                pD.startDate = (0, moment_1.default)(campaign.startDate).format(utils_1.AppLevelDateTimeFormat);
                pD.endDate = (0, moment_1.default)(campaign.endDate).format(utils_1.AppLevelDateTimeFormat);
                pD.isActive = 1;
                await database_1.ProductDiscountRepository.save(pD);
            }
        }
        else if (parseFloat(String(params.discountPrice)) == 0) {
            if (pd) {
                const deletePd = await database_1.ProductDiscountRepository.delete({ id: pd.id });
                if (deletePd) {
                    const successResponse = { status: 1, message: 'Successfully deleted product discount' };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                return response.status(200).send({ status: 1, message: 'discount not found for this variant!' });
            }
        }
        return response.status(200).send({ status: 1, message: 'Price Updated!' });
    }
    async deactivateCampaign(campaignId, request, response) {
        const campaign = await database_1.CampaignRepository.findOne({ where: { id: campaignId } });
        if (!campaign) {
            const errorResponse = { status: 0, message: 'Invalid Vendor Campaign Id' };
            return response.status(400).send(errorResponse);
        }
        if (campaign.isActive === 1) {
            campaign.isActive = 0;
            const createCampaign = await database_1.CampaignRepository.save(campaign);
            if (createCampaign) {
                const successResponse = { status: 1, data: false, message: 'Successfully deactivated Campaign' };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = { status: 0, message: 'unable to dactivate Campaign' };
                return response.status(400).send(errorResponse);
            }
        }
        if (campaign.isActive === 0) {
            campaign.isActive = 1;
            const createCampaign = await database_1.CampaignRepository.save(campaign);
            if (createCampaign) {
                const successResponse = { status: 1, data: true, message: 'Successfully activated Campaign' };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = { status: 0, message: 'unable to activate Campaign' };
                return response.status(400).send(errorResponse);
            }
        }
    }
};
exports.CampaignController = CampaignController;
__decorate([
    (0, common_1.Post)('/register-campaign'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.RegisterCampaignRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "registerCampaign", null);
__decorate([
    (0, common_1.Post)('/update'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.UpdateCampaignRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "updateCampaign", null);
__decorate([
    (0, common_1.Post)('/listing'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.SellerCampaignListingRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "listCampaign", null);
__decorate([
    (0, common_1.Post)('/detail'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "campaignDetail", null);
__decorate([
    (0, common_1.Delete)('/delete/:campaignId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Param)('campaignId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "deleteCampaign", null);
__decorate([
    (0, common_1.Post)('/update-product-pricing'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.UpdateCampaignProductPricingRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "updateProductPricing", null);
__decorate([
    (0, common_1.Post)('/active-deactive/:campaignId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, roles_decorator_1.Roles)('seller'),
    __param(0, (0, common_1.Param)('campaignId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "deactivateCampaign", null);
exports.CampaignController = CampaignController = __decorate([
    (0, common_1.Controller)('/campaign'),
    __metadata("design:paramtypes", [ProductService_1.ProductService,
        CampaignService_1.CampaignService,
        CampaignVendorsService_1.CampaignVendorsService])
], CampaignController);
//# sourceMappingURL=CampaignController.js.map