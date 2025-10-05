import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getServerSupabase } from "@/lib/supabase/server"

export async function GET() {
  const cookieStore = await cookies()
  const supabase = getServerSupabase(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ authenticated: false, is_admin: false })
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle()

  return NextResponse.json({ authenticated: true, is_admin: !!profile?.is_admin })
}
