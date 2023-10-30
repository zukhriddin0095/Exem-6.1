import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINT, TOKEN } from "../constants";
import { toast } from "react-toastify";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1/`,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${Cookies.get(TOKEN)}`,
  },
});

request.interceptors.response.use(
  (res) => res,
  (err) => {
    toast.error(err.response?.data.message);
    return Promise.reject(err);
  }
);



export default request;
