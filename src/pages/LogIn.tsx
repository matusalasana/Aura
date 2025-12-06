import { useState } from "react"
import Footer from "../components/Footer"
import Title from "../components/Title"
import { Eye, EyeOff, Mail, Lock, ArrowRight, UserPlus } from "lucide-react"
import { BsFacebook, BsGoogle } from "react-icons/bs"

function LogIn() {

  const [showPassword, setShowPassword] =useState(false)



  return (

    <div className="pt-30 bg-linear-to-b from-gray-100 to-gray-200">
      <div className=" container bg-white rounded-2xl max-sm:px-3 max-md:px-5 max-lg:px-7 max-xl:px-10 max-2xl:px-12 2xl:px-15 py-10 max-sm:w-[90%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%] max-2xl:w-[50%] 2xl:w-[50%] mx-auto my-10 shadow-xl">
        <Title text1="WELCOME" text2="BACK"/>
        <p className="text-center text-gray-600 mx-auto text-sm wrap-break-words">Sign in to your account to continue</p>

        
        <form action="/submit" method="post" className="flex flex-col justify-center gap-5 mt-10">

          <div>
            <label htmlFor="">Email Address</label>
            <div className="relative">
              <input placeholder="Enter your email" type="email" name="email" id="email" className="w-full focus:outline-none px-10 py-2 border border-gray-300 rounded-lg" />
              <Mail size={20} className="text-gray-600 absolute top-2.5 left-2"/>
            </div>
          </div>

          <div>
            <label htmlFor="">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                id="password" 
                className="w-full py-2 focus:outline-none border border-gray-300 rounded-lg px-10" 
              />
              <Lock size={20} className="text-gray-600 absolute top-2.5 left-2" />
              {showPassword ? (
                <EyeOff 
                  size={20} 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="text-gray-600 absolute top-2.5 right-2 cursor-pointer hover:text-black" 
                />
                ) : (
                <Eye 
                  size={20} 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="text-gray-600 absolute top-2.5 right-2 cursor-pointer hover:text-black" 
                />
              )}
            </div>
            <div className="flex justify-end mt-1">
            <label 
              htmlFor="password" 
              className="text-sm text-blue-600 hover:text-gray-700 font-semibold cursor-pointer"
            >
              Forgot Password?
            </label>
          </div>
          </div>


          <div className="flex gap-3">
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember" className="cursor-pointer text-gray-600">Remember me</label>
          </div>

          <div className="flex">
            <button type="submit" className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 w-full text-white rounded-lg py-2">
              <span className="font-semibold">Sign In</span>
              <ArrowRight size={15} className="text-white "/> 
            </button>
          </div>

          <div className="flex justify-center gap-3 items-center">
            <div className="h-0.5 w-full bg-gray-600"></div>
            <p className="text-xs w-110 text-center">Or continue with</p>
            <div className="h-0.5 w-full bg-gray-600"></div>
          </div>

          <div className="flex flex-row max-sm:flex-col gap-5">
            <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 w-full hover:bg-gray-300 cursor-pointer">
              <BsGoogle size={20} />
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 w-full hover:bg-gray-300 cursor-pointer">
              <BsFacebook size={20} />
              <span className="text-sm">Facebook</span>
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-gray-600">Don't have an account?</p>
            <p className="flex gap-1.5 justify-center items-center cursor-pointer hover:text-blue-700 text-blue-600 font-bold">
              <UserPlus size={20} className="text-center" /> 
              <span className="text-center">Sign up now</span>
            </p>
          </div>

        </form>


      </div>
      <Footer />
    </div>

  )
}

export default LogIn