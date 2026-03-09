// src/components/Nav.tsx
import { Link, NavLink, useLocation } from 'react-router-dom'
import storeLogo from '../assets/logo.svg'
import { BsSearch } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { BiCart } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import Menu from './Menu'
import useCartStore from "../stores/cartStore"
import useUIStore from "../stores/uiStore"

function Nav() {
    const location = useLocation();
    
    const cartItems = useCartStore((state) => state.items)
    const openSearch = useUIStore((state) => state.openSearch)
    const cartCount = cartItems.length

    const [showNavbar, setShowNavbar] = useState(true);
    
    useEffect(() => {
        const adminPaths = [
            '/admin', '/admin/orders', '/admin/product', '/admin/payments', 
            '/admin/customers', '/admin/reports', '/admin/statistics', 
            '/admin/notification', '/admin/help', '/admin/settings'
        ];
        setShowNavbar(!adminPaths.includes(location.pathname));
    }, [location.pathname])

    return (
        <>
            {showNavbar && (
                <nav className='flex bg-gray-800 justify-between items-center px-5 shadow-sm shadow-gray-600 pt-8 pb-5 fixed w-full z-10'>
                    <Link to={'/'}>
                        <img src={storeLogo} alt="logo" className='max-sm:w-[110px] w-[125px]' />
                    </Link>
                    
                    <div className='hidden sm:flex gap-5 font-semibold text-sm text-[#FFFFFF]'>
                        <NavLink to={'/'} className="flex flex-col items-center gap-1">
                            <p>Home</p>
                            <hr className='w-2/4 h-0.5 bg-gray-700 hidden' />
                        </NavLink>
                        <NavLink to={'/collection'} className="flex flex-col items-center gap-1">
                            <p>Collection</p>
                            <hr className='w-2/4 h-0.5 bg-gray-700 hidden' />
                        </NavLink>
                        <NavLink to={'/about'} className="flex flex-col items-center gap-1">
                            <p>About</p>
                            <hr className='w-2/4 h-0.5 bg-gray-700 hidden' />
                        </NavLink>
                        <NavLink to={'/contact'} className="flex flex-col items-center gap-1">
                            <p>Contact</p>
                            <hr className='w-2/4 h-0.5 bg-gray-700 hidden' />
                        </NavLink>
                    </div>

                    <div className='flex items-center gap-6'>
                        <Link to={'/collection'}>
                            <BsSearch onClick={openSearch} fontSize={'20px'} className='text-[#FFFFFF]'/>
                        </Link>

                        <div className='group relative'>
                            <Link to={'/login'}><CgProfile fontSize={'25px'} className='text-[#FFFFFF]'/></Link>
                            <div className='
                                absolute 
                                right-0 
                                py-5 
                                px-5 
                                w-25
                                rounded
                                dropdown-menu 
                                hidden
                                group-hover:block 
                                bg-slate-200 
                                text-slate-500'
                            >
                                <p className='cursor-pointer hover:text-black'><Link to="/profile">Profile</Link></p>
                                <p className='cursor-pointer hover:text-black'><Link to="/orders">Orders</Link></p>
                                <p className='cursor-pointer hover:text-black'><Link to="/">Log out</Link></p>
                            </div>
                        </div>

                        <Link to="/cart" className='relative'>
                            <BiCart fontSize={'35px'} className='text-[#FFFFFF]'/>
                            {cartCount > 0 && (
                                <p className='
                                    absolute 
                                    right-[-5px] 
                                    bottom-[-5px] 
                                    w-4
                                    text-center
                                    leading-4
                                    bg-red-600 
                                    text-white 
                                    aspect-square
                                    font-semibold 
                                    rounded-full 
                                    text-[8px]
                                '>
                                    {cartCount > 9 ? '9+' : cartCount}
                                </p>
                            )}
                        </Link>

                        <Menu />
                    </div>
                </nav>
            )}
        </>
    )
}

export default Nav