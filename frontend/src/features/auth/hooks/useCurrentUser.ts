import api from "../../api"
import { useQuery } from "@tanstack/react-query";


const getCurrentUser = async () => {
  const res = await api.get("/auth/me")
  return res.data.user
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000*60*30,
  });
};