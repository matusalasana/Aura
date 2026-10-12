import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import type { ApiResponse } from "@/types/api";


type ProductParams = {
  productId?: string;
  slug?: string;
}

const getProduct = async ({productId, slug}: ProductParams): Promise<Product> => {
  const res = await api.get<ApiResponse<Product>>(`/stores/${slug}/products/${productId}`);
  return res.data.data;
};

export const useProduct = ({productId, slug}: ProductParams) => {
  return useQuery({
    queryKey: ["product", productId, slug],
    queryFn: () => getProduct({
      productId,
      slug
    }),
    enabled: !!productId && !!slug,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};