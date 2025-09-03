import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, TrendingUp, Clock } from "lucide-react"

interface DashboardStatsProps {
  userId: string
}

export async function DashboardStats({ userId }: DashboardStatsProps) {
  const supabase = await createClient()

  // Get feedback statistics
  const { data: feedbackGiven } = await supabase.from("feedback").select("id").eq("evaluator_id", userId)

  const { data: feedbackReceived } = await supabase.from("feedback").select("id").eq("evaluated_id", userId)

  const { data: pendingFeedback } = await supabase
    .from("feedback")
    .select("id")
    .eq("evaluator_id", userId)
    .eq("status", "draft")

  const { data: teamMembers } = await supabase.from("team_members").select("id").eq("user_id", userId)

  const stats = [
    {
      title: "Feedbacks Dados",
      value: feedbackGiven?.length || 0,
      icon: MessageSquare,
      description: "Total de avaliações realizadas",
    },
    {
      title: "Feedbacks Recebidos",
      value: feedbackReceived?.length || 0,
      icon: TrendingUp,
      description: "Avaliações recebidas de colegas",
    },
    {
      title: "Equipes",
      value: teamMembers?.length || 0,
      icon: Users,
      description: "Equipes que você participa",
    },
    {
      title: "Pendentes",
      value: pendingFeedback?.length || 0,
      icon: Clock,
      description: "Feedbacks em rascunho",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
