// src/pages/SignUp.tsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Title from "../components/Title"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "../lib/supabase"
import { toast } from "react-hot-toast"

const schema = z.object({
  firstname: z.string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters long"),
  lastname: z.string()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters long"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string()
    .min(1, "Password is required")  
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignUpFormData = z.infer<typeof schema>

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Sign up with Supabase
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstname,
            last_name: data.lastname,
            full_name: `${data.firstname} ${data.lastname}`,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        console.error('Signup error:', error);
        return;
      }

      if (authData.user) {
        // Create a profile record in your profiles table (optional)
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              first_name: data.firstname,
              last_name: data.lastname,
              email: data.email,
            },
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't show this to user, just log it
        }

        toast.success('Account created successfully! Please check your email to confirm your account.');
        reset();
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      console.error('Unexpected error:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 pt-24">
      <div className="container max-sm:w-[90%] max-md:w-[70%] max-lg:w-[50%] mx-auto bg-white p-8 rounded-lg shadow-md">
        <Title text1="CREATE" text2="ACCOUNT" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="firstname">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register("firstname")}
                type="text"
                id="firstname"
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="First Name"
              />
            </div>
            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="lastname">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register("lastname")}
                type="text"
                id="lastname"
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Last Name"
              />
            </div>
            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register("email")}
                type="email"
                id="email"
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                disabled={isSubmitting}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                disabled={isSubmitting}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 flex items-center justify-center gap-2 transition-colors"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SignUp