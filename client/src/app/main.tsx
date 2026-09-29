import { createRoot } from 'react-dom/client'
import '@/styles/globals.css'
import { router } from '@/app/router'
import { RouterProvider } from "react-router-dom";
import { Providers } from "@/app/providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);