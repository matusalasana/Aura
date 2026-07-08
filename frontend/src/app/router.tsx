import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "@/pages/ErrorPage"

// Layouts 
import AppLayout from "@/layouts/AppLayout";

// Public pages
import Home from "@/dashboard/customer/pages/Home";

// Customer pages
import ProtectedCustomerRoutes from "@/features/auth/components/ProtectedCustomerRoutes";

import RegisterCustomer from "@/features/auth/pages/RegisterCustomer"
import LoginCustomer from "@/features/auth/pages/LoginCustomer"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Customer Public Pages
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login-customer",
        element: <LoginCustomer />
      },
      {
        path: "/register-customer",
        element: <RegisterCustomer />
      },
      
      // Customer Protected Pages
      {
        element: <ProtectedCustomerRoutes />,
        children: [
          {
            path: "/order",
            element: <h1> Orders page</h1>
          }
        ],
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