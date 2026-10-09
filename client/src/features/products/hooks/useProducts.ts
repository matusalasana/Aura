import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import type { ApiResponse } from "@/types/api";

const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<ApiResponse<Product[]>>("/products");
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