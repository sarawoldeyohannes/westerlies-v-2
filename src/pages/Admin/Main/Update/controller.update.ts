import axios from "axios";
import { url } from "../../../../util/constant";
import { StoreData } from "../Add/controller.add";
export async function UpdateStore(data: StoreData, id:string) {
    try {
      console.log('Sending data to API:', data); // Log data being sent
      const response = await axios.put(url + `/store/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('API response:', response.data); // Log API response
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
  export async function fetchStoreById( id:string) {
    try {
      const response = await axios.get(url + `/store/${id}`, );
      console.log('Fetch by Id response:', response.data); // Log API response
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