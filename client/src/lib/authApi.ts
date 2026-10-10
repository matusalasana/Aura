import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000/api/auth"
  : "https://aura-0flj.onrender.com/api/auth";

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default authApi;