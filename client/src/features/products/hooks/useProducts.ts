import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getProducts = async () => {
  const res = await api.get("/products");
  return res.data.data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};