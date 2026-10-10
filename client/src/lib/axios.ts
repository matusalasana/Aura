import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000/api/v1"
  : "/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
