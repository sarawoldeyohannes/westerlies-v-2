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

export interface Link {
    linkTypeId: number;
    linkTypeName: string;
}
export interface Days{
    dayId: number;
    dayName: string;
}
  // Function to fetch tags from the API using axios
  export const fetchTags = async () => {
    try {
      const response = await axios.get(`${url}/tag`);
      console.log("RESPONSE:  ", response.data);
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
  export async function addStore(data: StoreData) {
    try {
      console.log('Sending data to API:', data); // Log data being sent
      const response = await axios.post(url + "/store/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('API response:', response.data); // Log API response
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // AxiosError type error
        if (error.response) {
          console.error("Server responded with non-2xx status", error.response.data);
        } else if (error.request) {
          console.error("No response received from server", error.request);
        } else {
          console.error("Error setting up the request", error.message);
        }
      } else {
        // Non-AxiosError type error
        console.error("Unexpected error", error);
      }
      throw error;
    }
  }