import { useForm } from "react-hook-form";
import { type LoginInput, loginSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLogin } from "../hooks/useLogin";

const LoginCustomer = () => {
  const navigate = useNavigate();

  const { data: user, isLoading } = useCurrentUser();
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
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-md space-y-6
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
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Welcome Back
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Login to continue to your account
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="
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
            "
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="
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
            "
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
            flex w-full items-center justify-center gap-2
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
            "Login"
          )}
        </button>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register-customer")}
            className="
              font-semibold
              text-amber-600
              transition
              hover:text-amber-700
              dark:text-amber-400
              dark:hover:text-amber-300
            "
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginCustomer;