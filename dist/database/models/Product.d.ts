import { OpenBoxProductPincodes } from './OpenBoxProductPincodes';
import { SameDayProductPincodes } from './SameDayProductPincodes';
export declare class Product {
    id: number;
    name: string;
    longDesc: string;
    descEditorDesign: string;
    shortDesc: string;
    moreInformation: string;
    bulletPoints: string;
    avgRating: number;
    reviewCount: number;
    OneStartRatingCount: number;
    TwoStartRatingCount: number;
    ThreeStartRatingCount: number;
    FourStartRatingCount: number;
    FiveStartRatingCount: number;
    sameDayProductPincodes: SameDayProductPincodes[];
    openBoxProductPincodes: OpenBoxProductPincodes[];
}
