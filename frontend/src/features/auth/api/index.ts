import API from "../../../config/api";
import { type RegisterInput, type LoginInput } from "../types";

export const register = async (data: RegisterInput) => {
  const res = await API.post("/auth/register", data);
  return res.data.data;
};

export const login = async (data: LoginInput) => {
  const res = await API.post("/auth/login", data);
  const { accessToken, user } = res.data;
  
  return user;
};

export const logout = async () => {
  const res = await API.post("/auth/logout");
  
  return res.data.message;
};

export const getMe = async () => {
  const res = await API.get("/auth/me");
  return res.data.data;
};

export const refreshToken = async () => {
  const res = await API.post("/auth/refresh");
  const { accessToken } = res.data;
  
  return accessToken;
};