import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";

import { type SignupInput, signupSchema } from "../schemas";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useSendOTP } from "../hooks/useSendOTP";
import { useSocialSignin } from "@/features/auth/hooks/useSocialSignin"
import { useSignupStore } from "../stores/signupStore";

import OTPCard from "../components/OTPCard";

const Signup = () => {
  const navigate = useNavigate();

  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { mutate: sendOTP, isPending: sending } = useSendOTP();
  const { mutate: signinWithSocial, isPending: signingInWithSocial} = useSocialSignin();

  const { setData } = useSignupStore();
  const [ isOpen, setIsOpen ] = useState(false);
  
  const isPending = sending || signingInWithSocial;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupInput) => {
    sendOTP({
      email: data.email,
      name: data.name,
      type: "email-verification"
    }, {
      onSuccess: () => navigate("/verify-otp")
    })
  };

  if (userLoading) {
    return (
      <div className="flex-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      {isOpen && (
      <OTPCard
        email={data.email}
        type="sign-in"
        resending={sending}
        countdown={5}
      />
      )}
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-full max-w-md space-y-5 p-8 shadow-lg animate-scale-in"
      >
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="heading text-3xl">
            Create Account
          </h1>

          <p className="subheading text-sm">
            Join Aura and start shopping
          </p>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="label">
            Full Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="input"
            {...register("name")}
          />

          {errors.name && (
            <p className="error-text mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="input"
            {...register("email")}
          />

          {errors.email && (
            <p className="error-text mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="label">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="input"
            {...register("password")}
          />

          {errors.password && (
            <p className="error-text mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full"
        >
          {sending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        <button
          onClick={() => signinWithSocial("google")}
          disabled={isPending}
          className="btn btn-secondary w-full space-x-2"
          type="button"
        >
         <img 
           src="images/google.svg" 
           alt="google logo"
           className="w-5 h-5 rounded"
          /> 
          <p className="text-accent">
            {signingInWithSocial 
              ? "Continuing with Google ..." 
              : "Continue with Google " }
          </p>
        </button>

        {/* Login */}
        <p className="text-center text-sm muted">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/sign-in")}
            className="link font-semibold"
          >
            Login
          </button>
        </p>
      </form>
    </main>
  );
};

export default Signup;