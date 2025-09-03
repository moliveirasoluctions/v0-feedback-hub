import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ProfileHeaderProps {
  user: {
    full_name: string
    email: string
    role: string
    department?: string
    position?: string
    avatar_url?: string
  }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleLabel = (role: string) => {
    const roles = {
      administrator: "Administrador",
      manager: "Gestor",
      user: "Usuário",
    }
    return roles[role as keyof typeof roles] || role
  }

  const getRoleColor = (role: string) => {
    const colors = {
      administrator: "destructive",
      manager: "default",
      user: "secondary",
    }
    return colors[role as keyof typeof colors] || "secondary"
  }

  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.full_name} />
        <AvatarFallback className="text-lg">{getInitials(user.full_name)}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{user.full_name}</h1>
        <p className="text-muted-foreground">{user.email}</p>
        <div className="flex items-center gap-4">
          <Badge variant={getRoleColor(user.role) as any}>{getRoleLabel(user.role)}</Badge>
          {user.position && user.department && (
            <span className="text-sm text-muted-foreground">
              {user.position} - {user.department}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
