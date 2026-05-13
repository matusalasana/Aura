import API from "../../../config/api";
import { type RegisterInput, type LoginInput } from "../types";

export const register = async (data: RegisterInput) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginInput) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await API.post("/auth/logout");
  return res.m;
};

export const refresh = async () => {
  const res = await API.post("/auth/refresh");
  return res.data;
};