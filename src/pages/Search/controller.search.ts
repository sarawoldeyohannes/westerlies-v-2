import axios from "axios";
import { url } from "../../util/constant";

export const searchitems = [
    { id: 1, title: 'Name1', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Name2', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name3', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name4', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name5', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name6', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name7', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name8', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name9', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name10', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name11', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name12', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name13', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name14', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name15', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name16', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name17', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name18', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name19', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name20', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    // Add more items as needed
  ];


  export async function searchLocation(searchTerm: any) {
    let response = await axios.get(`${url}/store/long/${searchTerm.lng}/lat/${searchTerm.lat}`);
    return response.data;
  }