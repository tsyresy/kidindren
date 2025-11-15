// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jzyuwachlzbdkcnckpuk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eXV3YWNobHpiZGtjbmNrcHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzMzMzAsImV4cCI6MjA3ODYwOTMzMH0.OAUPnFv0YgiJ3iug75lPsnSkuQmBeoGe6uXgOHThoBM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)