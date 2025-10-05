"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function BookingWidget({
  defaultDestination = "",
}: {
  defaultDestination?: string
}) {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [type, setType] = useState<"flight" | "ship" | "hotel">("hotel")
  const [destination, setDestination] = useState(defaultDestination)
  const [date, setDate] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, destination, date }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Failed to create booking")
      toast({ title: "Booking created", description: `#${json.data.id} for ${json.data.destination}` })
      setName("")
      setDate("")
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" })
    }
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-border p-4 bg-card shadow-sm">
      <h3 className="text-lg font-semibold">Book your trip</h3>
      <p className="text-sm text-muted-foreground mb-3">Quick booking widget</p>

      <div className="grid gap-3">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
        </div>

        <div>
          <Label>Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flight">Flight</SelectItem>
              <SelectItem value="ship">Ship</SelectItem>
              <SelectItem value="hotel">Hotel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dest">Destination</Label>
          <Input
            id="dest"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Bali"
            required
          />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <Button type="submit" className="w-full">
          Book now
        </Button>
      </div>
    </form>
  )
}
