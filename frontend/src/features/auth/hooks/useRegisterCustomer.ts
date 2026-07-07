import api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@utils/getErrorMessage";
import { RegisterCustomerInput } from "../../types/auth";

const registerCustomer = async (data: RegisterCustomerInput) => {
  const res = await api.post("/auth/register/customer", data);
  return res.data;
};

export const useRegisterCustomer = () => {
  return useMutation({
    mutationFn: registerCustomer,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};