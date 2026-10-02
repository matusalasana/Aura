import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getOrders = async () => {
  const res = await api.get("/orders");
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