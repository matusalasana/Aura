import { 
  getCategories
} from "../api"

import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  
  return useQuery({
    queryFn: getCategories,
    queryKey: ["categories"]
  });
}