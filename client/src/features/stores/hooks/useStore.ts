import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Store } from "@/types/store";
import type { ApiResponse } from "@/types/api";

const getStore = async (slug: string): Promise<Store> => {
  const res = await api.get<ApiResponse<Store>>(`/stores/${slug}`);
  
  return res.data.data;
};

export const useStore = (slug: string) => {
  return useQuery({
    queryKey: ["stores", slug],
    queryFn: () => getStore(slug),
    enabled: Boolean(slug),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};