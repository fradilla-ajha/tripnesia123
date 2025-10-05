import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("destinations").select("*").eq("slug", params.slug).maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
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

  return NextResponse.json({ data: mapped })
}
