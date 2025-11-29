import { useState } from "react"
import Footer from "../components/Footer"
import Title from "../components/Title"
import { Eye, EyeOff, Mail, Lock, ArrowRight, UserPlus } from "lucide-react"
import { BsFacebook, BsGoogle } from "react-icons/bs"

function LogIn() {

  const [showPassword, setShowPassword] =useState(false)



  return (

      <div className="pt-30 bg-linear-to-r from-blue-100 to-blue-200">

        <div className=" bg-white rounded-2xl pb-10 w-[70%] mx-auto my-10 shadow-xl">
          <Title text1="WELCOME" text2="BACK"/>
          <p className="text-center text-gray-600 text-md">Sign in to your account to continue</p>

          <form action="" className="flex flex-col justify-center gap-5 px-10 mt-10">

            <div>
            <label htmlFor="">Email Address</label>
              <div className="relative">
                <input placeholder="Enter your email" type="email" name="email" id="email" className="w-full focus:outline-none px-10 py-2 border border-gray-300 rounded-lg" />
                <Mail size={20} className="text-gray-600 absolute top-2.5 left-2"/>
              </div>
            </div>
            
            <div>
            <p className="flex justify-between">
              <label htmlFor="">Password</label>
              <label htmlFor="" className="text-blue-600 hover:text-blue-700 font-bold cursor-pointer">Forgot Password?</label>
            </p>
              <div className="relative">
                <input type={`${ showPassword === true ? 'text' : 'password'}`} name="password" id="password" className="w-full py-2 focus:outline-none border border-gray-300 rounded-lg px-10" />
                <Lock size={20} className="text-gray-600 absolute top-2.5 left-2"/>
                { showPassword ? <EyeOff size={20} onClick={ () => setShowPassword(!showPassword) } className="text-gray-600 absolute top-2.5 right-2 cursor-pointer hover:text-black"/> :<Eye size={20} onClick={ () => setShowPassword(!showPassword) } className="text-gray-600 absolute top-2.5 right-2 cursor-pointer hover:text-black" /> }
              </div>
            </div>

            <div className="flex gap-3">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember" className="cursor-pointer">Remember me</label>
            </div>

            <div className="flex">
              <button className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 w-full text-white rounded-lg py-2">
                <span className="font-semibold">Sign In</span>
                <ArrowRight size={15} className="text-white "/> 
              </button>
            </div>

            <div className="flex justify-between items-center">
              <hr className="bg-gray-600 h-0.5 w-25"/>
              <p>Or continue with</p>
              <hr className="bg-gray-600 h-0.5 w-25"/>
            </div>

            <div className="flex gap-5">
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
              <p>Don't have an account?</p>
              <p className="flex gap-2 items-center cursor-pointer hover:text-blue-700 text-blue-600 font-bold">
                <UserPlus size={20} /> 
                <span>Sign up now</span>
              </p>
            </div>

          </form>

        </div>

      <Footer />

    </div>

  )
}

export default LogIn