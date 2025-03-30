import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

if (!SUPABASE_URL) {
  throw new Error('Missing environment variable: SUPABASE_URL')
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
