
import { Link, NavLink } from 'react-router-dom'
import smLogo from '../assets/SMblue.svg'
import storeLogo from '../assets/store logo.svg'
import { BsSearch } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { BiCart } from 'react-icons/bi'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Menu from './Menu'


function Nav() {

    const items = useContext(ShopContext)

  return (
    <nav className='flex bg-linear-to-r from-gray-200 to-gray-100 justify-between items-center px-5 shadow-sm py-8 fixed w-full z-10'>
        <Link to={'/'}>
            <img src = {smLogo} alt="logo" className='max-sm:w-20 mb-px' />
            <img src = {storeLogo} alt="logo" className='max-sm:w-[78px] w-[95px]' />
        </Link>
        <div className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to={'/'} className = "flex flex-col items-center gap-1" >
                <p>Home</p>
                <hr className=' w-2/4 h-0.5 bg-gray-700 hidden' />
            </NavLink>

            <NavLink to={'/collection'} className = "flex flex-col items-center gap-1" >
                <p>Collection</p>
                <hr className=' w-2/4 h-0.5 bg-gray-700 hidden' />
            </NavLink>

            <NavLink to={'/about'} className = "flex flex-col items-center gap-1" >
                <p>About</p>
                <hr className=' w-2/4 h-0.5 bg-gray-700 hidden' />
            </NavLink>

            <NavLink to={'/contact'} className = "flex flex-col items-center gap-1" >
                <p>Contact</p>
                <hr className=' w-2/4 h-0.5 bg-gray-700 hidden' />
            </NavLink>
        </div>

        <div className='flex items-center gap-6'>

            <Link to={'/collection'}>
                <BsSearch fontSize={'20px'} />
            </Link>

            <div className='group relative'>
                <Link to={'/login'}><CgProfile fontSize={'25px'} /></Link>
                <div 
                    className='
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
                <BiCart fontSize={'35px'} />
                <p 
                    className='
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
                        text-[8px] '
                >{items?.cartCount ?? 0}</p>
            </Link>

            <Menu/>
        </div>
        

    </nav>
  )
}

export default Nav