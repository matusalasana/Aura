// src/App.tsx
import { useEffect, useState } from 'react'

import { supabase } from './lib/supabaseClient'
import { useQuery } from '@tanstack/react-query'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*')
      if (error) throw new Error(error.message)
      return data
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>


  return (
    <div>
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
