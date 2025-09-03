"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2, Users, MessageSquare, BarChart3, Settings, Home, UserCog } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  userRole: string
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      roles: ["user", "manager", "administrator"],
    },
    {
      name: "Meu Perfil",
      href: "/profile",
      icon: UserCog,
      roles: ["user", "manager", "administrator"],
    },
    {
      name: "Usuários",
      href: "/users",
      icon: Users,
      roles: ["manager", "administrator"],
    },
    {
      name: "Equipes",
      href: "/teams",
      icon: Users,
      roles: ["manager", "administrator"],
    },
    {
      name: "Feedbacks",
      href: "/feedback",
      icon: MessageSquare,
      roles: ["user", "manager", "administrator"],
    },
    {
      name: "Relatórios",
      href: "/reports",
      icon: BarChart3,
      roles: ["manager", "administrator"],
    },
    {
      name: "Configurações",
      href: "/settings",
      icon: Settings,
      roles: ["administrator"],
    },
  ]

  const filteredNavigation = navigation.filter((item) => item.roles.includes(userRole))

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
        <Building2 className="h-6 w-6 text-sidebar-primary" />
        <span className="text-lg font-semibold text-sidebar-foreground">FeedbackHub</span>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {filteredNavigation.map((item) => (
            <Button
              key={item.name}
              asChild
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
