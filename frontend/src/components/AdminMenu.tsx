import { Link, useLocation } from "react-router-dom"
import { CgClose } from "react-icons/cg"
import { BiHome, BiCollection, BiHelpCircle } from "react-icons/bi"
import { FiShoppingBag } from "react-icons/fi"
import { MenuIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { MdPayment } from "react-icons/md"
import { BsPeople } from "react-icons/bs"
import { FcStatistics } from "react-icons/fc"
import { CiSettings } from "react-icons/ci"
import { IoNotificationsOutline } from "react-icons/io5"
import { GiClothes } from "react-icons/gi"

function AdminMenu() {

  const location = useLocation();

  useEffect( () => {
    closeMenu()
  },[location.pathname])

  const navigationItems = [
    { path: "/admin", label: "Dashboard", icon: BiHome },
    { path: "/admin/orders", label: "Orders", icon: FiShoppingBag },
    { path: "/admin/product", label: "Products", icon: GiClothes },
    { path: "/admin/payments", label: "Payments", icon: MdPayment },
    { path: "/admin/customers", label: "Customers", icon: BsPeople },
    { path: "/admin/reports", label: "Reports", icon: BiCollection },
    { path: "/admin/statistics", label: "Statistics", icon: FcStatistics },
    { path: "/admin/notifications", label: "Notifications", icon: IoNotificationsOutline },
    { path: "/admin/help", label: "Help", icon: BiHelpCircle },
    { path: "/admin/settings", label: "Settings", icon: CiSettings },
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
    <MenuIcon onClick={() => openMenu()} className="absolute top-5 left-5 text-white z-10" />
     { isOpen && 
     <div className = {`flex flex-col gap-5 fixed top-0 left-0 z-50 h-screen bg-gray-900 max-sm:w-[50%] max-md:w-[40%] max-lg:w-[30%] max-xl:w-[25%] max-2xl:w-[20%] py-10`}>


        <div className="flex shrink-0 justify-between items-center px-3">
          <div className="flex gap-3">
            <Link to={'/profile'}><p className="cursor-poiter bg-indigo-600 text-white font-semibold w-12 h-12 flex items-center justify-center rounded-2xl">SM</p></Link>
            <div>
              <Link to={'/profile'}><p className="font-bold cursor-pointer text-white">Sana Matusala</p></Link>
              <p className="text-gray-400">Admin</p>
            </div>
          </div>
          <CgClose onClick={() => closeMenu()} size={25} className="hover:text-gray-700 text-gray-500 cursor-pointer" />
        </div>
        <hr className="border-gray-300" />


      <div className="overflow-y-auto px-3">
        <div className="flex flex-col gap-3">
          {navigationItems.map((item, index) => {

            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
                <Link to={item.path} key={index} className={`flex justify-between items-center  font-semibold transition-colors duration-200 p-2 rounded-lg
                  ${isActive 
                    ? 'text-white bg-blue-500 border-gray-600' 
                    : 'text-white hover:bg-gray-700' } `}>
                  <div className="flex gap-3">
                    <Icon size={20} />
                    <p className="bb">{item.label}</p>
                  </div>
                  <p className= {`h-2 w-2 bg-black rounded-full ${isActive ? 'block' : 'hidden'} `}></p>
                </Link>
            )
          })}
        </div>

      </div>


      </div>   }
    </>
  )
}

export default AdminMenu