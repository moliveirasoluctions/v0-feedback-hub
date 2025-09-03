import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Building2 } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">FeedbackHub</h1>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Verifique seu email</CardTitle>
            <CardDescription>Enviamos um link de confirmação para seu email</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Clique no link enviado para seu email para ativar sua conta e acessar o FeedbackHub.
            </p>
            <p className="text-sm text-muted-foreground">Não recebeu o email? Verifique sua caixa de spam.</p>
            <Button asChild className="w-full">
              <Link href="/auth/login">Voltar ao Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
