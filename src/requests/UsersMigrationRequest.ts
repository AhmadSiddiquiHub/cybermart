import 'reflect-metadata';
import { IsArray, IsIn, IsNotEmpty, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

// ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate
// @ValidatorConstraint()
// export class UserAddressesRequestArray implements ValidatorConstraintInterface {
//     public async validate(authData: UserAddressSchema[], args: ValidationArguments) {
//         return Array.isArray(authData) && authData.reduce((a, b) => a && (typeof b.first_name === "string") && typeof b.last_name === "string" && typeof b.address_1 === "string" && typeof b.address_2 === "string" && typeof b.postal_code === "string" && typeof b.contact_phone === "string" && typeof b.city === "string", true);
//     }
// }

// class UserAddressSchema {
//     @IsNotEmpty({ message: 'first_name is required' })
//     public first_name: string;

//     @IsNotEmpty({ message: 'last_name is required' })
//     public last_name: string;

//     @IsNotEmpty({ message: 'address_1 is required' })
//     public address_1: string;

//     @IsNotEmpty({ message: 'address_2 is required' })
//     public address_2: string;

//     @IsNotEmpty({ message: 'postal_code is required' })
//     public postal_code: any;

//     @IsNotEmpty({ message: 'contact_phone is required' })
//     public contact_phone: string;

//     @IsNotEmpty({ message: 'city is required' })
//     public city: string;
// }

class UserSchema {
    
    @IsNotEmpty({ message: 'customer_no is required' })
    public customer_no: number;

    @IsNotEmpty({ message: 'email is required' })
    public email: string;
    
    @IsNotEmpty({ message: 'firstname is required' })
    public firstname: string;
    
    @IsNotEmpty({ message: 'lastname is required' })
    public lastname: string;
    
    @IsIn(['true', 'false'])
    @IsNotEmpty({ message: 'is_seller is required' })
    public is_seller: string;
    
    public seller_id: number;

    public seller_shop_title: string;

    public seller_logo_pic: string;

    public seller_shop_url: string;

    public seller_contact_number: string;
    
    public dob: string;

    // @IsArray()
    // @ValidateNested({ each: true })
    // @Validate(UserAddressesRequestArray, {
    //     message: "Invalid addresses array",
    // })
    // @Type(() => UserAddressSchema)
    // public addresses: UserAddressSchema[];
}

export class UsersMigrationRequest {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => UserSchema)
    public users: UserSchema[];
}