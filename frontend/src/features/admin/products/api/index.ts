import API from "../../../../config/api";
import { AddProductInput } from "../types";

export const addProduct = async (data: AddProductInput) => {
  const res = await API.post("/products", data);

  return res.data;
};