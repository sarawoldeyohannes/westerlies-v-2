export interface StoreData {
    storeId?: string;
    name:                        string;
    about:                       string;
    moreInfo:                    string;
    description:                 string;
    learnWithUs:                 string;
    meetUs:                      string;
    isClaimed:                   boolean;
    storePicture:                string;
    googleReiviewUrl:            string;
    yelpReviewUrl:               string;
    hasClasses:                  boolean;
    classInfo:                   string;
    isBazaar:                    boolean;
    createdAt:                   Date;
    updatedAt:                   Date;
    bazaarDetails:               BazaarDetail[];
    instagramPhotos:             InstagramPhoto[];
    products:                    Product[];
    primaryTag:                  number;
    shopOwner2:                  ShopOwner2;
    storeLinks:                  StoreLink[];
    StoreOpeningDaysAndLocation: StoreOpeningDaysAndLocation[];
    storeTags:                   StoreTag[];
}

export interface StoreOpeningDaysAndLocation {
    fineLocation: FineLocation;
    days:         Day[];
}

export interface Day {
    openTime:  string;
    closeTime: string;
    dayId:     number;
}

export interface FineLocation {
    address:      string;
    longtiude:    string;
    lattitude:    string;
    city:         string;
    phone_number: string;
    email:        string;
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

export interface StoreTag {
    storeTagId: number;
    storeId:    number;
    tagId:      number;
}

// export async function addStore(data: StoreData) {
//     try {
//       const response = await axios.post(url + "api/store/addStore", data, {
//         headers: {
          
//           "Content-Type": "application/json",
//         },
//       });
  
//      // console.log(response.data);
//       return response.data;
//     } catch (error) {
//       if (Response) {
//         console.error(
//           "Server responded with non-2xx status",
//           (error as any).response.data
//         );
//       } else if (Request) {
//         console.error("No response received from server");
//       } else {
//         console.error("Error setting up the request", (error as Error).message);
//       }
  
//       throw error;
//     }
//   }