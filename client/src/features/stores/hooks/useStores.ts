import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Store } from "@/types/store";
import type { ApiResponse } from "@/types/api";

const getStores = async (): Promise<Store[]> => {
  const res = await api.get<ApiResponse<Store[]>>(`/stores`);
  
  return res.data.data;
};

export const useStores = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};