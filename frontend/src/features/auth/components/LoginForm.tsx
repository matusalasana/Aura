
import { useForm } from "react-hook-form";
import { type LoginInput, loginSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2} from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetMe } from "../hooks/useGetMe";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const navigate= useNavigate()
  const { data: user, isLoading } = useGetMe();
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
      onSuccess: () => navigate("/")
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          {...register("password_hash")}
        />
        {errors.password_hash && (
          <p className="text-red-500 text-sm">{errors.password_hash.message}</p>
        )}

        <button 
          type="submit" 
          disabled={isPending}
          className="btn btn-neutral mt-4"
        >
        { isPending 
          ? <Loader2 className="animate-spin" />
          : "Login"
        }
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;