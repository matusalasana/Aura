
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { ApiResponse } from "@/types/api";

const deleteStore = async (storeId: string ): Promise<string | undefined > => {
  const res = await api.delete<ApiResponse<string | undefined >>(`/stores/${storeId}`);
  return res.data.message;
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStore,
    onSuccess: (message) => {
      toast.success(message ?? "deleted")
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};
