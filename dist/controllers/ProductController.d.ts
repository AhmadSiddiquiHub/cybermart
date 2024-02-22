import { ProductService } from 'src/services/ProductService';
import { CreateComboOfferRequest, DeleteProducctAvailabilityRequest, MarkCategoryFavoriteRequest, ProductExportToExcelRequest, ProductListingRequest, UpdateProducctAvailabilityRequest, UpdateProducctPriceRequest, UpdateProducctStockRequest, UpdateProductDiscountPriceRequest, getRelatedProductRequest, relatedProductSuggestionRequest, removeVariantsRequest } from 'src/requests';
import { S3Service } from "../services/S3Service";
import { VendorProductVariantService } from '../services/VendorProductVariantService';
import { AddAnswerRequest, CreateProductRequest, GetQuestionListRequest, UpdateProductAvailabilityForAllVariantsRequest, activeDeactiveRequest, activeDeactiveRequestV1, otherSellerListing } from 'src/requests/createProductRequest';
import { UserService } from 'src/services/UserService';
import { ProductWarrantyService } from 'src/services/ProductWarranty';
import { OpenBoxProductPincodeService } from 'src/services/OpenBoxProductPincodeService';
import { SameDayProductPincodeService } from 'src/services/SameDayProductPincodeService';
import { RelatedProductService } from 'src/services/RelatedProductService';
import { EditProductRequest } from 'src/requests/EditProductRequest';
import { ProductQuestionsService } from 'src/services/ProductQuestionsService';
import { CategoryService } from 'src/services/CategoryService';
import { AttributeService } from 'src/services/AttributeService';
export declare class ProductController {
    private productService;
    private s3Service;
    private vendorProductVariantService;
    private userService;
    private productWarrantyService;
    private openBoxProductPincodeService;
    private sameDayProductPincodeService;
    private relatedProductSevice;
    private productQuestionsService;
    private categoryService;
    private attributeService;
    constructor(productService: ProductService, s3Service: S3Service, vendorProductVariantService: VendorProductVariantService, userService: UserService, productWarrantyService: ProductWarrantyService, openBoxProductPincodeService: OpenBoxProductPincodeService, sameDayProductPincodeService: SameDayProductPincodeService, relatedProductSevice: RelatedProductService, productQuestionsService: ProductQuestionsService, categoryService: CategoryService, attributeService: AttributeService);
    preferenceListing(request: any, response: any): Promise<any>;
    setOrderPreference(request: any, response: any): Promise<any>;
    productsExport(params: ProductExportToExcelRequest, request: any, response: any): Promise<any>;
    productListings(params: ProductListingRequest, request: any, response: any): Promise<any>;
    updateProductStock(params: UpdateProducctStockRequest, request: any, response: any): Promise<any>;
    updateProductVariantPrice(params: UpdateProducctPriceRequest, request: any, response: any): Promise<any>;
    updateDiscountPrice(params: UpdateProductDiscountPriceRequest, request: any, response: any): Promise<any>;
    deleteDiscountOffer(params: DeleteProducctAvailabilityRequest, request: any, response: any): Promise<any>;
    createProduct(params: CreateProductRequest, request: any, response: any): Promise<any>;
    editProduct(params: EditProductRequest, request: any, response: any): Promise<any>;
    questionList(params: GetQuestionListRequest, request: any, response: any): Promise<any>;
    addAnswer(params: AddAnswerRequest, request: any, response: any): Promise<any>;
    updateVariantAvailabilityStatus(params: UpdateProducctAvailabilityRequest, request: any, response: any): Promise<any>;
    updateProductAvailabilityStatus(params: UpdateProductAvailabilityForAllVariantsRequest, request: any, response: any): Promise<any>;
    activeDeactiveProductV1(params: activeDeactiveRequestV1, request: any, response: any): Promise<any>;
    activeDeactiveProduct(params: activeDeactiveRequest, request: any, response: any): Promise<any>;
    otherSellerListing(params: otherSellerListing, request: any, response: any): Promise<any>;
    getProductAttributesV2(request: any, response: any): Promise<any>;
    ParentCategoryListRaw(request: any, response: any): Promise<any>;
    markfavorite(params: MarkCategoryFavoriteRequest, request: any, response: any): Promise<any>;
    createComboOffer(params: CreateComboOfferRequest, request: any, response: any): Promise<any>;
    removeVariants(params: removeVariantsRequest, request: any, response: any): Promise<any>;
    getRelatedProductSuggestions(params: relatedProductSuggestionRequest, request: any, response: any): Promise<any>;
    getRelatedProduct(params: getRelatedProductRequest, request: any, response: any): Promise<any>;
}
