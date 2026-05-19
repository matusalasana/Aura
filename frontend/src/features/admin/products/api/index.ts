import API from "../../../../config/api";

export const addProduct = async (data) => {
  const res = await API.post("/products", data);

  return res.data;
};