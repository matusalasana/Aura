import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import Home from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from "./pages/Signup"
import { ProductDetails } from "./pages/ProductDetails"
import { Cart } from "./pages/Cart"
import { Checkout } from "./pages/Checkout"
import { OrderConfirmation } from "./pages/OrderConfirmation"
import { Profile } from "./pages/Profile"
import Error from './pages/Error'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Hooks
import { useAuth } from './hooks/useAuth'

// Admin
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute'

function AppContent() {
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8f8f8]">
        <div className="text-center">
          <h1 className="text-4xl font-black italic animate-pulse mb-2">AURA</h1>
          <p className="text-xs text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          
          {/* Auth */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

          {/* Protected */}
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/order-confirmation" element={user ? <OrderConfirmation /> : <Navigate to="/login" />} />
          
          {/* Admin */}
          <Route path="/admin/login" element={!user ? <AdminLogin /> : <Navigate to="/admin" />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return <AppContent />
}

export default App