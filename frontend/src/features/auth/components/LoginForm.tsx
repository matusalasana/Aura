import { useForm } from "react-hook-form";
import { useState } from "react";
import { type LoginInput, loginSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, Lock, Mail } from "lucide-react"; // Added Lock and Mail
import { useNavigate, Navigate } from "react-router-dom";
import { useGetMe } from "../../profile/hooks/useGetMe";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetMe();
  const [showPass, setShowPass] = useState(false);
  const { mutate: loginUser, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    loginUser(data, {
      onSuccess: () => navigate("/"),
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-500 dark:text-zinc-400" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all space-y-6 dark:border-zinc-850 dark:bg-zinc-900 md:p-8"
      >
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Login to your account to continue
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-transparent focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:ring-zinc-300"
            />
          </div>
          {errors.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300">
              Password
            </label>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-10 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-transparent focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:ring-zinc-300"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>

        {/* Signup */}
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300 transition"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
