import { VendorProduct } from '../database/models/VendorProduct';
import { ProductRating } from '../database/models/ProductRating';
import { OrderStatus } from '../database/models/OrderStatus';
import { SubOrderTracking } from '../database/models/SubOrderTracking';
import { SubOrderRepository, SubOrderLogRepository, OrderStatusRepository } from '../database';
import { UserAddresses } from '../database/models/UserAddresses';
import { Users } from '../database/models/Users';
import { OrderStatusesMl } from '../database/models/OrderStatusML';
import { Courier } from '../database/models/Courier';
import { Injectable } from '@nestjs/common';

interface SubOrderFuncInterface {
    orderId?: number,
    userId?: number,
    subOrderId?: number,
    statusId?: number,
    limit?: number,
    offset?: number,
    vendorId?: number,
    count?: number,
    campaignId?: number
    langId: number
}
interface EarningsInterface {
    statusId?: number,
    vendorId?: number,
    campaignId?: number
}

@Injectable()
export class SubOrderService {

    public async subOrdersByOrderId(orderId: number, vendorId?: number): Promise<any> {
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
            // SubOrderTracking columns
            'Tracking.id as subOrderTrackingId',
            'Tracking.trackingNo as trackingNo',
            'Tracking.courierId as courierId',
            'Tracking.comments as comments',
            'Tracking.createdAt as createdAt',
            'Tracking.shippedOn as shippedOn',
            'Courier.name as courierName',
            // status columns
            'SO.statusId as statusId',
            'Status.name as status',
            'Status.colorCode as status_color',
        ];
        const query: any = await SubOrderRepository.createQueryBuilder('SO').select(selects)
        .leftJoin(VendorProduct, 'VP', 'VP.vendorId = SO.vendorId AND VP.productId = SO.productId')
        .leftJoin(ProductRating, 'PR', 'PR.subOrderId = SO.id')
        .leftJoin(SubOrderTracking, 'Tracking', 'Tracking.subOrderId = SO.id')
        .leftJoin(Courier, 'Courier', 'Courier.id = Tracking.courierId')
        .leftJoin(OrderStatus, 'Status', 'Status.id = SO.statusId')
        .where('SO.orderId = :orderId', { orderId });
        if (vendorId) {
            query.andWhere('SO.vendorId = :vendorId', { vendorId });
        }
        return query.getRawMany();
    }

    public async getLatestStatusLogOfSuborder(subOrderId: number): Promise<any> {
        const selects = [
            'SOL.statusId as statusId',
            'SOL.createdAt as createdAt',
            'Status.name as status',
            'Status.colorCode as colorCode',
        ];
        const query: any = await SubOrderLogRepository.createQueryBuilder('SOL').select(selects)
        .leftJoin(OrderStatus, 'Status', 'Status.id = SOL.statusId')
        .where('SOL.subOrderId = :subOrderId', { subOrderId })
        .orderBy('SOL.id', 'DESC');
        return query.getRawOne();
    }

    public async earnings({ statusId, vendorId, campaignId }: EarningsInterface): Promise<any> {
        const selects =['SUM(SO.totalAmount) as earnings'];
        const query: any = await SubOrderRepository.createQueryBuilder('SO').select(selects);;
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

    public async subOrderQuery({ orderId, userId, subOrderId, statusId, limit, offset, vendorId, campaignId, langId, count }: SubOrderFuncInterface): Promise<any> {
        const selects = [
            'SO.id as subOrderId',
            // vendor cols
            'UserAddress.Lineaddr1 as buyerAddress',
            'UserAddress.type as addressType',
            'UserAddress.name as addresstblseName',
            'UserAddress.user_id as addresstblseuserId',
            'Buyer.email as BuyerEmail',
            'Buyer.firstName as BuyerName',
            'Buyer.mobileNumber as BuyerPhone',
            // Suborder columns
            'SO.productId as productId',
            'SO.productName as productName',
            'SO.productImage as productImage',
            'SO.variant as variant',
            'SO.quantity as quantity',
            'SO.productPrice as productPrice',
            'SO.discount as discount',
            'SO.totalAmount as totalAmount',
            // 'SO.status as status',
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
            // SubOrderTracking columns
            'Tracking.id as subOrderTrackingId',
            'Tracking.trackingNo as trackingNo',
            'Tracking.courierId as courierId',
            'Tracking.comments as comments',
            'Tracking.createdAt as createdAt',
            'Tracking.shippedOn as shippedOn',
        ];
        const query: any = await SubOrderRepository.createQueryBuilder('SO').select(selects)
        .leftJoin(ProductRating, 'PR', 'PR.subOrderId = SO.id')
        .leftJoin(Users, 'Buyer', 'Buyer.id = SO.userId')
        .leftJoin(OrderStatusesMl, 'OML', 'OML.orderStatusId = SO.statusId AND OML.lang_id = :langId', { langId })
        .leftJoin(VendorProduct, 'VP', 'VP.vendorId = SO.vendorId AND VP.productId = SO.productId')
        .leftJoin(UserAddresses, 'UserAddress', 'UserAddress.userId = SO.userId AND UserAddress.type = :type', { type: 'BL' }) // BL for Business Location
        .leftJoin(SubOrderTracking, 'Tracking', 'Tracking.subOrderId = SO.id');
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

    public async getStatus(id: number): Promise<any> {
        const selects = [
            'OS.name as status',
            'OS.colorCode as colorCode',
            'OS.id as id',
        ];
        return await OrderStatusRepository.createQueryBuilder('OS').select(selects).where('OS.id = :id', { id }).getRawOne();
    }

}