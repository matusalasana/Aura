import { useAuth } from './hooks/useAuth';
import { Login } from './pages/Login';
import { Signup } from "./pages/Signup";
import Home from './pages/Home';
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import {Profile} from "./pages/Profile"

import Footer from './components/Footer';
import Navbar from './components/Navbar'; 
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, loading } = useAuth(); //

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#f8f8f8]">
        <h1 className="text-3xl font-black italic animate-pulse">AURA</h1>
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
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

            {/* Protected Routes */}
            <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/profile" />} />
            <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
            <Route path="/order-confirmation" element={user ? <OrderConfirmation /> : <Navigate to="/login" />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
