import { useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Title from "../components/Title"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"

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
  confirmPassword: z.string().optional()
})

type SignUpFormData = z.infer<typeof schema>

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {register, handleSubmit, formState: {errors} } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: SignUpFormData) => {
    console.log('submitted form,',data)
  }
  
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 pt-24">
      
      <div className="container max-sm:w-[90%] max-md:w-[70%] max-lg:w-[50%] mx-auto bg-white p-8 rounded-lg shadow-md">
        <Title text1="CREATE" text2="ACCOUNT" />

        <form onSubmit={handleSubmit(onSubmit)} method="post" action={'/signup'} className="">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("firstname")}
                type="text"
                id="username"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First Name"
              />
            </div>
            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("lastname")}
                type="text"
                id="lastname"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            Sign Up <ArrowRight />
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
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