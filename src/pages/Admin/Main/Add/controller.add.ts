export interface StoreData {
    name:             string;
    about:            string;
    moreInfo:         string;
    description:      string;
    learnWithUs:      string;
    meetUs:           string;
    isClaimed:        boolean;
    storePicture:     string;
    googleReiviewUrl: string;
    yelpReviewUrl:    string;
    hasClasses:       boolean;
    classInfo:        string;
    isBazaar:         boolean;
    createdAt:        Date;
    updatedAt:        Date;
    bazaarDetails:    BazaarDetail[];
    instagramPhotos:  InstagramPhoto[];
    products:         Product[];
    primaryTag:       number;
    shopOwner2:       ShopOwner2;
    storeLinks:       StoreLink[];
    storeOpeningDays: StoreOpeningDay[];
}

export interface BazaarDetail {
    bazaarInfo: string;
}

export interface InstagramPhoto {
    photoUrl: string;
}

export interface Product {
    name:  string;
    price: number;
}

export interface ShopOwner2 {
    username: string;
    email:    string;
}

export interface StoreLink {
    link:     string;
    linkType: number;
}

export interface StoreOpeningDay {
    fineLocations: FineLocations;
    days:          DayElement[];
}

export interface DayElement {
    openTime:  string;
    closeTime: string;
    day:       DayDay;
}

export interface DayDay {
    name: string;
}

export interface FineLocations {
    address:      string;
    longtiude:    string;
    lattitude:    string;
    city:         string;
    phone_number: string;
    email:        string;
}
