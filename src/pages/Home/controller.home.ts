import axios from "axios";
import { url } from "../../util/constant";

export const items = [
    { id: 1, title: 'Test', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Test', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    // Add more items as needed
  ];

  export async function getItems() {
   
      let response = await axios.get(url+'/store/random/20');
      return response.data;
  }

  export async function searchitems(searchTerm: string) {
    let response = await axios.get(`${url}/store/freeSearch/${searchTerm}`);
    return response.data;
  }

  export async function SearchLocation(cityName: string) {
    let response = await axios.get(`${url}/location/city/${cityName}`);
    return response.data;
  }

  export async function getCityDetail(cityId: string) {
    let response = await axios.get(`${url}/location/city/cityId/${cityId}`);
    return response.data;
  }