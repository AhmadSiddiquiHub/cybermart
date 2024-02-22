import 'reflect-metadata';
declare class UserSchema {
    customer_no: number;
    email: string;
    firstname: string;
    lastname: string;
    is_seller: string;
    seller_id: number;
    seller_shop_title: string;
    seller_logo_pic: string;
    seller_shop_url: string;
    seller_contact_number: string;
    dob: string;
}
export declare class UsersMigrationRequest {
    users: UserSchema[];
}
export {};
