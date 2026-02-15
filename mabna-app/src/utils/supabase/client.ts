import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL = "https://nozwgjjkecyrpkpybrdf.supabase.co",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vendnamprZWN5cnBrcHlicmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODQwMzIsImV4cCI6MjA4NjA2MDAzMn0.jz7eUl7OhwM - NgeNIBS8_Kx73FTxilpeF1NZSkGZu88
    )
}
