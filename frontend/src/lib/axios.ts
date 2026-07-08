import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "@/utils/token";

let BASE_URL;
if(import.meta.env.DEV){
  BASE_URL="http://localhost:9000/api/v1"
}else{
  BASE_URL = import.meta.env.VITE_API_URL
}

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});


// RESPONSE INTERCEPTOR
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const token = getAccessToken();

    if (!token) {
      return Promise.reject(error);
    }
    const original = error.config;
    if ((error.response?.status === 403 || error.response?.status === 401) && !original._retry) {
      original._retry = true;

      // dedupe concurrent refresh calls if multiple requests 403 at once
      if (!refreshPromise) {
        refreshPromise = api.post('/auth/refresh').then((res) => {
          setAccessToken(res.data.accessToken);
          refreshPromise = null;
          return res.data.accessToken;
        }).catch((err) => {
          refreshPromise = null;
          setAccessToken(null);
          window.location.href = "/login-customer";
          throw err;
        });
      }

      const newToken = await refreshPromise;
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    }
    return Promise.reject(error);
  }
);

export default api;