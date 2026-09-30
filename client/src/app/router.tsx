import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "@/pages/ErrorPage"

// Layouts 
import AppLayout from "@/layouts/AppLayout";
import StoreLayout from "@/layouts/StoreLayout";

// Public pages
import Home from "@/dashboard/customer/pages/Home";

// Customer pages
import ProtectedRoutes from "@/features/auth/components/ProtectedRoutes";

// Store pages
import StoreDashboard from "@/dashboard/store/pages/StoreDashboard";
import StoreProductsPage from "@/features/stores/pages/StoreProductsPage";

import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage";
import CartPage from "@/features/cart/pages/CartPage";

import Signup from "@/features/auth/pages/Signup"
import Signin from "@/features/auth/pages/Signin"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      //  App Public Pages
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <Signin />
      },
      {
        path: "/sign-up",
        element: <Signup />
      },
      {
        path: "products/:productId",
        element: <ProductDetailsPage />
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      
      // Customer Protected Pages
      {
        element: <ProtectedRoutes roles={["customer"]} />,
        children: [
          {
            path: "/order",
            element: <h1> Orders page</h1>
          }
        ],
      },
    ],
  },
  
  // Store protected routes
  {
    path: "/stores",
    element: <ProtectedRoutes roles={["vendor", "customer"]} />, 
    children: [
      {
        element: <StoreLayout />,
        children: [
          {
            index: true,
            element: <StoreDashboard />,
          },
          {
            path: "products",
            element: <StoreProductsPage />,
          },
        ]
      },
    ],
  },
  
  // Admin section
  {
    path: "/admin",
    element: <h1>protected routes</h1>, 
    children: [
      {
        element: <h1>Admin Layout </h1>,
        children: [
          {
            index: true,
            element: <h1>Admin Dashboard </h1>,
          },
        ],
      },
    ],
  },
  
]);