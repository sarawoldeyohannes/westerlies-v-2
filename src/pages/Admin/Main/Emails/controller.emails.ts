import { url } from "../../../../util/constant";
import axios from 'axios';


  // Function to fetch data from the API using axios
export const fetchData = async () => {
  try {
    const response = await axios.get(`${url}/email/get`);
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};