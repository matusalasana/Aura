import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

// Response Interceptor to handle automatic silent token updates on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      originalRequest.url !== "/auth/refresh"
    ) {
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Cookie is now updated, retry automatically sends it
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // The backend reads your old refresh cookie, updates both cookies, 
        // and sends back the HTTP headers to store them.
        await axios.post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true });
        
        processQueue(null);
        
        // Retry original request. The browser will automatically use the fresh cookie.
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default API;
