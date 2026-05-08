import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { type RegisterInput, registerSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    registerUser(data, {
      onSuccess: () => navigate("/login"),
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-sm space-y-4
          rounded-3xl border border-gray-200 bg-white p-6
          shadow-sm
          dark:border-gray-800 dark:bg-gray-900
        "
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Join Aura today
          </p>
        </div>

        {/* Full name */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Full name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("full_name")}
            className="
              w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm
              outline-none transition
              focus:border-gray-900
              dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-white
            "
          />
          {errors.full_name && (
            <p className="text-sm text-red-500">
              {errors.full_name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="
              w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm
              outline-none transition
              focus:border-gray-900
              dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-white
            "
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password_hash")}
            className="
              w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm
              outline-none transition
              focus:border-gray-900
              dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-white
            "
          />
          {errors.password_hash && (
            <p className="text-sm text-red-500">
              {errors.password_hash.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="
            flex w-full items-center justify-center gap-2
            rounded-xl bg-gray-900 py-2 text-sm font-medium text-white
            transition hover:bg-gray-800
            disabled:cursor-not-allowed disabled:opacity-50
            dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white
          "
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create account"
          )}
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-gray-900 underline hover:opacity-80 dark:text-white"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;