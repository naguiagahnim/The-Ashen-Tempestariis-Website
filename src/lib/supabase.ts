import {createClient} from "@supabase/supabase-js"

const url = "https://pupnkwsnlalxsujhffpw.supabase.co"
const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1cG5rd3NubGFseHN1amhmZnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjcyOTgsImV4cCI6MjA2MTUwMzI5OH0.dJY3Ub-pfKfHtx1sV_I61MkkEFP_HQ2g9ztfZSNk1Ss"

export const supabase = createClient(url, anon_key)