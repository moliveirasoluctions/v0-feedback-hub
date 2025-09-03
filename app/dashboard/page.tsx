import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeaderWrapper } from "@/components/dashboard/dashboard-header-wrapper"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentFeedback } from "@/components/dashboard/recent-feedback"
import { PendingActions } from "@/components/dashboard/pending-actions"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <DashboardHeaderWrapper user={profile} />
      <DashboardStats userId={user.id} />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentFeedback userId={user.id} />
        <PendingActions userId={user.id} />
      </div>
    </div>
  )
}
