import { IsNotEmpty, IsNumber, IsArray, ValidateNested, ArrayMinSize, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

class CategorySchema {
    @IsNumber()
    @IsNotEmpty({ message: 'id is required' })
    public id: number;

    @IsNumber()
    @IsNotEmpty({ message: 'parentInt is required' })
    public parentInt: number;

    @IsNumber()
    @IsNotEmpty({ message: 'sortOrder is required' })
    public sortOrder: number;

    @IsNotEmpty({ message: 'urlKey is required' })
    public urlKey: string;

    @IsNotEmpty({ message: 'image is required' })
    public image: string;

    @IsNotEmpty({ message: 'icon is required' })
    public icon: string;

    @IsNumber()
    @IsNotEmpty({ message: 'site_id is required' })
    public siteId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'cat_id is required' })
    public catId: number;
    
    @IsNumber()
    @IsNotEmpty({ message: 'showInMenu is required' })
    public showInMenu: number;

    @IsNumber()
    @IsNotEmpty({ message: 'lang_id is required' })
    public langId: number;

    @IsNotEmpty({ message: 'name is required' })
    public name: string;

    @IsNotEmpty({ message: 'metaTitle is required' })
    public metaTitle: string;

    @IsNotEmpty({ message: 'metaKeyword is required' })
    public metaKeyword: string;

    @IsNotEmpty({ message: 'metaDescription is required' })
    public metaDescription: string;

    @IsArray()
    @IsNumber({},{ each: true })
    @ArrayMinSize(1)
    public path: number[];
}

export class CategoryInsertScriptRequest {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => CategorySchema)
    public categories: CategorySchema[];
}

class BrandSchema {
    @IsNumber()
    @IsNotEmpty({ message: 'id is required' })
    public id: number;

    @IsNotEmpty({ message: 'name is required' })
    public name: string;

    @IsNotEmpty({ message: 'image is required' })
    public image: string;

    @IsNotEmpty({ message: 'slug is required' })
    public slug: string;

    @IsNumber()
    @IsNotEmpty({ message: 'siteId is required' })
    public siteId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'brandId is required' })
    public brandId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'langId is required' })
    public langId: number;

    @IsNotEmpty({ message: 'metaTitle is required' })
    public metaTitle: string;

    @IsNotEmpty({ message: 'metaKeyword is required' })
    public metaKeyword: string;

    @IsNotEmpty({ message: 'metaDescription is required' })
    public metaDescription: string;

    @IsArray()
    @IsNumber({},{ each: true })
    @ArrayMinSize(1)
    public categories: number[];
}

export class BrandsInsertScriptRequest {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => BrandSchema)
    public brands: BrandSchema[];
}

class UserSchema {
    @IsNumber()
    @IsNotEmpty({ message: 'id is required' })
    public id: number;

    @IsNumber()
    @IsNotEmpty({ message: 'siteId is required' })
    public siteId: number;
    
    @IsIn(['B', 'S'])
    @IsNotEmpty({ message: 'typeId is required' })
    public typeId: string;

    @IsNotEmpty({ message: 'firstName is required' })
    public firstName: string;

    @IsNotEmpty({ message: 'lastName is required' })
    public lastName: string;

    @IsNotEmpty({ message: 'email is required' })
    public email: string;
    
    @IsNotEmpty({ message: 'emailVerified is required' })
    public emailVerified: number;
    
    @IsNotEmpty({ message: 'password is required' })
    public password: string;
}
export class UserInsertScriptRequest {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => UserSchema)
    public users: UserSchema[];
}

class OrderSchema {
    @IsNumber()
    @IsNotEmpty({ message: 'orderId is required' })
    public orderId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'userId is required' })
    public userId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'siteId is required' })
    public siteId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'countryId is required' })
    public countryId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'stateId is required' })
    public stateId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'cityId is required' })
    public cityId: number;

    @IsNotEmpty({ message: 'name is required' })
    public name: string;

    @IsNotEmpty({ message: 'lineAddress1 is required' })
    public lineAddress1: string;

    @IsNotEmpty({ message: 'lineAddress2 is required' })
    public lineAddress2: string;

    @IsNotEmpty({ message: 'lineAddress3 is required' })
    public lineAddress3: string;

    @IsNotEmpty({ message: 'zipcode is required' })
    public zipcode: string;
    
    @IsNotEmpty({ message: 'addrType is required' })
    public addrType: string;

    @IsNumber()
    @IsNotEmpty({ message: 'statusId is required' })
    public statusId: number;

    @IsNotEmpty({ message: 'orderNo is required' })
    public orderNo: string;

    @IsNotEmpty({ message: 'totalAmount is required' })
    public totalAmount: string;

    @IsNotEmpty({ message: 'paymentMethodId is required' })
    public paymentMethodId: number;

    @IsIn([1, 0])
    @IsNotEmpty({ message: 'paymentStatus is required' })
    public paymentStatus: number;

    @IsNotEmpty({ message: 'comments is required' })
    public comments: string;

    @IsNotEmpty({ message: 'coupon is required' })
    public coupon: string;

    @IsNotEmpty({ message: 'discount is required' })
    public discount: string;

    @IsNotEmpty({ message: 'createdAt is required' })
    public createdAt: string;

    @IsNotEmpty({ message: 'updatedAt is required' })
    public updatedAt: string;

    @IsNotEmpty({ message: 'invoice is required' })
    public invoice: string;

    @IsNotEmpty({ message: 'trackingSlip is required' })
    public trackingSlip: string;
    
    @IsNotEmpty({ message: 'shippingCharges is required' })
    public shippingCharges: string;
}

export class OrdersInsertScriptRequest {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => OrderSchema)
    public orders: OrderSchema[];
}

