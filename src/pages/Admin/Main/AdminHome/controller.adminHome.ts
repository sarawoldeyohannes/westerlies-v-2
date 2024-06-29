import { url } from "../../../../util/constant";
import { StoreData } from "../Add/controller.add";
import axios from 'axios';
export interface StoreInfo {
  id: number;
  storeName: string;
  city?: string;
  country?: string;
}

  // Function to fetch data from the API using axios
export const fetchData = async (): Promise<StoreData[]> => {
  try {
    const response = await axios.get(`${url}/store/`);
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};
// Function to map store data to the required structure
const mapStoreData = (data: any[]): StoreInfo[] => {
  if (!Array.isArray(data)) {
    console.error("Expected array but received:", data);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    storeName: item.name,
    city: item.fineLocations?.[0]?.city || "N/A",
    country: item.fineLocations?.[0]?.country || "N/A",
    // Map other properties as needed
  }));
};


// Export the fetchData function for use in other parts of your application
export const getMappedStoreData = async () => {
  const data = await fetchData();
  return mapStoreData(data);
};