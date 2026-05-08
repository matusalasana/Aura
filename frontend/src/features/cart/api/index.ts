import API from "../../../config/api"
// import { type CartItem, type LoginInput } from "../types";


export const getCartItems = async() => {
  const res = await API.get("/cart");
  return res.data;
};

export const addToCart = async ({
  productId,
  quantity,
}: { productId: string; quantity: number; }) => {
  const res = await API.post("/cart/items", { productId, quantity });
  return res.data;
};

export const updateCartItem = async( id: string, data:any) => {
  const res = await API.patch(`/cart/items/${id}`, data);
  return res.data;
};

export const deleteCartItem = async(id: string) => {
  const res = await API.delete(`/cart/items/${id}`);
  return res.data;
};