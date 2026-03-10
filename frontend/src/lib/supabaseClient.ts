import { createClient } from '@supabase/supabase-js'

// Get env vars
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Log for debugging
console.log('🔧 Supabase URL:', supabaseUrl ? '✅ Found' : '❌ Missing')
console.log('🔧 Supabase Key:', supabaseKey ? '✅ Found' : '❌ Missing')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!')
}

// Create client with error handling
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)