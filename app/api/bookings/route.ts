import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("bookings").select("*").order("id", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const mapped = (data || []).map((b) => ({
    id: b.id,
    name: b.name,
    type: b.type as "flight" | "ship" | "hotel",
    destination: b.destination,
    date: b.date, // ISO yyyy-mm-dd
  }))
  return NextResponse.json({ data: mapped })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.name || !body.type || !body.destination || !body.date) {
      return NextResponse.json({ error: "Missing required fields: name, type, destination, date" }, { status: 400 })
    }
    if (!["flight", "ship", "hotel"].includes(String(body.type))) {
      return NextResponse.json({ error: "Invalid type. Must be flight | ship | hotel" }, { status: 400 })
    }

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
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const mapped = {
      id: data.id,
      name: data.name,
      type: data.type as "flight" | "ship" | "hotel",
      destination: data.destination,
      date: data.date,
    }
    return NextResponse.json({ data: mapped }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}
