'use client'

import { createClient } from '@/utils/supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { ChevronDown } from 'lucide-react'

interface UserProfileMenuProps {
  user: User
  isCollapsed?: boolean
}

export function UserProfileMenu({ user, isCollapsed = false }: UserProfileMenuProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const initials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user.email?.[0].toUpperCase() ?? '?'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-3 outline-none">
        <Avatar>
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <>
            <div className="flex flex-1 flex-col text-left">
              <span className="text-sm font-medium">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </span>
              {user.user_metadata?.full_name && (
                <span className="text-xs text-muted-foreground">{user.email}</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top" sideOffset={12} alignOffset={-8} className="w-56">
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 