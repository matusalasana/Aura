import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Store } from "@/types/store";
import type { ApiResponse } from "@/types/api";

const getMyStore = async (): Promise<Store> => {
  const res = await api.get<ApiResponse<Store>>(`/stores/me`);
  
  return res.data.data;
};

export const useMyStore = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: getMyStore,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};