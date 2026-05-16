import API from "../../../config/api";

export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const getProduct = async (id: string) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};