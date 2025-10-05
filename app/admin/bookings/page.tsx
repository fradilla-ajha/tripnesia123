import { getSupabaseServerClient } from "@/lib/supabase/server"

type Booking = {
  id: number
  user_id: string | null
  destination_id: number | null
  guests?: number | null
  status?: string | null
  date?: string | null
  created_at?: string
}

async function getBookings(): Promise<Booking[]> {
  const supabase = getSupabaseServerClient()
  const { data } = await supabase.from("bookings").select("*").order("id", { ascending: false })
  return data || []
}

export default async function AdminBookingsPage() {
  const data = await getBookings()

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Pemesanan</h1>
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">User</th>
              <th className="px-3 py-2 text-left">Destinasi</th>
              <th className="px-3 py-2 text-left">Tamu</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-3 py-2">{b.id}</td>
                <td className="px-3 py-2">{b.user_id || "-"}</td>
                <td className="px-3 py-2">{b.destination_id ?? "-"}</td>
                <td className="px-3 py-2">{b.guests ?? "-"}</td>
                <td className="px-3 py-2">{b.status ?? "-"}</td>
                <td className="px-3 py-2">{b.date ?? "-"}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-center text-muted-foreground" colSpan={6}>
                  Belum ada pemesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
