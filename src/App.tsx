import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import LogIn from "./pages/LogIn"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Nav from "./components/Nav"
import Error from "./pages/Error"
import { useEffect } from "react"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Terms from "./pages/Terms"
import Wishlist from "./pages/Wishlist"

function App() {
  const page = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior:'auto'
    });
  }, [page]);

  return (
      <div 
        className="
        min-h-screen 
        bg-linear-to-br 
        from-gray-50 
        to-gray-100"
      >

        <Nav />

        <main>
          <Routes>
            <Route 
              path="/" 
              element={<Home />} />
            <Route 
  path="/collection" 
  element={
    <Collection 
    />
  } 
/>
            <Route  
              path="/about" 
              element={<About />} />
            <Route  
              path="/contact" 
              element={<Contact />} />
            <Route  
              path="/product/:category/:productId" 
              element={<Product />} />
            <Route  
              path="/cart" 
              element={<Cart />} />
            <Route
              path= "/wishlist"
              element={<Wishlist/>} />
            <Route  
              path="/login" 
              element={<LogIn />} />
            <Route  
              path="/signup" 
              element={<SignUp/>} />
            <Route  
              path="/profile" 
              element={<Profile/>} />
            <Route  
              path="/place-order" 
              element={<PlaceOrder />} />
            <Route  
              path="/orders" 
              element={<Orders />} />
            <Route
              path="/terms"
              element= {<Terms />} />
            <Route  
              path="/404" 
              element={<Error />} />
            <Route  
              path="*" 
              element={<Error />} />
          </Routes>
        </main>
        
      </div>
  )
}

export default App