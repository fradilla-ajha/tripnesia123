import { getSupabaseServerClient } from "@/lib/supabase/server"
import AdminDestinationForm from "@/components/admin/destination-form"

type Destination = {
  id: number
  name: string
  slug: string
  location?: string | null
  image_url?: string | null
  price?: number | null
  rating?: number | null
  created_at?: string
}

async function getDestinations(): Promise<Destination[]> {
  const supabase = getSupabaseServerClient()
  const { data } = await supabase.from("destinations").select("*").order("id", { ascending: true })
  return data || []
}

export default async function AdminDestinationsPage() {
  const data = await getDestinations()

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Kelola Destinasi</h1>
      </div>

      <AdminDestinationForm />

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-3 py-2 text-left">Nama</th>
              <th className="px-3 py-2 text-left">Slug</th>
              <th className="px-3 py-2 text-left">Lokasi</th>
              <th className="px-3 py-2 text-left">Harga</th>
              <th className="px-3 py-2 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="px-3 py-2">{d.name}</td>
                <td className="px-3 py-2">{d.slug}</td>
                <td className="px-3 py-2">{d.location || "-"}</td>
                <td className="px-3 py-2">{d.price ?? "-"}</td>
                <td className="px-3 py-2">{d.rating ?? "-"}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-center text-muted-foreground" colSpan={5}>
                  Belum ada destinasi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
