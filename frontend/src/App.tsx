import { Routes, Route } from "react-router-dom";
import ProtectRoutes from "./features/auth/components/ProtectRoutes"
import ProductsPage from "./features/products/pages/ProductsPage"
import Collections from "./features/products/pages/Collections"
import LoginPage from "./features/auth/pages/LoginPage"

const App = () => {
  return (
    <div>
  
      <p className="font-bold text-2xl">Welcome to Aura</p>
      
      <Routes>
      
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/collections" element={<Collections />} />
        
        <Route element={<ProtectRoutes />}>
          <Route path="/test" element={<p> This is protected </p>} />
        </Route>
        
      </Routes>
      
    </div>
  )
}

export default App;