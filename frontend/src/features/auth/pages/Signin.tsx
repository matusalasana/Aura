import { useForm } from "react-hook-form";
import { type SigninInput, signinSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useSignin } from "../hooks/useSignin";

const Signin = () => {
  const navigate = useNavigate();

  const { data: user, isLoading } = useCurrentUser();
  const { mutate: signinUser, isPending } = useSignin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data: SigninInput) => {
    signinUser(data, {
      onSuccess: () => navigate("/"),
    });
  };

  if (isLoading) {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-full max-w-md space-y-6 p-8 shadow-lg animate-scale-in"
      >
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="heading text-3xl">
            Welcome Back
          </h1>

          <p className="subheading text-sm">
            Signin to continue to your account
          </p>
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
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Register */}
        <p className="text-center text-sm muted">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/sign-up")}
            className="link font-semibold"
          >
            Sign up
          </button>
        </p>
      </form>
    </main>
  );
};

export default Signin;