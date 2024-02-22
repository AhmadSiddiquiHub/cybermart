interface SubOrderFuncInterface {
    orderId?: number;
    userId?: number;
    subOrderId?: number;
    statusId?: number;
    limit?: number;
    offset?: number;
    vendorId?: number;
    count?: number;
    campaignId?: number;
    langId: number;
}
interface EarningsInterface {
    statusId?: number;
    vendorId?: number;
    campaignId?: number;
}
export declare class SubOrderService {
    subOrdersByOrderId(orderId: number, vendorId?: number): Promise<any>;
    getLatestStatusLogOfSuborder(subOrderId: number): Promise<any>;
    earnings({ statusId, vendorId, campaignId }: EarningsInterface): Promise<any>;
    subOrderQuery({ orderId, userId, subOrderId, statusId, limit, offset, vendorId, campaignId, langId, count }: SubOrderFuncInterface): Promise<any>;
    getStatus(id: number): Promise<any>;
}
export {};
