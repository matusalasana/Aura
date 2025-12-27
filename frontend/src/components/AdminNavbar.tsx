
import {    useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu';


function AdminNavbar() {

    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(true);
      useEffect( () => {
        if  (location.pathname === '/admin' 
            || location.pathname === '/admin/orders' 
            || location.pathname === '/admin/product' 
            || location.pathname === '/admin/payments' 
            || location.pathname === '/admin/customers'
            || location.pathname === '/admin/reports' 
            || location.pathname === '/admin/statistics' 
            || location.pathname === '/admin/notification' 
            || location.pathname === '/admin/help' 
            || location.pathname === '/admin/settings' ) {
          setShowNavbar(true);
        } else {
          setShowNavbar(false);
        }
      },[location.pathname])

  return (
    <>
    { showNavbar &&
    <nav className=' flex bg-gray-800 justify-center items-center px-5 shadow-sm shadow-gray-600 pt-8 pb-5 fixed w-full z-10'>
        <AdminMenu/>
        <p className='text-white text-2xl font-serif font-extrabold'>Dashboard</p>
    </nav>}
    </>
  )
}

export default AdminNavbar