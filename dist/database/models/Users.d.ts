import { UserAddresses } from './UserAddresses';
import { CampaignVendors } from './CampaignVendors';
export declare class Users {
    userId: number;
    siteId: number;
    typeId: string;
    roleId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    password: string;
    countryOfBirth: number;
    countryOfCitizenship: number;
    createdAt: string;
    updatedAt: string;
    isLocked: number;
    lockedAt: Date;
    walletBal: number;
    saveBrowsHist: number;
    isActive: number;
    avatar: string;
    path: string;
    mobileNumber: string;
    emailVerified: number;
    mobileVerified: number;
    socketId: string;
    magentoSellerId: number;
    magentoUserId: number;
    isCybermartSeller: number;
    lType: string;
    parentId: number;
    campaignVendors: CampaignVendors[];
    useradd: UserAddresses[];
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
