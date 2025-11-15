// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hmgjgqchcphpxzwctflr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZ2pncWNoY3BocHh6d2N0ZmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTU4NjMsImV4cCI6MjA3ODc5MTg2M30.7hg-VcGPoKnbBCuG0AkTGdSVfxr2fyiZ5we8Ds1eRqI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)