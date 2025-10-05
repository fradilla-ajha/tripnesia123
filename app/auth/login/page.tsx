"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle()
      if (profile?.is_admin) {
        router.replace("/admin")
      } else {
        router.replace("/account")
      }
    } else {
      router.replace("/account")
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-1 text-balance">Masuk</h1>
        <p className="text-sm text-muted-foreground mb-6">Gunakan email dan kata sandi Anda untuk masuk.</p>

        <form onSubmit={onSubmit} className="grid gap-4">
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
              autoComplete="current-password"
            />
          </label>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="h-10 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/auth/sign-up")}
            className="h-10 rounded-md border hover:bg-accent transition-colors"
          >
            Buat akun baru
          </button>
        </form>
      </div>
    </main>
  )
}
