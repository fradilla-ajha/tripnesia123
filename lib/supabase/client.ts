import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let supabaseBrowserClient: SupabaseClient | null = null

export function getSupabaseBrowserClient() {
  if (supabaseBrowserClient) return supabaseBrowserClient
  supabaseBrowserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  return supabaseBrowserClient
}
