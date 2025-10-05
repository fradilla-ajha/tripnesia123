import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import HeaderNavbar from "@/components/HeaderNavbar"


export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: {
    full_name?: string | null
    is_admin?: boolean | null
    avatar_url?: string | null
  } | null = null

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, is_admin, avatar_url")
      .eq("id", user.id)
      .maybeSingle()
    profile = data
  }

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>
          <HeaderNavbar/>

          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
