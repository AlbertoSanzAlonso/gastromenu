import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from '@/lib/supabase/config'

export { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from '@/lib/supabase/config'

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
)
