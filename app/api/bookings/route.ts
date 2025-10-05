import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

//
// === GET ===
//
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  const supabase = getSupabaseServerClient()

  let query = supabase.from("bookings").select("*").order("id", { ascending: true })
  if (id) query = query.eq("id", id)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: "Booking not found" }, { status: 404 })

  const mapped = data.map((b) => ({
    id: b.id,
    name: b.name,
    type: b.type as "flight" | "ship" | "hotel",
    destination: b.destination,
    date: b.date,
  }))

  return NextResponse.json({ data: id ? mapped[0] : mapped })
}

//
// === POST ===
//
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, type, destination, date } = body

    if (!name || !type || !destination || !date)
      return NextResponse.json({ error: "Missing required fields: name, type, destination, date" }, { status: 400 })

    if (!["flight", "ship", "hotel"].includes(String(type)))
      return NextResponse.json({ error: "Invalid type. Must be flight | ship | hotel" }, { status: 400 })

    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from("bookings")
      .insert([{ name, type, destination, date }])
      .select("*")
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ message: "Booking created successfully", data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

//
// === PUT ===
//
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, name, type, destination, date } = body

    if (!id) return NextResponse.json({ error: "Missing 'id' field" }, { status: 400 })
    if (type && !["flight", "ship", "hotel"].includes(String(type)))
      return NextResponse.json({ error: "Invalid type. Must be flight | ship | hotel" }, { status: 400 })

    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from("bookings")
      .update({
        ...(name && { name }),
        ...(type && { type }),
        ...(destination && { destination }),
        ...(date && { date }),
      })
      .eq("id", id)
      .select("*")
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    if (!data) return NextResponse.json({ error: "Booking not found" }, { status: 404 })

    return NextResponse.json({ message: "Booking updated successfully", data })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

//
// === DELETE ===
//
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) return NextResponse.json({ error: "Missing 'id' parameter" }, { status: 400 })

  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("bookings").delete().eq("id", id).select("*")

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data || data.length === 0) return NextResponse.json({ error: "Booking not found" }, { status: 404 })

  return NextResponse.json({ message: `Booking with id ${id} deleted successfully`, data })
}
