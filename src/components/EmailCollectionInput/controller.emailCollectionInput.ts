import axios from "axios";
import { url } from "../../util/constant";


export  const addEmail =  async (email:string) => {
    return new Promise((resolve,reject) =>{
        axios.post(`${url}/email/add/`,{"email": email}).then((response: any) => {
            
            resolve(response.data);
        }).catch((err: any) =>{
            reject(err);
        })
        
    })
}