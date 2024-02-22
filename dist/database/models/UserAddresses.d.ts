import { Users } from './Users';
export declare class UserAddresses {
    addressId: number;
    name: string;
    userId: number;
    countryId: number;
    stateId: number;
    cityId: number;
    userTypeId: string;
    type: string;
    Lineaddr1: string;
    Lineaddr2: string;
    Lineaddr3: string;
    zipcode: number;
    isDefault: number;
    createdAt: string;
    updateAt: string;
    isActive: number;
    users: Users;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
