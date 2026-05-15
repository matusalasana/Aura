import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getMe(),
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });
};