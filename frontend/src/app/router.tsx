import { createBrowserRouter } from "react-router-dom";


// Layouts 
import Layout from "../layouts/Layout";


// Components
import ProtectedRoutes from "../components/auth/ProtectedRoutes";

// Public pages
import RegisterationPage from "./features/auth/pages/RegisterationPage";
import LoginPage from "./features/auth/pages/LoginPage";
import ProductsPage from "./features/products/pages/ProductsPage";
import Collections from "./features/products/pages/Collections";
import ProductDetailsPage from "./features/products/pages/ProductDetailsPage";
import CartPage from "./features/cart/pages/CartPage";
import Home from "./features/home/pages/Home";
import ProfilePage from "./features/profile/pages/ProfilePage";
import ProductList from "./features/admin/products/pages/ProductList";
import BasicInfoForm from "./features/admin/products/components/BasicInfoForm";
import VariantsForm from "./features/admin/products/components/VariantsForm";
import ProductImagesUploader from "./features/admin/products/components/ProductImagesUploader";
import About from "./shared/ui/About";
import Dev from "./shared/ui/Dev";

// Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminMessages from "../pages/admin/AdminMessages";
import AdminBlogEditor from "../pages/admin/AdminBlogEditor";
import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminSkills from "../pages/admin/AdminSkills";
import AdminExperiences from "../pages/admin/AdminExperiences";

const VITE_ADMIN_LOGIN_URL = import.meta.env.VITE_ADMIN_LOGIN_URL;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Home
      {
        index: true,
        element: <Home />,
      },

      // Public pages
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: VITE_ADMIN_LOGIN_URL,
        element: <Login />,
      },
      {
        path: "test",
        element: <Test />,
      },

      // Projects
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },

      // Blog
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  // Admin section
  {
    path: "/admin",
    element: <ProtectedRoutes />, 
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "messages",
            element: <AdminMessages />,
          },
          {
            path: "blogs",
            element: <AdminBlogs />,
          },
          {
            path: "blogs/new",
            element: <AdminBlogEditor />,
          },
          {
            path: "projects",
            element: <AdminProjects />,
          },
          {
            path: "skills",
            element: <AdminSkills />,
          },
          {
            path: "experiences",
            element: <AdminExperiences />,
          },
        ],
      },
    ],
  },
]);