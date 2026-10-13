
import api from "@/lib/axios";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type {Plan} from "@/types/plan";


const createPlan = async (data: Plan) => {
  const res = await api.post("/payments/plans", data);
  return res.data.data;
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlan,
    onSuccess: ({message}) => {
      toast.success(message ?? "created")
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
    onError: (error) => {
      getErrorMessage(error)
    }
  });
};
