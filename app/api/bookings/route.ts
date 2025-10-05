import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("bookings").select("*").order("id", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const mapped = (data || []).map((b) => ({
    id: b.id,
    name: b.name,
    type: b.type as "flight" | "ship" | "hotel",
    destination: b.destination,
    date: b.date,
  }))

  return NextResponse.json({ data: mapped })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.name || !body.type || !body.destination || !body.date)
      return NextResponse.json({ error: "Missing required fields: name, type, destination, date" }, { status: 400 })

    if (!["flight", "ship", "hotel"].includes(String(body.type)))
      return NextResponse.json({ error: "Invalid type. Must be flight | ship | hotel" }, { status: 400 })

    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name: String(body.name),
          type: String(body.type),
          destination: String(body.destination),
          date: String(body.date),
        },
      ])
      .select("*")
      .maybeSingle()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    if (!body.id) return NextResponse.json({ error: "Missing 'id' field" }, { status: 400 })

    if (body.type && !["flight", "ship", "hotel"].includes(String(body.type)))
      return NextResponse.json({ error: "Invalid type. Must be flight | ship | hotel" }, { status: 400 })

    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from("bookings")
      .update({
        ...(body.name && { name: String(body.name) }),
        ...(body.type && { type: String(body.type) }),
        ...(body.destination && { destination: String(body.destination) }),
        ...(body.date && { date: String(body.date) }),
      })
      .eq("id", body.id)
      .select("*")
      .maybeSingle()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    if (!data) return NextResponse.json({ error: "Booking not found" }, { status: 404 })

    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    if (!body.id) return NextResponse.json({ error: "Missing 'id' field" }, { status: 400 })

    const supabase = getSupabaseServerClient()
    const { error } = await supabase.from("bookings").delete().eq("id", body.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ message: `Booking with id ${body.id} deleted successfully` })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}
