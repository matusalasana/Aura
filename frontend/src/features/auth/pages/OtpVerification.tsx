import OTPCard from "../components/OTPCard"
import { useSendOTP } from "../hooks/useSendOTP";
import { useNavigate, Navigate } from "react-router-dom";

import { useSignupStore } from "../stores/signupStore";

const OtpVerification = () => {
  const { mutate: sendOTP, isPending } = useSendOTP();
  const navigate = useNavigate();
  const { data } = useSignupStore();

  const handleSendOTP = (otp: string) => {
    sendOTP({
      email: data.email,
      type: "sign-up"
    })
    navigate("")
  }
  return (
    <div>
      OTP verification page
      <OTPCard
        onComplete={(otp:string) => handleSendOTP()}
        email={data.email}
        type="sign-in"
        resending={isPending}
        countdown={5}
      />
    </div>
  )
}

export default OtpVerification