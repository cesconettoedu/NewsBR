
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_API_URL
const supabaseKey = process.env.EXPO_PUBLIC_API_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)