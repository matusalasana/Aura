import { useForm } from "react-hook-form";
import { Loader2} from "lucide-react";
import { type RegisterInput, registerSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const RegistrationForm = () => {
  const navigate = useNavigate()
  const { mutate: registerUser, isPending } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    registerUser(data, {
      onSuccess: () => navigate ("/login")
    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Sign up</legend>

        <label className="label">Full name</label>
        <input
          type="text"
          className="input"
          {...register("full_name")}
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm">{errors.full_name.message}</p>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
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
          : "Register" 
        }
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;