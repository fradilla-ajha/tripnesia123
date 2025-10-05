"use client"

import { useState, type FormEvent } from "react"

export default function AdminDestinationForm() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [location, setLocation] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [price, setPrice] = useState<number | "">("")
  const [rating, setRating] = useState<number | "">("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function autoSlug(val: string) {
    return val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const res = await fetch("/api/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug: slug || autoSlug(name),
        location: location || null,
        image_url: imageUrl || null,
        price: price === "" ? null : Number(price),
        rating: rating === "" ? null : Number(rating),
      }),
    })

    setLoading(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data?.error || "Gagal menambahkan destinasi")
      return
    }

    setMessage("Destinasi berhasil ditambahkan")
    setName("")
    setSlug("")
    setLocation("")
    setImageUrl("")
    setPrice("")
    setRating("")
    // simple refresh to show new data
    window.location.reload()
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border bg-card p-4 grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="text-sm">Nama</span>
          <input
            className="h-10 rounded-md border bg-background px-3 focus-visible:ring-2 focus-visible:ring-primary outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Bali Swing Ubud"
            required
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Slug</span>
          <input
            className="h-10 rounded-md border bg-background px-3 focus-visible:ring-2 focus-visible:ring-primary outline-none"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="bali-swing-ubud"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Lokasi</span>
          <input
            className="h-10 rounded-md border bg-background px-3 focus-visible:ring-2 focus-visible:ring-primary outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ubud, Bali"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">URL Gambar</span>
          <input
            className="h-10 rounded-md border bg-background px-3 focus-visible:ring-2 focus-visible:ring-primary outline-none"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Harga (IDR)</span>
          <input
            type="number"
            className="h-10 rounded-md border bg-background px-3 focus-visible:ring-2 focus-visible:ring-primary outline-none"
            value={price === "" ? "" : Number(price)}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="250000"
            min={0}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Rating (0-5)</span>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className="h-10 rounded-md border bg-background px-3 focus-visible:ring-2 focus-visible:ring-primary outline-none"
            value={rating === "" ? "" : Number(rating)}
            onChange={(e) => setRating(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="4.8"
          />
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}

      <div className="flex justify-end">
        <button
          disabled={loading}
          className="h-10 rounded-md bg-primary px-4 text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Tambah Destinasi"}
        </button>
      </div>
    </form>
  )
}
