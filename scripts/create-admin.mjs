// Run from v0 scripts UI. Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY available.
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.log("[v0] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env.")
  process.exit(1)
}

const ADMIN_EMAIL = "alfakiddrock7@gmail.com"
const ADMIN_PASSWORD = "maba23ft"

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE)

  console.log("[v0] Creating admin user if not exists...")
  const { data: lookup } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 })
  const existing = lookup?.users?.find((u) => u.email === ADMIN_EMAIL)

  const userRes = existing
    ? { data: { user: existing }, error: null }
    : await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
      })

  if (userRes.error) {
    console.log("[v0] Error creating admin:", userRes.error.message)
    process.exit(1)
  }

  const user = userRes.data.user
  console.log("[v0] Admin user id:", user.id)

  // Upsert profile row and set is_admin = true
  const { error: upsertErr } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: ADMIN_EMAIL,
      is_admin: true,
      full_name: "Administrator",
    },
    { onConflict: "id" }
  )

  if (upsertErr) {
    console.log("[v0] Error upserting profile:", upsertErr.message)
    process.exit(1)
  }

  console.log("[v0] Admin profile ensured. Done.")
}

main().catch((e) => {
  console.log("[v0] Fatal:", e?.message || e)
  process.exit(1)
})
