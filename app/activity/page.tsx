import { activities } from "@/lib/data"
import { ActivityCard } from "@/components/activity-card"

export default function DestinationsIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Indonesian Destinations</h1>
      <p className="text-muted-foreground mt-2">Guides with cultural tips, best time to visit, and highlights.</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((d) => (
          <ActivityCard key={d.id} activity={d} />
        ))}
      </div>
    </main>
  )
}
