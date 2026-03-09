import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const ToastContainer = lazy(() => 
  import('react-toastify').then(module => ({ 
    default: module.ToastContainer 
  }))
)

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Suspense fallback={null}>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
      />
    </Suspense>
    <App />
  </BrowserRouter>
)