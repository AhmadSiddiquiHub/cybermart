export declare class Documents {
    documentId: number;
    countryId: number;
    vendorId: number;
    identityType: string;
    documentTypeId: number;
    identityNumber: number;
    issueDate: string;
    expiryDate: string;
    frontImage: string;
    backImage: string;
    createdAt: string;
    updatedAt: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
