"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export default function SignUpPage() {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const redirectTo =
    process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
    `${typeof window !== "undefined" ? window.location.origin : ""}/admin`

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectTo },
    })

    if (authError) {
      setLoading(false)
      setError(authError.message)
      return
    }

    // optional: create a profile row (will succeed if policy allows insert by owner)
    if (authData.user) {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName }),
      }).catch(() => {})
    }

    setLoading(false)
    router.replace("/admin")
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-1 text-balance">Daftar</h1>
        <p className="text-sm text-muted-foreground mb-6">Buat akun untuk mengelola Tripnesia.</p>

        <form onSubmit={onSubmit} className="grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm">Nama Lengkap</span>
            <input
              type="text"
              className="h-10 rounded-md border bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <input
              type="email"
              className="h-10 rounded-md border bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Kata Sandi</span>
            <input
              type="password"
              className="h-10 rounded-md border bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </label>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="h-10 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="h-10 rounded-md border hover:bg-accent transition-colors"
          >
            Sudah punya akun? Masuk
          </button>
        </form>
      </div>
    </main>
  )
}
