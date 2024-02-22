"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubOrderService = void 0;
const VendorProduct_1 = require("../database/models/VendorProduct");
const ProductRating_1 = require("../database/models/ProductRating");
const OrderStatus_1 = require("../database/models/OrderStatus");
const SubOrderTracking_1 = require("../database/models/SubOrderTracking");
const database_1 = require("../database");
const UserAddresses_1 = require("../database/models/UserAddresses");
const Users_1 = require("../database/models/Users");
const OrderStatusML_1 = require("../database/models/OrderStatusML");
const Courier_1 = require("../database/models/Courier");
const common_1 = require("@nestjs/common");
let SubOrderService = class SubOrderService {
    async subOrdersByOrderId(orderId, vendorId) {
        const selects = [
            'SO.productId as productId',
            'SO.productName as productName',
            'SO.productImage as productImage',
            'SO.variant as variant',
            'SO.quantity as quantity',
            'SO.productPrice as productPrice',
            'SO.discount as discount',
            'SO.totalAmount as totalAmount',
            'SO.shippingCharges as shippingCharges',
            'SO.createdAt as createdAt',
            'SO.vendorId as vendorId',
            'SO.orderId as orderId',
            'SO.id as subOrderId',
            'SO.viewReturnLabel as viewReturnLabel',
            'VP.slug as productSlug',
            'PR.rating as rating',
            'PR.review as review',
            'PR.id as ratingId',
            'Tracking.id as subOrderTrackingId',
            'Tracking.trackingNo as trackingNo',
            'Tracking.courierId as courierId',
            'Tracking.comments as comments',
            'Tracking.createdAt as createdAt',
            'Tracking.shippedOn as shippedOn',
            'Courier.name as courierName',
            'SO.statusId as statusId',
            'Status.name as status',
            'Status.colorCode as status_color',
        ];
        const query = await database_1.SubOrderRepository.createQueryBuilder('SO').select(selects)
            .leftJoin(VendorProduct_1.VendorProduct, 'VP', 'VP.vendorId = SO.vendorId AND VP.productId = SO.productId')
            .leftJoin(ProductRating_1.ProductRating, 'PR', 'PR.subOrderId = SO.id')
            .leftJoin(SubOrderTracking_1.SubOrderTracking, 'Tracking', 'Tracking.subOrderId = SO.id')
            .leftJoin(Courier_1.Courier, 'Courier', 'Courier.id = Tracking.courierId')
            .leftJoin(OrderStatus_1.OrderStatus, 'Status', 'Status.id = SO.statusId')
            .where('SO.orderId = :orderId', { orderId });
        if (vendorId) {
            query.andWhere('SO.vendorId = :vendorId', { vendorId });
        }
        return query.getRawMany();
    }
    async getLatestStatusLogOfSuborder(subOrderId) {
        const selects = [
            'SOL.statusId as statusId',
            'SOL.createdAt as createdAt',
            'Status.name as status',
            'Status.colorCode as colorCode',
        ];
        const query = await database_1.SubOrderLogRepository.createQueryBuilder('SOL').select(selects)
            .leftJoin(OrderStatus_1.OrderStatus, 'Status', 'Status.id = SOL.statusId')
            .where('SOL.subOrderId = :subOrderId', { subOrderId })
            .orderBy('SOL.id', 'DESC');
        return query.getRawOne();
    }
    async earnings({ statusId, vendorId, campaignId }) {
        const selects = ['SUM(SO.totalAmount) as earnings'];
        const query = await database_1.SubOrderRepository.createQueryBuilder('SO').select(selects);
        ;
        if (vendorId) {
            query.andWhere('SO.vendorId = :vendorId', { vendorId });
        }
        if (campaignId) {
            query.andWhere('SO.campaignId = :campaignId', { campaignId });
        }
        if (statusId && statusId !== 0) {
            query.andWhere('SO.statusId = :statusId', { statusId });
        }
        return query.getRawOne();
    }
    async subOrderQuery({ orderId, userId, subOrderId, statusId, limit, offset, vendorId, campaignId, langId, count }) {
        const selects = [
            'SO.id as subOrderId',
            'UserAddress.Lineaddr1 as buyerAddress',
            'UserAddress.type as addressType',
            'UserAddress.name as addresstblseName',
            'UserAddress.user_id as addresstblseuserId',
            'Buyer.email as BuyerEmail',
            'Buyer.firstName as BuyerName',
            'Buyer.mobileNumber as BuyerPhone',
            'SO.productId as productId',
            'SO.productName as productName',
            'SO.productImage as productImage',
            'SO.variant as variant',
            'SO.quantity as quantity',
            'SO.productPrice as productPrice',
            'SO.discount as discount',
            'SO.totalAmount as totalAmount',
            'OML.name as status',
            'SO.statusId as statusId',
            'SO.status_color as status_color',
            'SO.createdAt as createdAt',
            'SO.vendorId as vendorId',
            'SO.userId as userId',
            'SO.orderId as orderId',
            'SO.viewReturnLabel as viewReturnLabel',
            'PR.rating as rating',
            'PR.review as review',
            'PR.id as ratingId',
            'VP.slug as productSlug',
            'Tracking.id as subOrderTrackingId',
            'Tracking.trackingNo as trackingNo',
            'Tracking.courierId as courierId',
            'Tracking.comments as comments',
            'Tracking.createdAt as createdAt',
            'Tracking.shippedOn as shippedOn',
        ];
        const query = await database_1.SubOrderRepository.createQueryBuilder('SO').select(selects)
            .leftJoin(ProductRating_1.ProductRating, 'PR', 'PR.subOrderId = SO.id')
            .leftJoin(Users_1.Users, 'Buyer', 'Buyer.id = SO.userId')
            .leftJoin(OrderStatusML_1.OrderStatusesMl, 'OML', 'OML.orderStatusId = SO.statusId AND OML.lang_id = :langId', { langId })
            .leftJoin(VendorProduct_1.VendorProduct, 'VP', 'VP.vendorId = SO.vendorId AND VP.productId = SO.productId')
            .leftJoin(UserAddresses_1.UserAddresses, 'UserAddress', 'UserAddress.userId = SO.userId AND UserAddress.type = :type', { type: 'BL' })
            .leftJoin(SubOrderTracking_1.SubOrderTracking, 'Tracking', 'Tracking.subOrderId = SO.id');
        if (orderId) {
            query.where('SO.orderId = :orderId', { orderId });
        }
        if (userId) {
            query.andWhere('SO.userId = :userId', { userId });
        }
        if (vendorId) {
            query.andWhere('SO.vendorId = :vendorId', { vendorId });
        }
        if (campaignId) {
            query.andWhere('SO.campaignId = :campaignId', { campaignId });
        }
        if (subOrderId) {
            query.andWhere('SO.id = :subOrderId', { subOrderId });
        }
        if (statusId && statusId !== 0) {
            query.andWhere('SO.statusId = :statusId', { statusId });
        }
        if (limit && limit > 0) {
            query.limit(limit).offset(offset);
        }
        if (count && count === 1) {
            return query.getCount();
        }
        return query.getRawMany();
    }
    async getStatus(id) {
        const selects = [
            'OS.name as status',
            'OS.colorCode as colorCode',
            'OS.id as id',
        ];
        return await database_1.OrderStatusRepository.createQueryBuilder('OS').select(selects).where('OS.id = :id', { id }).getRawOne();
    }
};
exports.SubOrderService = SubOrderService;
exports.SubOrderService = SubOrderService = __decorate([
    (0, common_1.Injectable)()
], SubOrderService);
//# sourceMappingURL=SubOrderService.js.map