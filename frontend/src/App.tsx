// src/App.tsx
import { useEffect, useState } from 'react'

import { supabase } from './lib/supabaseClient'
import { useQuery } from '@tanstack/react-query'
import { useProducts } from './hooks/useProducts'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>


  return (
    <div>
    <button className="bg-blue-700 text-white font-semibold rounded-lg px-4 py-2">
        Add To Cart
      </button>
      <h1>Product List ({products.length})</h1>
      {products.length === 0 ? (
        <p>No products found. Did you add them to the dashboard?</p>
      ) : (
        products.map(item => <img key={item.id} src={item.image[0]} />)
      )}
      <ToastContainer />
    </div>
  )
}

export default App
