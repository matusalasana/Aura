import { Routes, Route } from "react-router-dom";
import ProtectRoutes from "./features/auth/components/ProtectRoutes"
import Topbar from "./shared/ui/Topbar/Topbar"
import Footer from "./shared/ui/Footer"
import ScrollToTop from './shared/utils/ScrollToTop';
// Pages
import RegisterationPage from "./features/auth/pages/RegisterationPage";
import LoginPage from "./features/auth/pages/LoginPage"
import ProductsPage from "./features/products/pages/ProductsPage"
import Collections from "./features/products/pages/Collections"
import CartPage from "./features/cart/pages/CartPage"
import Homepage from "./features/home/pages/Homepage"
import ProfilePage from "./features/profile/pages/ProfilePage"
import About from "./shared/ui/About"
import Dev from "./shared/ui/Dev"

const App = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      
      <ScrollToTop />
      <Topbar/>
      
      <Routes>
      
        {/* PUBLIC ROUTES*/}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterationPage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/dev" element={<Dev />} />
        
        {/* PROTECTED ROUTES */}
        <Route element={<ProtectRoutes />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        
      </Routes>
      
      <Footer />
      
    </div>
  )
}

export default App;