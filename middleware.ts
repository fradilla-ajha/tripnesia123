import type { NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  // keep session fresh for all routes
  const response = await updateSession(request)

  // Gate /admin path - allow hitting the route, server component will enforce role
  // You can also hard-block here if needed.
  return response
}

// Optionally narrow matcher if desired
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
