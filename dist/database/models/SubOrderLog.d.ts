export declare class SubOrderLog {
    id: number;
    subOrderId: number;
    statusId: number;
    createdAt: string;
    reason: string;
    description: string;
    createDetails(): Promise<void>;
}
