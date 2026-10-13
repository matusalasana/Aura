
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { Plan } from "@/types/plan";
import type { ApiResponse } from "@/types/api";

const getPlans = async (): Promise<Plan[]> => {
  const res = await api.get<ApiResponse<Plan[]>>("payments/plans");
  return res.data.data;
};

export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 30,
  });
};