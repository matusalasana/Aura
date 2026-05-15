import axios from 'axios';

// Access token lives here — module-level
let accessToken = null;

export const setAccessToken   = (token: string) => { accessToken = token; };
export const getAccessToken   = () => accessToken;
export const clearAccessToken = () => { accessToken = null; };

const API = axios.create({
baseURL: 'http://localhost:3000/api/v1',
withCredentials: true,
});

// Attach access token to every outgoing request
API.interceptors.request.use(
(config) => {
if (accessToken) {
config.headers['Authorization'] = `Bearer ${accessToken}`;
}
return config;
});

// On 401 → try silent refresh, then retry the original request
API.interceptors.response.use(
(response) => response,

async (error) => {
const originalRequest = error.config;

// Prevent infinite refresh loop  
if (  
  error.response?.status === 401 &&  
  !originalRequest._retry &&  
  originalRequest.url !== "/auth/refresh"  
) {  

  originalRequest._retry = true;  

  try {  
    const res = await API.post("/auth/refresh");  

    setAccessToken(res.data.accessToken);  

    originalRequest.headers["Authorization"] =  
      `Bearer ${res.data.accessToken}`;  

    return API(originalRequest);  

  } catch (refreshError) {  

    clearAccessToken();  

    return Promise.reject(refreshError);  
  }  
}  

return Promise.reject(error);

}
);

export default API;