import axios from 'axios';


let BASE_URL;
if(import.meta.env.DEV){
  BASE_URL="http://localhost:9000/api/v1"
}else{
  BASE_URL = import.meta.env.VITE_API_URL
}

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default api;