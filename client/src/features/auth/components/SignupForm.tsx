import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { type SignupInput, signupSchema } from "@/features/auth/schemas";
import SocialSigninButton from "@/features/auth/components/SocialSigninButton";


interface SignupFormProps {
  isPending: boolean;
  onClickSubmit: (data: SignupInput) => void;
}


const SignupForm = ({isPending, onClickSubmit}: SignupFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (formData: SignupInput) => {
    onClickSubmit(formData);
  };

  return (
    <main className="card w-full max-w-md shadow-lg animate-scale-in">
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 w-full"
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
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>

        <SocialSigninButton />

        {/* Login */}
        <p className="text-center text-sm muted">
          Already have an account?{" "}
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/sign-in")}
            className="link font-semibold"
          >
            Login
          </Button>
        </p>
      </form>
    </main>
  );
};

export default SignupForm;