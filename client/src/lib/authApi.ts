import axios from "axios";


let BASE_URL;

if(import.meta.env.DEV){
  BASE_URL="http://localhost:3000/api/auth"
}else{
  BASE_URL = import.meta.env.VITE_AUTH_API_URL
}

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default authApi;