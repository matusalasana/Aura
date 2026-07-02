import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import '../index'
import { router } from "./router";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,               
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5,   // 5 min cache
    },
  },
});


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
      <Toaster />
    </Providers>
  </StrictMode>
);