// src/App.tsx
import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import Contact from "./pages/Contact"
import About from "./pages/About"
import ProductDetail from "./pages/Product"
import Cart from "./pages/Cart"
import LogIn from "./pages/LogIn"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Nav from "./components/Nav"
import Error from "./pages/Error"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Terms from "./pages/Terms"
import Wishlist from "./pages/Wishlist"
import Notification from "./pages/Notification"
import AdminProduct from "./pages/AdminProduct"
import AdminLayout from "./pages/AdminLayout"
import Statistics from "./pages/Statistics"
import Reports from "./pages/Reports"
import Payments from "./pages/Payments"
import Customers from "./pages/Customers"
import AdminOrders from "./pages/AdminOrders"
import Help from "./pages/Help"
import AdminNavbar from "./components/AdminNavbar"

// If Settings is not exported correctly, import it differently
import { Settings } from 'lucide-react'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, [location]);

  return (
    <div 
      className="
        min-h-screen 
        bg-gradient-to-br 
        from-gray-50 
        to-gray-100"
    >
      <Nav />
      <AdminNavbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:category/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Error />} />

          {/* Admin Routes */}
          <Route path="/admin/product" element={<AdminProduct />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/statistics" element={<Statistics />} />
          <Route path="/admin/notification" element={<Notification />} />
          <Route path="/admin/help" element={<Help />} />
          <Route path="/admin/settings" element={<div>Settings Page</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App