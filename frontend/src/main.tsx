import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Simple error logger for Acode
console.log('🚀 App starting...')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const root = document.getElementById('root')
if (!root) {
  console.error('❌ Root element not found!')
} else {
  try {
    createRoot(root).render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </QueryClientProvider>
      </BrowserRouter>
    )
    console.log('✅ App rendered successfully')
  } catch (error) {
    console.error('❌ Render error:', error)
  }
}