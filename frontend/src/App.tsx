import { useAuth } from './hooks/useAuth';
import { Login } from './pages/Login';
import { Signup } from "./pages/Signup";
import Home from './pages/Home';
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { Profile } from "./pages/Profile";
import Error from "./pages/Error";

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminLogin from './pages/admin/Login';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

import Footer from './components/Footer';
import Navbar from './components/Navbar'; 
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo(0, 0);
  }, [pathname]);
  const { loading } = useAuth();
  

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#f8f8f8]">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-black mx-auto mb-4"></div>
          </div>
          <h1 className="text-3xl font-black italic animate-pulse">AURA</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="App selection:bg-indigo-100 selection:text-indigo-900">
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
      
      <div className="flex min-h-screen flex-col">
        <Navbar /> 
        
        <main className="flex-grow pt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<div>Customers (Coming Soon)</div>} />
              <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
            </Route>

            {/* Protected User Routes */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            
            {/* 404 */}
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;