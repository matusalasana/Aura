import { createBrowserRouter } from "react-router-dom";


// Layouts 
import AppLayout from "../layouts/AppLayout";

// Public pages
import Home from "../dashboard/customer/pages/Home";

// Customer pages
import ProtectedCustomerRoutes from "@/features/auth/components/ProtectedCustomerRoutes";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Customer Public Pages
      {
        index: true,
        element: <Home />,
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

  // Vendor Protected Routes 
  {
    path: "/",
    element: <ProtectedCustomerRoutes />, 
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <h1>Admin Dashboard </h1>,
          },
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