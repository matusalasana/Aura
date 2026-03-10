import { useAuth } from './hooks/useAuth';

import { Login } from './pages/Login';
import { Signup } from "./pages/Signup";
import  Home from './pages/Home';
import {ProductDetails} from "./pages/ProductDetails"
import {Cart} from "./pages/Cart"
import {Checkout} from "./pages/Checkout"

import Footer from './components/Footer';
import Navbar from './components/Navbar'; 

import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#f8f8f8]">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-indigo-400 opacity-20"></div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 italic">AURA</h1>
        </div>
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 animate-pulse">
          Establishing Secure Session
        </p>
      </div>
    );
  }

  return (
    <div className="App selection:bg-indigo-100 selection:text-indigo-900">
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />

      {/* Logic: If logged in, show Navbar + Content + Footer.
          If not logged in, only show the Auth pages.
      */}
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Redirect any unknown path to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div className="flex min-h-screen flex-col">
          <Navbar /> 
          
          <main className="flex-grow pt-16"> {/* pt-16 accounts for fixed navbar */}
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
              
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
