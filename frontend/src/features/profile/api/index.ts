import API from "../../../config/api";

export const getMe = async () => {
  const res = await API.get("/auth/me");
  return res.data.data;
};