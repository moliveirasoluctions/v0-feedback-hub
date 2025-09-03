import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MessageSquare, Users } from "lucide-react"

interface PendingActionsProps {
  userId: string
}

export async function PendingActions({ userId }: PendingActionsProps) {
  const supabase = await createClient()

  // Get pending feedback to complete
  const { data: pendingFeedback } = await supabase
    .from("feedback")
    .select("id, type, evaluated:profiles!feedback_evaluated_id_fkey(full_name)")
    .eq("evaluator_id", userId)
    .eq("status", "draft")
    .limit(3)

  // Get unread notifications
  const { data: notifications } = await supabase
    .from("notifications")
    .select("id, title, type")
    .eq("user_id", userId)
    .eq("is_read", false)
    .limit(3)

  const actions = [
    ...(pendingFeedback?.map((feedback) => ({
      id: feedback.id,
      type: "feedback",
      title: "Completar Feedback",
      description: `Avaliação de ${feedback.evaluated?.full_name}`,
      icon: MessageSquare,
    })) || []),
    ...(notifications?.map((notification) => ({
      id: notification.id,
      type: "notification",
      title: notification.title,
      description: "Nova notificação",
      icon: Clock,
    })) || []),
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Pendentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.length > 0 ? (
          actions.slice(0, 5).map((action) => (
            <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <action.icon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Ver
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Nenhuma ação pendente</p>
            <p className="text-xs text-muted-foreground mt-1">Você está em dia com suas tarefas!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
