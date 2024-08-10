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
// Function to delete a store
export const deleteStore = async (storeId: number): Promise<void> => {
  try {
    const response = await axios.get(`${url}/store/delete/${storeId}`);
    console.error('Deleted successfully:', response.data);
  } catch (error) {
    console.error('Delete error:', error);
  }
};