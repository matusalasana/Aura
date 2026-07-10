import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

const becomeVendor = async (data: FormData) => {
  const res = await api.post("/vendors", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const useBecomeVendor = () => {
  return useMutation({
    mutationFn: becomeVendor,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};