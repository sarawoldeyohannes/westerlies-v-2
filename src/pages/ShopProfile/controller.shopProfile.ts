import axios from "axios";
import { url } from "../../util/constant";

export const items = [
    { id: 1, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 4, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Name', description: 'Primary Tag', imageUrl: 'https://via.placeholder.com/300' }]
    
    export const insta = [
        { id: 1,   imageUrl: 'https://via.placeholder.com/300' },
        { id: 2,   imageUrl: 'https://via.placeholder.com/300' },
        { id: 4,   imageUrl: 'https://via.placeholder.com/300' },
        { id: 3,  imageUrl: 'https://via.placeholder.com/300' }]


    export async function getStoreBY_id(storeId: string) {
        let response = await axios.get(`${url}/store/${storeId}`);
        return response.data;
      }


    export async function getNearbayStores(storeId: number) {
        let response = await axios.get(`${url}/store/get_near_by_store/${storeId}`);
        return response.data;
      }