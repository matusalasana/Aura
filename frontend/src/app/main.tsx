import { createRoot } from 'react-dom/client'
import '../styles/globals.css'
import { router } from './router'
import { RouterProvider } from "react-router-dom";
import { Providers } from "./providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);