import { Routes, Route } from "react-router-dom";
import ProtectRoutes from "./features/auth/components/ProtectRoutes"
import Topbar from "./components/Topbar/Topbar"

// Pages
import RegisterationPage from "./features/auth/pages/RegisterationPage";
import LoginPage from "./features/auth/pages/LoginPage"
import ProductsPage from "./features/products/pages/ProductsPage"
import Collections from "./features/products/pages/Collections"
import CartPage from "./features/cart/pages/CartPage"

const App = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      
      <Topbar/>
      
      <Routes>
      
        {/* PUBLIC ROUTES*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterationPage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/products" element={<ProductsPage />} />
        
        {/* PROTECTED ROUTES */}
        <Route element={<ProtectRoutes />}>
          <Route path="/test" element={<p> This is protected </p>} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
        
      </Routes>
      
    </div>
  )
}

export default App;