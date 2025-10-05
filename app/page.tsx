import Link from "next/link"
import SearchBar from "@/components/search-bar"
import { destinations } from "@/lib/data"
import { DestinationCard } from "@/components/destination-card"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footer"

export default function HomePage() {
  const recommended = destinations.slice(0, 3)

  return (
    <main>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src="/map-of-indonesia-aerial.jpg" alt="" className="h-full w-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-background/75" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-balance text-4xl md:text-6xl font-bold leading-tight">
              Tripnesia — Remember Your Indonesian Journey
            </h1>
            <p className="mt-4 max-w-prose text-pretty text-muted-foreground">
              Book flights, ships, and hotels with an integrated encyclopedia of Indonesian destinations.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-card/90 p-3 md:p-4 shadow-sm focus-surface">
            <SearchBar />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Button asChild>
              <Link href="/destinations">Explore Encyclopedia</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="#book-now">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recommended Destinations */}
      <section className="mx-auto max-w-6xl px-4 py-12" id="book-now">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recommended Destinations</h2>
          <Link className="text-primary underline-offset-4 hover:underline" href="/destinations">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((d) => (
            <DestinationCard key={d.id} dest={d} />
          ))}
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
  )
}
