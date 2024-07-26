import axios from "axios";
import { url } from "../../../util/constant";
export interface LoginData {
  username: string;
  password: string;
}
export function login(data: LoginData) {
  return new Promise((resolve) => {
    axios
      .post(url + "/auth/login", data)
      .then(function (response: any) {
        console.log(response);
        resolve(response);
      })
      .catch(function (error: any) {
        console.log(error);
        resolve(error);
      });
  });
}
