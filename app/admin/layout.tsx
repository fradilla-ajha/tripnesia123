import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import type { ReactNode } from "react"

async function requireAdmin() {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, is_admin, full_name")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile?.is_admin) redirect("/unauthorized")

  return { user, profile }
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const { profile } = await requireAdmin()

  return (
    <div className="min-h-dvh grid md:grid-cols-[220px_1fr]">
      <aside className="hidden md:block border-r bg-card/50">
        <div className="p-4">
          <div className="font-semibold">Tripnesia Admin</div>
          <div className="text-xs text-muted-foreground">{profile?.full_name}</div>
        </div>
        <nav className="grid gap-1 p-2">
          <Link href="/admin" className="rounded-md px-3 py-2 hover:bg-accent">
            Dashboard
          </Link>
          <Link href="/admin/destinations" className="rounded-md px-3 py-2 hover:bg-accent">
            Destinasi
          </Link>
          <Link href="/admin/bookings" className="rounded-md px-3 py-2 hover:bg-accent">
            Pemesanan
          </Link>
        </nav>
      </aside>
      <main className="p-4 md:p-6">{children}</main>
    </div>
  )
}
