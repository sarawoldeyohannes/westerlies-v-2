import axios from "axios";
import { url } from "../../../../util/constant";
export interface StoreData {
    fineLocations?: FineLocation[];
    storeId?: number;
    name:                        string;
    about:                       string;
    moreInfo:                    string;
    description:                 string;
    learnWithUs:                 string;
    meetUs:                      string;
    isClaimed:                   number;
    storePicture:                string;
    googleReiviewUrl:            string;
    yelpReviewUrl:               string;
    hasClasses:                  number;
    classInfo:                   string;
    isBazaar:                    number;
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
  id?:             number;
  storeId?:        number;
  dayId:          number;
  openTime:       string;
  closeTime:      string;
  fineLocationId?: number;
}

export interface FineLocation {
  fineLocationId?: number;
    longtiude:    string;
    lattitude:    string;
    city:         string;
    phoneNumber: string;
    state: string;
    zipCode: string;
    street: string;
    email:        string;
    storeOpeningDays?: Day[];
}

export interface BazaarDetail {
    bazaarInfo: string;
}

export interface InstagramPhoto {
  instagramPhotosId?: number;
  li: string;
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
  storeLinkId?: number;
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
    tagTypeId:      number;
    tagName:        string;
    tagDescription: string;
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
  export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post(`${url}/file-upload/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.fileNew.path;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };
  export async function addStore(data: StoreData) {
    try {
      const response = await axios.post(url + "/store/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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