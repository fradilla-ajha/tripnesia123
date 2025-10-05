import type React from "react"
import { notFound } from "next/navigation"
import { destinations, hotels, activities } from "@/lib/data"
import { BookingWidget } from "@/components/booking-widget"

function Tabs({
  tabs,
  activeKey,
}: {
  tabs: { key: string; label: string; content: React.ReactNode }[]
  activeKey: string
}) {
  // Very small server-rendered tabs, using hash for state
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 border-b border-border">
        {tabs.map((t) => {
          const href = `#${t.key}`
          const isActive = activeKey === t.key
          return (
            <a
              key={t.key}
              href={href}
              className={`px-3 py-2 text-sm ${isActive ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            >
              {t.label}
            </a>
          )
        })}
      </div>
      <div className="pt-4">{tabs.find((t) => t.key === activeKey)?.content}</div>
    </div>
  )
}

export default function DestinationDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const dest = destinations.find((d) => d.slug === params.slug)
  if (!dest) return notFound()

  const destHotels = hotels.filter((h) => h.destinationSlug === dest.slug)
  const destActivities = activities.filter((a) => a.destinationSlug === dest.slug)

  const hash = typeof window === "undefined" ? "overview" : window.location.hash.replace("#", "") || "overview"

  const tabs = [
    {
      key: "overview",
      label: "Overview",
      content: (
        <div className="grid gap-3">
          <p>{dest.shortDescription}</p>
          <div>
            <h4 className="font-semibold">Highlights</h4>
            <ul className="list-disc pl-5">
              {dest.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
          <div className="text-sm text-muted-foreground">Best time to visit: {dest.bestTime}</div>
        </div>
      ),
    },
    {
      key: "things-to-do",
      label: "Things to Do",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {destActivities.map((a) => (
            <div key={a.id} className="rounded-lg border border-border p-3 bg-card">
              <img
                src={a.image || "/placeholder.svg"}
                alt={`Activity: ${a.title}`}
                className="h-40 w-full object-cover rounded-md"
              />
              <h5 className="mt-2 font-medium">{a.title}</h5>
              <p className="text-sm text-muted-foreground">{a.summary}</p>
              <div className="mt-1 text-sm">From ${a.price}</div>
            </div>
          ))}
          {destActivities.length === 0 && <p className="text-muted-foreground">No activities listed yet.</p>}
        </div>
      ),
    },
    {
      key: "hotels",
      label: "Hotels",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {destHotels.map((h) => (
            <div key={h.id} className="rounded-lg border border-border p-3 bg-card">
              <img
                src={h.image || "/placeholder.svg"}
                alt={`Hotel: ${h.name}`}
                className="h-40 w-full object-cover rounded-md"
              />
              <h5 className="mt-2 font-medium">{h.name}</h5>
              <p className="text-sm text-muted-foreground">{h.location}</p>
              <div className="text-sm">
                Rating: {h.rating.toFixed(1)} • ${h.pricePerNight}/night
              </div>
            </div>
          ))}
          {destHotels.length === 0 && <p className="text-muted-foreground">No hotels listed yet.</p>}
        </div>
      ),
    },
    {
      key: "transport",
      label: "Transport",
      content: (
        <div className="text-sm">
          <p>Common options include domestic flights, ships (Pelni/ferries), and local transport.</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Flight: search routes to nearby airports.</li>
            <li>Ship: check port schedules for inter-island travel.</li>
            <li>Local: rent a scooter, taxi, or shuttle depending on the area.</li>
          </ul>
        </div>
      ),
    },
    {
      key: "culture",
      label: "Culture",
      content: (
        <div className="text-sm">
          <ul className="list-disc pl-5">
            {dest.cultureTips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      ),
    },
  ]

  return (
    <main>
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={dest.heroImage || "/placeholder.svg"}
            alt={`Hero image for ${dest.name}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-bold">{dest.name}</h1>
          <p className="text-muted-foreground">{dest.location}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <Tabs tabs={tabs} activeKey={hash} />
        </div>
        <aside className="lg:sticky lg:top-6 h-max">
          <BookingWidget defaultDestination={dest.name} />
        </aside>
      </section>
    </main>
  )
}
