export declare class State {
    id: number;
    name: string;
    countryId: number;
    countryCode: string;
    fipsCode: string;
    iso2: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    isActive: number;
    latitude: number;
    longitude: number;
    wikiDataId: string;
    createDetails(): Promise<void>;
    updateDetails(): Promise<void>;
}
