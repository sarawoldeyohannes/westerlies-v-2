import axios from "axios";
import { url } from "../../../../util/constant";
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
export interface Tag {
    tagId:          number;
    tagTypeId:      null;
    tagName:        string;
    tagDescription: null;
}
export interface Link {
    linkTypeId: number;
    linkTypeName: string;
}
export interface Days{
    dayId: number;
    dayName: string;
}
  // Function to fetch tags from the API using axios
  export const fetchTags = async (): Promise<Tag[]> => {
    try {
      const response = await axios.get(`${url}/tag`);
      return response.data;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  };
    // Function to fetch Links from the API using axios
    export const fetchLinks = async (): Promise<Link[]> => {
        try {
          const response = await axios.get(`${url}/link/link_types`);
          return response.data;
        } catch (error) {
          console.error('Fetch error:', error);
          return [];
        }
      };
  // Function to fetch Days from the API using axios
  export const fetchDays = async (): Promise<Days[]> => {
    try {
      const response = await axios.get(`${url}/day`);
      return response.data;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  };
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