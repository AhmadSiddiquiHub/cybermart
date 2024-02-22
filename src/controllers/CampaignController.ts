import { Body, Controller, Delete, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import moment from "moment";
import { CampaignPackageRepository, CampaignProductsRepository, CampaignRepository, CampaignVendorsRepository, ProductDiscountRepository, VendorProductRepository, VendorProductVariantRepository } from "src/database";
import { CampaignProducts } from "src/database/models/CampaignProducts";
import { CampaignVendors } from "src/database/models/CampaignVendors";
import { ProductDiscount } from "src/database/models/ProductDiscount";
import { Roles } from "src/decorators/roles.decorator";
import { AuthGuard } from "src/gaurds/auth.guard";
import { RegisterCampaignRequest, SellerCampaignListingRequest, UpdateCampaignProductPricingRequest, UpdateCampaignRequest } from "src/requests";
import { CampaignService } from "src/services/CampaignService";
import { CampaignVendorsService } from "src/services/CampaignVendorsService";
import { ProductService } from "src/services/ProductService";
import { AppLevelDateTimeFormat } from "src/utils";

@Controller('/campaign')
export class CampaignController {
    constructor(
        private productService: ProductService,
        private campaignService: CampaignService,
        private campaignVendorsService: CampaignVendorsService,
    ){}

    // /api/seller/campaign/register-campaign
    @Post('/register-campaign')
    @UseGuards(AuthGuard)
    @Roles('seller')
    public async registerCampaign(@Body() campaignParam: RegisterCampaignRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const slug: string = campaignParam.slug;
        const campaign = await CampaignRepository.findOne({ where: { slug } });
        if (!campaign) {
            const errorResponse: any = { status: 0, message: 'Invalid campaign slug' };
            return response.status(400).send(errorResponse);
        }
        const cvs = await CampaignVendorsRepository.findOne({ where: { campaignId: campaign.id, vendorId: request.user.userId } });
        if (cvs){
            const errorResponse: any = { status: 0, message: 'this vendor already registered' };
            return response.status(400).send(errorResponse);
        }
        const error: any = [];
        const products: any = campaignParam.productIds;
        for (const product of products) {
            const value = await VendorProductVariantRepository.findOne({ where: { productId: product.productId, vendorId: request.user.userId } }); // add vendor check
            if (!value) {
                const errorResponse: any = { status: 0, message: 'no products against this vendor' };
                return response.status(400).send(errorResponse);
            }
        }
        if (error.length > 0) {
            const errResponse: any = { status: 0, message: 'Invalid Product, Product price is less than discount' };
            return response.status(400).send(errResponse);
        }
        const campaignVendors: any = new CampaignVendors();
        campaignVendors.campaignId = campaign.id;
        campaignVendors.vendorId = request.user.userId;
        await CampaignVendorsRepository.save(campaignVendors);
        let prods: any = [];
        prods = campaignParam.productIds;
        for (const prod of prods) {
            const campaignProducts: any = new CampaignProducts();
            campaignProducts.campaignId = campaign.id;
            campaignProducts.productId = prod.productId;
            campaignProducts.vendorId = request.user.userId;
            campaignProducts.isActive = 1;
            await CampaignProductsRepository.save(campaignProducts);
        }
        const successResponse: any = { status: 1, message: 'Campaign registered Successfully.' };
        return response.status(200).send(successResponse);
    }

    // /api/seller/campaign/update
    @Post('/update')
    @UseGuards(AuthGuard)
    @Roles('seller')
    public async updateCampaign(@Body() campaignParam: UpdateCampaignRequest,@Req() request: any, @Res() response: any): Promise<any> {
        const slug: string = campaignParam.slug;
        const campaign = await CampaignRepository.findOne({ where: { slug } });
        const campaignId = campaign.id
        if (!campaign) {
            const errorResponse: any = { status: 0, message: 'Invalid Campaign ' };
            return response.status(400).send(errorResponse);
        }
        const error: any = [];
        const products: any = campaignParam.productIds;
        for (const product of products) {
            
            const value = await VendorProductVariantRepository.findOne({ where: { productId: product.productId, vendorId: request.user.userId } });
            if (!value) {
                const errorResponse: any = { status: 0, message: 'no products against this vendor' };
                return response.status(400).send(errorResponse);
            }
        }
        if (error.length > 0) {
            const errResponse: any = { status: 0, message: 'Invalid Product, Product price is less than discount' };
            return response.status(400).send(errResponse);
        }
        const campaignProduct: any = await CampaignProductsRepository.find({ where: { campaignId, vendorId: request.user.userId } });
        if (!campaignProduct) {
            const errorResponse: any = { status: 0, message: 'Invalid Campaign prodIds' };
            return response.status(400).send(errorResponse);
        }
        if(campaignProduct.length >= 1){
            await CampaignProductsRepository.delete(campaignProduct);
        }
        let pIds: any = [];
        pIds = campaignParam.productIds;
        for (const pId of pIds) {
            const campaignProducts: any = new CampaignProducts();
            campaignProducts.campaignId = campaign.id;
            campaignProducts.productId = pId.productId;
            campaignProducts.vendorId = request.user.userId;
            campaignProducts.isActive = 1;
            await CampaignProductsRepository.save(campaignProducts);
        }
        const successResponse: any = { status: 1, message: 'Campaign updated successfully.' };
        return response.status(200).send(successResponse);
    }

    // /api/seller/campaign/listing
    @Post('/listing')
    @UseGuards(AuthGuard)
    @Roles('seller')
    public async listCampaign(@Body() params: SellerCampaignListingRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const userId = request.user.userId;
        const limit = 30;
        const offset = params.page === 1 ? 0 : params.page * limit;
        const data  = await this.campaignService.list(userId, limit, offset);
        return response.status(200).send({ status: 1, message: 'list', pages: data.count, data: data.results });
    }   
    
    // /api/seller/campaign/detail
    @Post('/detail')
    @UseGuards(AuthGuard)
    @Roles('seller')
    public async campaignDetail(@Req() request: any, @Res() response: any): Promise<any> {
        const vendorId = request.user.userId;
        const slug = request.body.slug;
        if (!slug) {
            return response.status(400).send({ status: 0, message: 'Add slug in body' });
        }
        const campaign = await CampaignRepository.findOne({ where: { slug }});
        if (!campaign) {
            return response.status(400).send({ status: 0, message: 'Invalid slug / no campaign' });
        }
        request.body.campaignId = campaign.id;
        let sellerRegistered = false;
        const stats = await this.campaignVendorsService.stats(request)
        const isVendorRegisterInCampaign = await CampaignVendorsRepository.findOne({ where: { campaignId: campaign.id, vendorId }});
        if (isVendorRegisterInCampaign){
            sellerRegistered = true;
        }
        const campaignPackages = await CampaignPackageRepository.find();
        const products = await this.campaignService.vendorProductsInCampaign(request, campaign.id);
        const resObj = {status: 1,message: 'successfully got Vendor Campaign Detail.',data: {stats,campaignPackages,products,sellerRegistered}}
        return response.status(200).send(resObj);
    }


    // /api/seller/campaign/delete/:campaignId
    @Delete('/delete/:campaignId')
    @UseGuards(AuthGuard)
    @Roles('seller')
    public async deleteCampaign(@Param('campaignId') campaignId: number, @Req() request: any, @Res() response: any): Promise<any> {
        // CampaignRepository.findOne({ where: { id: campaignId, vendorId: request.user.userId } });
        const campaign: any = await CampaignRepository.findOne({ where: { id: campaignId } });
        if (!campaign) {
            const errorResponse: any = { status: 0, message: 'Invalid Vendor Campaign Id' };
            return response.status(400).send(errorResponse);
        }
        const deleteCampaign = await CampaignRepository.delete(campaign);
        if (deleteCampaign) {
            const successResponse: any = { status: 1, message: 'Successfully deleted Campaign' };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = { status: 0, message: 'unable to delete Campaign' };
            return response.status(400).send(errorResponse);
        }
    }

    // /api/seller/campaign/update-product-pricing
    @Post('/update-product-pricing')
    @UseGuards(AuthGuard)
    @Roles('seller')
    public async updateProductPricing(@Body() params: UpdateCampaignProductPricingRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorId = request.user.userId;
        const slug: string = params.slug;
        const variant = await VendorProductVariantRepository.findOne({ where: { productVariantId: params.vendorProductVariantId, vendorId }});
        if (!variant) {
            return response.status(400).send({ status: 0, message: 'Invalid Variant' });
        }
        const campaign = await CampaignRepository.findOne({ where: { slug } });
        if (!campaign) {
            const errorResponse: any = { status: 0, message: 'Invalid Campaign ' };
            return response.status(400).send(errorResponse);
        }
        let amountInclusiveOfTax = '0';
        const VP = await VendorProductRepository.findOne({ where: { productId: variant.productId, vendorId, siteId: variant.siteId }});
        if (VP) {
            amountInclusiveOfTax = await this.productService.calculateTaxForIndiaByClass(params.price.toString(), VP.taxClassId);
        }
        variant.price2 = String(params.price);
        if (amountInclusiveOfTax != '0') {
            variant.price = amountInclusiveOfTax;
        } else {
            variant.price = String(params.price);
        }
        await VendorProductVariantRepository.save(variant);
        amountInclusiveOfTax = '0';
        if (VP.taxClassId) {
            amountInclusiveOfTax = await this.productService.calculateTaxForIndiaByClass(params.discountPrice.toString(), VP.taxClassId);
        }
        const pd = await ProductDiscountRepository.findOne({ where: { vendorProductVariantId: variant.id } });
        if (parseFloat(String(params.discountPrice)) !== 0) {
            if (parseFloat(String(params.discountPrice)) >= params.price) {
                return response.status(400).send({ status: 0, message: 'Discount Price should be less than Price' });
            }
            // create|update in product_discounts table
            if (pd) {
                pd.startDate = moment(campaign.startDate).format(AppLevelDateTimeFormat);
                pd.endDate = moment(campaign.endDate).format(AppLevelDateTimeFormat);
                pd.price2 = String(params.discountPrice);
                if (amountInclusiveOfTax != '0') {
                    pd.price = amountInclusiveOfTax;
                } else {
                    pd.price = String(params.discountPrice);
                }
                await ProductDiscountRepository.save(pd);
            } else {
                const pD: any = new ProductDiscount();
                pD.price2 = params.discountPrice;
                if (amountInclusiveOfTax != '0') {
                    pD.price = amountInclusiveOfTax;
                } else {
                    pD.price = params.discountPrice;
                }
                pD.vendorProductVariantId = variant.id; 
                pD.startDate = moment(campaign.startDate).format(AppLevelDateTimeFormat);
                pD.endDate = moment(campaign.endDate).format(AppLevelDateTimeFormat);
                pD.isActive = 1;
                await ProductDiscountRepository.save(pD);
            }
        }
        else if (parseFloat(String(params.discountPrice)) == 0){
            if(pd){
                const deletePd = await ProductDiscountRepository.delete({id: pd.id});
                if (deletePd) {
                    const successResponse: any = { status: 1, message: 'Successfully deleted product discount' };
                    return response.status(200).send(successResponse);
                } 
            }
            else{
                return response.status(200).send({ status: 1, message: 'discount not found for this variant!' });
            }
        }
        return response.status(200).send({ status: 1, message: 'Price Updated!' });
    }


    // /api/seller/campaign/active-deactive/:campaignId
    @Post('/active-deactive/:campaignId')
    @UseGuards(AuthGuard)
    @Roles('seller')
    public async deactivateCampaign(@Param('campaignId') campaignId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const campaign = await CampaignRepository.findOne({ where: { id: campaignId} });
        if (!campaign) {
            const errorResponse: any = { status: 0, message: 'Invalid Vendor Campaign Id' };
            return response.status(400).send(errorResponse);
        }
        if (campaign.isActive === 1) {
            campaign.isActive = 0;
            const createCampaign = await CampaignRepository.save(campaign);
            if (createCampaign) {
                const successResponse: any = { status: 1, data: false, message: 'Successfully deactivated Campaign' };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = { status: 0, message: 'unable to dactivate Campaign' };
                return response.status(400).send(errorResponse);
            }
        }
        if (campaign.isActive === 0) {
            campaign.isActive = 1;
            const createCampaign = await CampaignRepository.save(campaign);
            if (createCampaign) {
                const successResponse: any = { status: 1, data: true, message: 'Successfully activated Campaign' };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = { status: 0, message: 'unable to activate Campaign' };
                return response.status(400).send(errorResponse);
            }
        }
    }
     
}
