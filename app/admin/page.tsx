import { getSupabaseServerClient } from "@/lib/supabase/server"

async function getCounts() {
  const supabase = getSupabaseServerClient()
  const [{ count: destinations }, { count: bookings }] = await Promise.all([
    supabase.from("destinations").select("*", { count: "exact", head: true }),
    supabase.from("bookings").select("*", { count: "exact", head: true }),
  ])
  return { destinations: destinations || 0, bookings: bookings || 0 }
}

export default async function AdminDashboardPage() {
  const { destinations, bookings } = await getCounts()
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <div className="text-sm text-muted-foreground">Destinasi</div>
          <div className="mt-1 text-3xl font-semibold">{destinations}</div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="text-sm text-muted-foreground">Pemesanan</div>
          <div className="mt-1 text-3xl font-semibold">{bookings}</div>
        </div>
      </div>
    </div>
  )
}
