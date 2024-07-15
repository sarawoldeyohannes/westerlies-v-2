import { url } from "../../../../util/constant";
import { StoreData } from "../Add/controller.add";
import axios from 'axios';


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
// function to search free
export const freeSearch = async ( freeSearchtxt: string): Promise<StoreData[]> => {
  try {
    const response = await axios.get(`${url}/store/freeSearch/${freeSearchtxt}`);
    console.error('Fetch success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};
// function to delete store
export const deleteStore = async ( storeId: string): Promise<StoreData[]> => {
  try {
    const response = await axios.delete(`${url}/store/freeSearch/${storeId}`);
    console.error('deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('delete error:', error);
    return [];
  }
};