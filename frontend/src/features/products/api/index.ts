import API from "../../../config/api"

export const getProducts = async() => {
  const res = await API.get("/products");
  return res.data;
}