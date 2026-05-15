import API from "../../../config/api";
import {
  setAccessToken,
  getAccessToken, 
  clearAccessToken
} from "../../../config/api";
import { type RegisterInput, type LoginInput } from "../types";

export const register = async (data: RegisterInput) => {
  const res = await API.post("/auth/register", data);
  const { accessToken, user } = res.data;
  setAccessToken(accessToken);
  return res.data;
};

export const login = async (data: LoginInput) => {
  const res = await API.post("/auth/login", data);
  const { accessToken, user } = res.data;
  setAccessToken(accessToken);
  return res.data;
};

export const logout = async () => {
  const res = await API.post("/auth/logout");
  clearAccessToken();
  return res.m;
};