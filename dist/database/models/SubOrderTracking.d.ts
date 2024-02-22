export declare class SubOrderTracking {
    id: number;
    subOrderId: number;
    trackingNo: string;
    courierId: number;
    comments: string;
    createdAt: string;
    updatedAt: string;
    shippedOn: string;
    shippedBy: number;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
