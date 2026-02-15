import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL = "https://nozwgjjkecyrpkpybrdf.supabase.co",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vendnamprZWN5cnBrcHlicmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODQwMzIsImV4cCI6MjA4NjA2MDAzMn0.jz7eUl7OhwM - NgeNIBS8_Kx73FTxilpeF1NZSkGZu88,
,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
