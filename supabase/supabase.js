
import { createClient } from '@supabase/supabase-js'
//import { SUPABASE_URL, SUPABASE_PUBLIC_KEY } from '@env';

const supabaseUrl = process.env.EXPO_PUBLIC_API_URL
const supabaseKey = process.env.EXPO_PUBLIC_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase };