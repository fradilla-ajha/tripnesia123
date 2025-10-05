import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

// ---------------- GET ----------------
export async function GET() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("destinations").select("*").order("id", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const mapped = (data || []).map((d) => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    location: d.location,
    shortDescription: d.short_description,
    heroImage: d.hero_image,
    highlights: d.highlights || [],
    cultureTips: d.culture_tips || [],
    bestTime: d.best_time,
    estimatedPrice: Number(d.estimated_price),
  }))

  return NextResponse.json({ data: mapped })
}

// ---------------- POST ----------------
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const required = ["slug", "name", "location", "shortDescription"] as const
    for (const k of required) {
      if (!(body as any)[k]) {
        return NextResponse.json({ error: `Missing required field: ${k}` }, { status: 400 })
      }
    }

    const supabase = getSupabaseServerClient()

    // check existing slug
    const { data: exists, error: existsErr } = await supabase
      .from("destinations")
      .select("slug")
      .eq("slug", String(body.slug))
      .maybeSingle()
    if (existsErr) {
      return NextResponse.json({ error: existsErr.message }, { status: 500 })
    }
    if (exists) {
      return NextResponse.json({ error: "Destination with this slug already exists" }, { status: 409 })
    }

    const { data, error } = await supabase
      .from("destinations")
      .insert([
        {
          slug: String(body.slug),
          name: String(body.name),
          location: String(body.location),
          short_description: String(body.shortDescription),
          hero_image: body.heroImage || "/indonesia-landscape.jpg",
          highlights: body.highlights || [],
          culture_tips: body.cultureTips || [],
          best_time: body.bestTime || "All year",
          estimated_price: body.estimatedPrice ?? 200,
        },
      ])
      .select("*")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const mapped = {
      id: data.id,
      slug: data.slug,
      name: data.name,
      location: data.location,
      shortDescription: data.short_description,
      heroImage: data.hero_image,
      highlights: data.highlights || [],
      cultureTips: data.culture_tips || [],
      bestTime: data.best_time,
      estimatedPrice: Number(data.estimated_price),
    }

    return NextResponse.json({ data: mapped }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

// ---------------- PUT ----------------
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    if (!body.id && !body.slug) {
      return NextResponse.json({ error: "Missing required identifier: id or slug" }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()
    const query = supabase.from("destinations").update({
      slug: body.slug,
      name: body.name,
      location: body.location,
      short_description: body.shortDescription,
      hero_image: body.heroImage,
      highlights: body.highlights,
      culture_tips: body.cultureTips,
      best_time: body.bestTime,
      estimated_price: body.estimatedPrice,
    })

    if (body.id) query.eq("id", body.id)
    if (body.slug) query.eq("slug", body.slug)

    const { data, error } = await query.select("*").single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

// ---------------- DELETE ----------------
export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    if (!body.id && !body.slug) {
      return NextResponse.json({ error: "Missing required identifier: id or slug" }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()
    const query = supabase.from("destinations").delete()

    if (body.id) query.eq("id", body.id)
    if (body.slug) query.eq("slug", body.slug)

    const { error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Destination deleted successfully" }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}
