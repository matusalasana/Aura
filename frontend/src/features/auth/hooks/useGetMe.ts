import { getMe } from "../api"

import { useQuery } from "@tanstack/react-query";


export const useGetMe = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: getMe
  })
}