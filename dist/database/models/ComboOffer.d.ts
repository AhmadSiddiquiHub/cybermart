export declare class ComboOffer {
    id: number;
    vendorId: number;
    name: string;
    type: number;
    description: string;
    discount: number;
    isActive: number;
    siteId: number;
    productIds: string;
    createdAt: string;
    updatedAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
