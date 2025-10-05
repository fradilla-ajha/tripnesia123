"use client"

import type React from "react"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { fetcher } from "@/lib/swr"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton" // add skeletons for better loading state

type ResultItem = { type: "hotel"; item: any } | { type: "activity"; item: any } | { type: "article"; item: any }

export default function SearchPage() {
  const sp = useSearchParams()
  const router = useRouter()
  const initialQ = sp.get("q") || ""
  const [q, setQ] = useState(initialQ)
  const [budget, setBudget] = useState<string>("")
  const [rating, setRating] = useState<string>("")
  const [location, setLocation] = useState<string>("")

  const apiUrl = useMemo(() => {
    const p = new URLSearchParams()
    if (q) p.set("q", q)
    if (budget) p.set("budget", budget)
    if (rating) p.set("rating", rating)
    if (location) p.set("location", location)
    return `/api/search?${p.toString()}`
  }, [q, budget, rating, location])

  const { data, isLoading, error } = useSWR<{ data: ResultItem[] }>(apiUrl, fetcher)

  function applyFilters(e: React.FormEvent) {
    e.preventDefault()
    const newParams = new URLSearchParams()
    if (q) newParams.set("q", q)
    if (budget) newParams.set("budget", budget)
    if (rating) newParams.set("rating", rating)
    if (location) newParams.set("location", location)
    router.replace(`/search?${newParams.toString()}`)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Filters */}
      <aside className="h-max rounded-lg border border-border p-4 bg-card shadow-sm">
        <h2 className="text-lg font-semibold">Filters</h2>
        <form className="mt-3 grid gap-3" onSubmit={applyFilters}>
          <div>
            <Label htmlFor="q">Search</Label>
            <Input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Bali, hotel..." />
          </div>
          <div>
            <Label htmlFor="budget">Max Budget ($)</Label>
            <Input id="budget" type="number" min={0} value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="rating">Min Rating</Label>
            <Input
              id="rating"
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Ubud"
            />
          </div>
          <Button type="submit" className="mt-1">
            Apply
          </Button>
        </form>
      </aside>

      {/* Results */}
      <section>
        <h1 className="text-2xl font-semibold">Search Results</h1>
        <p className="text-sm text-muted-foreground mt-1">Combined results from hotels, articles, and activities.</p>

        <div className="mt-4">
          {isLoading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border p-3 bg-card">
                  <Skeleton className="h-40 w-full rounded-md" />
                  <Skeleton className="mt-3 h-4 w-3/5" />
                  <Skeleton className="mt-2 h-4 w-2/5" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}
          {error && <p className="text-destructive">Failed to load results</p>}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.data?.map((r, idx) => {
              if (r.type === "hotel") {
                const h = r.item
                return (
                  <div key={idx} className="rounded-lg border border-border p-3 bg-card card-hover">
                    <img
                      src={h.image || "/placeholder.svg"}
                      alt={`Hotel: ${h.name}`}
                      className="h-40 w-full object-cover rounded-md"
                    />
                    <h3 className="mt-2 font-medium">{h.name}</h3>
                    <p className="text-sm text-muted-foreground">{h.location}</p>
                    <p className="text-sm">
                      Rating {h.rating} • ${h.pricePerNight}/night
                    </p>
                  </div>
                )
              }
              if (r.type === "activity") {
                const a = r.item
                return (
                  <div key={idx} className="rounded-lg border border-border p-3 bg-card card-hover">
                    <img
                      src={a.image || "/placeholder.svg"}
                      alt={`Activity: ${a.title}`}
                      className="h-40 w-full object-cover rounded-md"
                    />
                    <h3 className="mt-2 font-medium">{a.title}</h3>
                    <p className="text-sm text-muted-foreground">{a.summary}</p>
                    <p className="text-sm">From ${a.price}</p>
                  </div>
                )
              }
              // article = destination
              const d = r.item
              return (
                <div key={idx} className="rounded-lg border border-border p-3 bg-card card-hover">
                  <img
                    src={d.heroImage || "/placeholder.svg"}
                    alt={`Guide: ${d.name}`}
                    className="h-40 w-full object-cover rounded-md"
                  />
                  <h3 className="mt-2 font-medium">{d.name}</h3>
                  <p className="text-sm text-muted-foreground">{d.location}</p>
                  <p className="text-sm line-clamp-2">{d.shortDescription}</p>
                </div>
              )
            })}
          </div>
          {!isLoading && data?.data?.length === 0 && (
            <p className="text-muted-foreground">No results found. Try adjusting your filters.</p>
          )}
        </div>
      </section>
    </main>
  )
}
