import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { type  SignupInput } from "../schemas";

const sendOTP = async ({email, type, name}) => {
  const res = await api.post("/auth/send-otp", {name, email, type})
  return res.data.success;
};

export const useSendOTP = () => {
  return useMutation({
    mutationFn: sendOTP,
  });
};