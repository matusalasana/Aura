
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
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
      <App />
  </BrowserRouter>
)
