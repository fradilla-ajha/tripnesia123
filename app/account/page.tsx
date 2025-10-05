import { redirect } from "next/navigation"
import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"

async function requireUser() {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    // user not signed in -> no account page; send to login
    redirect("/auth/login")
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, is_admin, avatar_url")
    .eq("id", user.id)
    .maybeSingle()
  return { user, profile }
}

type Booking = {
  id: number
  destination_id: number | null
  guests?: number | null
  status?: string | null
  date?: string | null
}

async function getMyBookings(userId: string): Promise<Booking[]> {
  const supabase = getSupabaseServerClient()
  const { data } = await supabase
    .from("bookings")
    .select("id, destination_id, guests, status, date")
    .eq("user_id", userId)
    .order("id", { ascending: false })
  return data || []
}

export default async function AccountPage() {
  const { user, profile } = await requireUser()
  const bookings = await getMyBookings(user.id)

  return (
    <main className="mx-auto max-w-5xl p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Akun Saya</h1>
          <p className="text-sm text-muted-foreground">
            {profile?.full_name || user.email}
            {profile?.is_admin ? " • Admin" : ""}
          </p>
        </div>
        {profile?.is_admin ? (
          <Link href="/admin" className="text-sm text-primary hover:underline">
            Buka Admin →
          </Link>
        ) : null}
      </div>

      <section className="grid gap-4">
        <div className="rounded-xl border bg-card p-5">
          <div className="mb-3 text-sm font-medium">Pemesanan Terbaru</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left">ID</th>
                  <th className="px-3 py-2 text-left">Destinasi</th>
                  <th className="px-3 py-2 text-left">Tamu</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="px-3 py-2">{b.id}</td>
                    <td className="px-3 py-2">{b.destination_id ?? "-"}</td>
                    <td className="px-3 py-2">{b.guests ?? "-"}</td>
                    <td className="px-3 py-2">{b.status ?? "-"}</td>
                    <td className="px-3 py-2">{b.date ?? "-"}</td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">
                      Belum ada pemesanan.{" "}
                      <Link href="/destinations" className="text-primary hover:underline">
                        Cari destinasi
                      </Link>
                      .
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}
