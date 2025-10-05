import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let supabaseServerClient: SupabaseClient | null = null

export function getSupabaseServerClient() {
  if (supabaseServerClient) return supabaseServerClient

  const cookieStore = cookies()

  // Pastikan env sudah tersedia
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  supabaseServerClient = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          // middleware mode → cookies.set kadang read-only
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 })
        } catch {
          // middleware mode → cookies.set kadang read-only
        }
      },
    },
  })

  return supabaseServerClient
}

export function getServerSupabase(..._args: any[]) {
  return getSupabaseServerClient()
}
