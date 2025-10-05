import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").trim()
  const maxBudget = Number(searchParams.get("budget") || "0")
  const minRating = Number(searchParams.get("rating") || "0")
  const location = (searchParams.get("location") || "").trim()

  const supabase = getSupabaseServerClient()
  const like = (v: string) => `%${v}%`

  // Hotels
  let hotelQuery = supabase.from("hotels").select("*")
  if (q) hotelQuery = hotelQuery.or(`name.ilike.${like(q)},location.ilike.${like(q)}`)
  if (maxBudget > 0) hotelQuery = hotelQuery.lte("price_per_night", maxBudget)
  if (minRating > 0) hotelQuery = hotelQuery.gte("rating", minRating)
  if (location) hotelQuery = hotelQuery.ilike("location", like(location))

  // Activities
  let activityQuery = supabase.from("activities").select("*")
  if (q) activityQuery = activityQuery.or(`title.ilike.${like(q)},summary.ilike.${like(q)}`)
  if (maxBudget > 0) activityQuery = activityQuery.lte("price", maxBudget)

  // Destinations (as articles)
  let destinationQuery = supabase.from("destinations").select("*")
  if (q)
    destinationQuery = destinationQuery.or(
      `name.ilike.${like(q)},location.ilike.${like(q)},short_description.ilike.${like(q)}`,
    )
  if (location) destinationQuery = destinationQuery.ilike("location", like(location))

  const [hotelsRes, activitiesRes, destinationsRes] = await Promise.all([hotelQuery, activityQuery, destinationQuery])

  if (hotelsRes.error) return NextResponse.json({ error: hotelsRes.error.message }, { status: 500 })
  if (activitiesRes.error) return NextResponse.json({ error: activitiesRes.error.message }, { status: 500 })
  if (destinationsRes.error) return NextResponse.json({ error: destinationsRes.error.message }, { status: 500 })

  const hotelResults =
    (hotelsRes.data || []).map((h) => ({
      type: "hotel",
      item: {
        id: h.id,
        name: h.name,
        destinationSlug: h.destination_slug,
        location: h.location,
        rating: Number(h.rating),
        pricePerNight: Number(h.price_per_night),
        image: h.image,
      },
    })) ?? []

  const activityResults =
    (activitiesRes.data || []).map((a) => ({
      type: "activity",
      item: {
        id: a.id,
        title: a.title,
        destinationSlug: a.destination_slug,
        summary: a.summary,
        price: Number(a.price),
        image: a.image,
      },
    })) ?? []

  const articleResults =
    (destinationsRes.data || []).map((d) => ({
      type: "article",
      item: {
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
      },
    })) ?? []

  return NextResponse.json({
    data: [...hotelResults, ...articleResults, ...activityResults],
  })
}
