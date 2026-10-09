import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import type { ApiResponse } from "@/types/api";


const getProduct = async (productId: string): Promise<Product> => {
  const res = await api.get<ApiResponse<Product>>(`/products/${productId}`);
  return res.data.data;
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};