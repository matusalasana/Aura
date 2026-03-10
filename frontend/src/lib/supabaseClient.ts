import { createClient } from '@supabase/supabase-js'

// Vite uses import.meta.env instead of process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Add a small check to see if they are loading
if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase Keys! Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey)
