
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "@/types/order";
import type { ApiResponse } from "@/types/api";

const getOrders = async (): Promise<Order[]> => {
  const res = await api.get<ApiResponse<Order[]>>("/orders");
  return res.data.data;
};

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};