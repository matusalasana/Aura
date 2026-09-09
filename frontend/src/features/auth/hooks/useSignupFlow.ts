import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignupStore } from "@/features/auth/stores/signupStore";
import { useSignup } from "@/features/auth/hooks/useSignup";
import { 
  useSendOTP,
  useVerifyOTP
} from "@/features/auth/hooks/useOTP";
import { type SignupInput } from "@/features/auth/schemas";



export const useSignupFlow = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<"form" | "otp">("form");

  const { data, setData, clearData } = useSignupStore();

  const { mutate: sendOTP, isPending: sending } = useSendOTP();
  const { mutate: verifyOTP, isPending: verifying } = useVerifyOTP();
  const { mutate: signup, isPending: registering } = useSignup();

  const startSignup = (formData: SignupInput) => {
    
    sendOTP(
      {
        email: formData.email,
        name: formData.name,
        type: "email-verification",
      },
      {
        onSuccess: () => {
          setData(formData);
          setStep("otp");
        },
      }
    );
  };

  const verifySignupOTP = (otp: string) => {
    verifyOTP(
      {
        email: data.email,
        otp,
        type: "email-verification",
      },
      {
        onSuccess: () => {
          signup(data, {
            onSuccess: () => {
              clearData();
              navigate("/");
            },
          });
        },
      }
    );
    
  };

  return {
    step,
    setStep,
    data,
    startSignup,
    verifySignupOTP,
    sending,
    verifying,
    registering,
  };
};