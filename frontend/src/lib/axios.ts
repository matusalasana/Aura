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

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/auth/refresh");

        setAccessToken(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch {
        clearAccessToken();

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;