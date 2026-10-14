import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import type { ApiResponse } from "@/types/api";

const getProducts = async (slug: string): Promise<Product[]> => {
  const res = await api.get<ApiResponse<Product[]>>(`/stores/${slug}/products`);
  return res.data.data;
};

export const useProducts = (slug: string) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(slug),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};