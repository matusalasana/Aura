import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import type { ApiResponse } from "@/types/api";

const getStoreProducts = async (slug: string): Promise<Product[]> => {
  const res = await api.get<ApiResponse<Product[]>>(`/products/${slug}`);
  return res.data.data;
};

export const useStoreProducts = (slug: string) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getStoreProducts(slug),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};