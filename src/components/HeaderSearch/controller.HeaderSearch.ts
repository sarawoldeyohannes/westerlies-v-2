import axios from "axios";
import { url } from "../../util/constant";

export async function getTagsApi(): Promise<any[]>{
    return new Promise((resolve,reject) =>{
        axios.get(`${url}/tag`).then((response: any) => {
            resolve(response.data);
        }).catch((err: any) =>{
            reject(err);
        })
        
    })
}

export async function searchStores_Combined(body: any): Promise<any[]>{
    return new Promise((resolve,reject) =>{
        axios.post(`${url}/store/combined_search/`,body).then((response: any) => {
            
            resolve(response.data);
        }).catch((err: any) =>{
            reject(err);
        })
        
    })
}