import { createBrowserRouter } from "react-router-dom";


// Layouts 
import AppLayout from "../layouts/AppLayout";

// Public pages
import Home from "../dashboard/customer/pages/Home";


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