"use client"

import Link from "next/link"
import { useCallback } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type User = { id: string; email?: string | null }
type Profile = { full_name?: string | null; is_admin?: boolean | null; avatar_url?: string | null }

export default function UserMenu({ user, profile }: { user?: User; profile?: Profile }) {
  const supabase = getSupabaseBrowserClient()

  const onSignOut = useCallback(async () => {
    await supabase.auth.signOut()
    // Refresh the page to reflect logged-out state
    window.location.assign("/")
  }, [supabase])

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/login">
          <Button variant="ghost" size="sm">
            Masuk
          </Button>
        </Link>
        <Link href="/auth/sign-up">
          <Button size="sm">Daftar</Button>
        </Link>
      </div>
    )
  }

  const name = profile?.full_name || user.email || "User"
  const initial = (name || "?").slice(0, 1).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={profile?.avatar_url || undefined} alt={name} />
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/account">
          <DropdownMenuItem className="cursor-pointer">Akun Saya</DropdownMenuItem>
        </Link>
        {profile?.is_admin ? (
          <Link href="/admin">
            <DropdownMenuItem className="cursor-pointer">Admin</DropdownMenuItem>
          </Link>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-destructive" onClick={onSignOut}>
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
