import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface RecentFeedbackProps {
  userId: string
}

export async function RecentFeedback({ userId }: RecentFeedbackProps) {
  const supabase = await createClient()

  const { data: recentFeedback } = await supabase
    .from("feedback")
    .select(`
      id,
      type,
      status,
      created_at,
      evaluator:profiles!feedback_evaluator_id_fkey(full_name),
      evaluated:profiles!feedback_evaluated_id_fkey(full_name)
    `)
    .or(`evaluator_id.eq.${userId},evaluated_id.eq.${userId}`)
    .order("created_at", { ascending: false })
    .limit(5)

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "secondary",
      submitted: "default",
      reviewed: "outline",
      completed: "default",
    }
    return colors[status as keyof typeof colors] || "secondary"
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      draft: "Rascunho",
      submitted: "Enviado",
      reviewed: "Revisado",
      completed: "Concluído",
    }
    return labels[status as keyof typeof labels] || status
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      self: "Autoavaliação",
      peer: "Avaliação de Pares",
      manager: "Avaliação Gerencial",
      "360": "Avaliação 360°",
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedbacks Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentFeedback && recentFeedback.length > 0 ? (
          recentFeedback.map((feedback) => (
            <div key={feedback.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">{getTypeLabel(feedback.type)}</p>
                <p className="text-xs text-muted-foreground">
                  {feedback.evaluator?.full_name} → {feedback.evaluated?.full_name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(feedback.created_at), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </p>
              </div>
              <Badge variant={getStatusColor(feedback.status) as any}>{getStatusLabel(feedback.status)}</Badge>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">Nenhum feedback encontrado</p>
        )}
      </CardContent>
    </Card>
  )
}
