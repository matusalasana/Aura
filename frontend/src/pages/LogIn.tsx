// src/pages/LogIn.tsx
import { useState } from "react"
import Footer from "../components/Footer"
import Title from "../components/Title"
import { Eye, EyeOff, Mail, Lock, ArrowRight, UserPlus } from "lucide-react"
import { BsFacebook, BsGoogle } from "react-icons/bs"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { toast } from "react-hot-toast"

const schema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  remember: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

function LogIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    }
  });
  
  const { register, handleSubmit, reset, formState: { errors } } = form;

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        console.error('Login error:', error);
      } else {
        toast.success('Logged in successfully!');
        console.log('Logged in:', authData);
        reset();
        navigate('/'); // Redirect to home page
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      toast.error('Google login failed');
      console.error('Google login error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      toast.error('Facebook login failed');
      console.error('Facebook login error:', error);
    }
  };

  return (
    <div className="pt-30 bg-linear-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="container bg-white rounded-2xl max-sm:px-3 max-md:px-5 max-lg:px-7 max-xl:px-10 max-2xl:px-12 2xl:px-15 py-10 max-sm:w-[90%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%] max-2xl:w-[50%] 2xl:w-[50%] mx-auto my-10 shadow-xl">
        <Title text1="WELCOME" text2="BACK"/>
        <p className="text-center text-gray-600 mx-auto text-sm wrap-break-words">
          Sign in to your account to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-5 mt-10">
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <input 
                {...register("email")} 
                placeholder="Enter your email" 
                type="email" 
                className="w-full focus:outline-none px-10 py-2 border border-gray-300 rounded-lg" 
                disabled={loading}
              />
              <Mail size={20} className="text-gray-600 absolute top-2.5 left-2"/>
            </div>
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input 
                {...register("password")} 
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'} 
                className="w-full py-2 focus:outline-none border border-gray-300 rounded-lg px-10" 
                disabled={loading}
              />
              <Lock size={20} className="text-gray-600 absolute top-2.5 left-2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-2 text-gray-600 hover:text-black"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
            
            <div className="flex justify-end mt-1">
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-600 hover:text-gray-700 font-semibold"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input 
              {...register("remember")} 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4"
              disabled={loading}
            />
            <label htmlFor="remember" className="cursor-pointer text-gray-600">
              Remember me
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 w-full text-white rounded-lg py-2 transition-colors"
          >
            <span className="font-semibold">
              {loading ? 'Signing in...' : 'Sign In'}
            </span>
            {!loading && <ArrowRight size={15} className="text-white" />}
          </button>

          <div className="flex justify-center gap-3 items-center">
            <div className="h-0.5 w-full bg-gray-300"></div>
            <p className="text-xs text-gray-500 whitespace-nowrap px-2">Or continue with</p>
            <div className="h-0.5 w-full bg-gray-300"></div>
          </div>

          <div className="flex flex-row max-sm:flex-col gap-5">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 w-full hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <BsGoogle size={20} />
              <span className="text-sm">Google</span>
            </button>
            
            <button 
              type="button"
              onClick={handleFacebookLogin}
              disabled={loading}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 w-full hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <BsFacebook size={20} />
              <span className="text-sm">Facebook</span>
            </button>
          </div>

          <div className="flex flex-col justify-center items-center mt-2">
            <p className="text-center text-gray-600">Don't have an account?</p>
            <Link 
              to="/signup" 
              className="flex gap-1.5 justify-center items-center text-blue-600 hover:text-blue-700 font-bold mt-1"
            >
              <UserPlus size={20} />
              <span>Sign up now</span>
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default LogIn