'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, ChevronRight, LayoutDashboard, LineChart, ListTodo } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { User } from '@supabase/supabase-js'
import { UserProfileMenu } from '@/components/auth/user-profile-menu'
import { Logo } from "../logo"

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Tasks",
    icon: ListTodo,
    href: "/tasks",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "Stats",
    icon: LineChart,
    href: "/stats",
  },
]

interface SidebarProps {
  user: User
}

export function Sidebar({ user }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-background",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex h-[52px] items-center justify-between px-4 py-2">
        <h2 className={cn("text-lg font-semibold", isCollapsed && "hidden")}>
          <Logo textClassName={cn(isCollapsed && "hidden")} />
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2 py-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href && "bg-accent",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <UserProfileMenu user={user} isCollapsed={isCollapsed} />
      </div>
    </div>
  )
} 