"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchBar({
  initialQuery = "",
}: {
  initialQuery?: string
}) {
  const router = useRouter()
  const params = useSearchParams()
  const [query, setQuery] = useState(initialQuery || params.get("q") || "")
  const [type, setType] = useState(params.get("type") || "destinations")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const sp = new URLSearchParams()
    if (query) sp.set("q", query)
    if (type) sp.set("type", type)
    router.push(`/search?${sp.toString()}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-lg bg-card p-3 md:p-4 shadow-sm border border-border focus-surface"
      aria-label="Search"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Search type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="destinations">Destinations</SelectItem>
            <SelectItem value="hotels">Hotels</SelectItem>
            <SelectItem value="flights">Flights</SelectItem>
            <SelectItem value="ships">Ships</SelectItem>
          </SelectContent>
        </Select>

        <Input
          aria-label="Search query"
          placeholder="Search Bali, hotels, flights..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />

        <Button type="submit" className="shrink-0">
          Search
        </Button>
      </div>
    </form>
  )
}
