import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "@/pages/ErrorPage"

// Layouts 
import AppLayout from "@/layouts/AppLayout";
import VendorLayout from "@/layouts/VendorLayout";

// Public pages
import Home from "@/dashboard/customer/pages/Home";

// Customer pages
import ProtectedRoutes from "@/features/auth/components/ProtectedRoutes";

// Vendor pages
import VendorDashboard from "@/dashboard/vendor/pages/VendorDashboard";

import Signup from "@/features/auth/pages/Signup"
import Signin from "@/features/auth/pages/Signin"


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
        path: "/sign-in",
        element: <Signin />
      },
      {
        path: "/sign-up",
        element: <Signup />
      },
      // Customer Protected Pages
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/order",
            element: <h1> Orders page</h1>
          }
        ],
      },
    ],
  },
  
  // Vendor protected routes
  {
    path: "/vendor",
    element: <ProtectedRoutes role={["vendor", "customer"]} />, 
    children: [
      {
        element: <VendorLayout />,
        children: [
          {
            index: true,
            element: <VendorDashboard />,
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