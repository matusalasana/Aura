import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "@/pages/ErrorPage"

// Layouts 
import AppLayout from "@/layouts/AppLayout";
import StoreLayout from "@/layouts/StoreLayout";

// Public pages
import Home from "@/dashboard/customer/pages/Home";
import ContactPage from "@/pages/ContactPage";
import AboutPage from "@/pages/AboutPage";
import PricingPage from "@/pages/PricingPage";
import ServicesPage from "@/pages/ServicesPage";
import PublicStorePage from "@/features/stores/pages/PublicStorePage";

// Auth pages
import Signup from "@/features/auth/pages/Signup"
import Signin from "@/features/auth/pages/Signin"
import ProtectedRoutes from "@/features/auth/components/ProtectedRoutes";

// Customer Pages
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage";
import CartPage from "@/features/cart/pages/CartPage";
import CheckoutPage from "@/features/checkout/pages/CheckoutPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import AccountPage from "@/features/customer/pages/AccountPage";

// Store pages
import StoreDashboard from "@/dashboard/store/pages/StoreDashboard";
import StoreProductsPage from "@/features/stores/pages/StoreProductsPage";


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
        path: "contact",
        element: <ContactPage />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "pricing",
        element: <PricingPage />
      },
      {
        path: "services",
        element: <ServicesPage />
      },
      {
        path: "shop/:slug",
        element: <PublicStorePage />
      },
    ],
  },

  // Customer protected routes
  {
    path: "/",
    element: <ProtectedRoutes roles={["customer"]} />, 
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "account",
            element: <AccountPage />
          },
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/checkout",
            element: <CheckoutPage />,
          },
          {
            path: "/orders",
            element: <OrdersPage />,
          },
        ]
      }
    ]
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
            path: ":slug",
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