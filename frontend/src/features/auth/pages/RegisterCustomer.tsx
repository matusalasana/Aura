import { useForm } from "react-hook-form";
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";

import { type RegisterInput, registerSchema } from "../schemas";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useRegisterCustomer } from "../hooks/useRegisterCustomer";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { useResendOTP } from "../hooks/useResendOTP";
import { useCountdown } from "../hooks/useCountdown"

import OTPCard from "../components/OTPCard"

const RegisterCustomer = () => {
  const navigate = useNavigate();

  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { mutate: registerUser, isPending: registerPending } = useRegisterCustomer();
  const { mutate: verifyEmail, isPending: verifyEmailPending } = useVerifyEmail();
  const { mutate: resendOTP, isPending: otpResendPending } = useResendOTP();
  const { countdown, isRunning, start } = useCountdown(60);
  
  const isPending =
    verifyEmailPending ||
    registerPending;
  
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [otpEmail, setOTPEmail] = useState<null | string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    setOTPEmail(data.email)
    registerUser(data, {
      onSuccess: () => {
        setIsOTPOpen(true);
      },
    });
  };
  
  const handleOtpComplete = (code: string) => {
    const data = {
      email: otpEmail,
      otp: code
    }
    verifyEmail(data, {
      onSuccess: () => {
        setIsOTPOpen(false);
        navigate("/")
      },
    })
  };
  
  const handleOtpResend = (email: string, type: string) => {
    const data = {
      email,
      type
    }
    resendOTP(data,{
      onSuccess: () => {
        start(60)
      }
    }
    )
  }


  if (userLoading) {
    return (
      <div className="
        min-h-screen
        flex items-center justify-center
        bg-zinc-50
        dark:bg-zinc-950
      ">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }


  if (user) {
    return <Navigate to="/" replace />;
  }


  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-zinc-50
        px-4
        dark:bg-zinc-950
      "
    >
      { 
        isOTPOpen && 
          <OTPCard
            email={otpEmail}
            onComplete={handleOtpComplete}
            onResend={handleOtpResend}
            resending={otpResendPending || isRunning}
            type="verify_email"
            countdown={countdown}
          />
      }
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-md
          space-y-5
          rounded-2xl
          border border-zinc-200
          bg-white
          p-8
          shadow-xl
          dark:border-zinc-800
          dark:bg-zinc-900
        "
      >

        <div className="space-y-2 text-center">
          <h1
            className="
              text-3xl font-bold
              text-zinc-900
              dark:text-zinc-100
            "
          >
            Create Account
          </h1>

          <p
            className="
              text-sm
              text-zinc-500
              dark:text-zinc-400
            "
          >
            Join Aura and start shopping
          </p>
        </div>


        {/* Name */}
        <div className="space-y-2">
          <label className="
            text-sm font-medium
            text-zinc-700
            dark:text-zinc-300
          ">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            className={inputStyle}
            {...register("name")}
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>


        {/* Email */}
        <div className="space-y-2">
          <label className="
            text-sm font-medium
            text-zinc-700
            dark:text-zinc-300
          ">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className={inputStyle}
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>


        {/* Password */}
        <div className="space-y-2">
          <label className="
            text-sm font-medium
            text-zinc-700
            dark:text-zinc-300
          ">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className={inputStyle}
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>


        <button
          type="submit"
          disabled={isPending}
          className="
            flex w-full
            items-center justify-center gap-2
            rounded-lg
            bg-amber-500
            px-4 py-3
            font-semibold
            text-white
            transition
            hover:bg-amber-600
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>


        <p className="
          text-center
          text-sm
          text-zinc-600
          dark:text-zinc-400
        ">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/login-customer")}
            className="
              font-semibold
              text-amber-600
              hover:text-amber-700
              dark:text-amber-400
              dark:hover:text-amber-300
            "
          >
            Login
          </button>
        </p>

      </form>
    </div>
  );
};


const inputStyle = `
  w-full rounded-lg
  border border-zinc-300
  bg-zinc-50
  px-4 py-3
  text-zinc-900
  outline-none
  transition

  placeholder:text-zinc-400

  focus:border-amber-500
  focus:ring-2
  focus:ring-amber-500/20

  dark:border-zinc-700
  dark:bg-zinc-800
  dark:text-zinc-100
  dark:placeholder:text-zinc-500
`;


export default RegisterCustomer;