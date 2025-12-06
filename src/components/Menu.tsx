import { Link, useLocation } from "react-router-dom"
import { CgClose, CgProfile } from "react-icons/cg"
import { BiCart, BiHome, BiCollection, BiPhone, BiUser } from "react-icons/bi"
import { FiHeart, FiShoppingBag, FiInfo } from "react-icons/fi"
import { MenuIcon, Phone } from "lucide-react"
import { useEffect, useState } from "react"

function Menu() {

  const location = useLocation();

  useEffect( () => {
    closeMenu()
  },[location.pathname])

  const navigationItems = [
    { path: "/", label: "Home", icon: BiHome },
    { path: "/collection", label: "Collection", icon: BiCollection },
    { path: "/about", label: "About", icon: FiInfo },
    { path: "/contact", label: "Contact", icon: BiPhone },
  ]

  const accountItems = [
    { path: "/profile", label: "Profile", icon: CgProfile },
    { path: "/wishlist", label: "Wishlist", icon: FiHeart },
    { path: "/orders", label: "Orders", icon: FiShoppingBag },
  ]

  const quickActionItems = [
    { path: "/cart", label: "Cart", icon: BiCart },
    { path: "/login", label: "Login", icon: BiUser },
  ]

  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }


  return (
    <>
    <MenuIcon onClick={() => openMenu()} className="text-[#FFFFFF]" />
     { isOpen && 
     <div className = {`flex flex-col gap-5 fixed top-0 right-0 z-50 h-screen bg-white max-sm:w-[65%] max-md:w-[45%] max-lg:w-[40%] max-xl:w-[30%] max-2xl:w-[25%] py-10`}>


        <div className="flex shrink-0 justify-between items-center px-3">
          <div className="flex gap-3">
            <Link to={'/profile'}><p className="cursor-poiter bg-indigo-600 text-white font-semibold w-12 h-12 flex items-center justify-center rounded-2xl">SM</p></Link>
            <div>
              <Link to={'/profile'}><p className="font-bold cursor-pointer">Sana Matusala</p></Link>
              <p className="text-gray-600">Welcome back!</p>
            </div>
          </div>
          <CgClose onClick={() => closeMenu()} size={25} className="hover:text-gray-700 text-gray-500 cursor-pointer" />
        </div>
        <hr className="border-gray-300" />


      <div className="overflow-y-auto px-3">
        <div className="flex flex-col gap-3">
          <p className="text-gray-600 font-semibold mt-5">NAVIGATION</p>
          {navigationItems.map((item, index) => {

            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
                <Link to={item.path} key={index} className={`flex justify-between items-center  font-semibold transition-colors duration-200 p-2 rounded-lg
                  ${isActive 
                    ? 'text-gray-600 bg-gray-50 border-gray-600' 
                    : 'text-gray-700 hover:text-gray-600 hover:bg-gray-50' } `}>
                  <div className="flex gap-3">
                    <Icon size={20} />
                    <p className="bb">{item.label}</p>
                  </div>
                  <p className= {`h-2 w-2 bg-blue-400 rounded-full ${isActive ? 'block' : 'hidden'} `}></p>
                </Link>
            )
          })}
        </div>


        <div className="flex flex-col gap-5">
          <p className="text-gray-600 font-semibold mt-5">ACCOUNT</p>
            {accountItems.map((item, index) => {

              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link to={item.path} key={index} className={`flex justify-between items-center  font-semibold transition-colors duration-200 p-2 rounded-lg
                  ${isActive 
                    ? 'text-gray-600 bg-gray-50 border-gray-600' 
                    : 'text-gray-700 hover:text-gray-600 hover:bg-gray-50' } `}>
                  <div className="flex gap-3">
                    <Icon size={20} />
                    <p>{item.label}</p>
                  </div>
                  <p className= {`h-2 w-2 bg-blue-400 rounded-full ${isActive ? 'block' : 'hidden'} `}></p>
                </Link>
              )
            })}
        </div>


        <div className="flex flex-col gap-3">
          <p className="text-gray-600 font-semibold mt-5">NAVIGATION</p>
          {quickActionItems.map((item, index) => {

            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
                <Link to={item.path} key={index} className={`flex justify-between items-center  font-semibold transition-colors duration-200 p-2 rounded-lg
                  ${isActive 
                    ? 'text-gray-600 bg-gray-50 border-gray-600' 
                    : 'text-gray-700 hover:text-gray-600 hover:bg-gray-50' } `}>
                  <div className="flex gap-3">
                    <Icon size={20} />
                    <p className="bb">{item.label}</p>
                  </div>
                  <p className= {`h-2 w-2 bg-blue-400 rounded-full ${isActive ? 'block' : 'hidden'} `}></p>
                </Link>
            )
          })}
        </div>


        <div className="flex flex-col gap-5">
          <p className="text-gray-600 font-semibold mt-5">SUPPORT</p>
          <div className="flex items-center gap-3 cursor-pointer">
            <Phone color="blue" className="bg-gray-100 w-10 h-10 p-2 rounded-lg"/>
            <div>
              <p className="text-gray-700 font-semibold">Call Support</p>
              <p className="text-gray-700">+251-945807386</p>
            </div>
          </div>
        </div>

      </div>


      </div>   }
    </>
  )
}

export default Menu