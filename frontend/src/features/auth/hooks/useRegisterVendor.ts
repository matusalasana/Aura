import api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@utils/getErrorMessage";
import { RegisterVendorInput } from "../../types/auth";

const registerVendor = async (data: RegisterVendorInput) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  const res = await api.post("/auth/register/vendor", formData);

  return res.data;
};

export const useRegisterVendor = () => {
  return useMutation({
    mutationFn: registerVendor,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};