import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getProduct = async (productId: string) => {
  const res = await api.get(`/products/${productId}`);
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