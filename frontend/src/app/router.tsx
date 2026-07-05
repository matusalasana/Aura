import { createBrowserRouter } from "react-router-dom";


// Layouts 
import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";


// Components
// import ProtectedRoutes from "../components/auth/ProtectedRoutes";

// Public pages
import Home from "../dashboard/customer/pages/Home";


const VITE_ADMIN_LOGIN_URL = import.meta.env.VITE_ADMIN_LOGIN_URL | "http://localhost:9000/api/v1";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Public pages
      {
        index: true,
        element: <Home />,
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