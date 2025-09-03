import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UsersTable } from "@/components/users/users-table"
import { UsersHeader } from "@/components/users/users-header"

export default async function UsersPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || !["manager", "administrator"].includes(profile.role)) {
    redirect("/dashboard")
  }

  // Get all users
  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  return (
    <div className="flex-1 space-y-6 p-6">
      <UsersHeader />
      <UsersTable users={users || []} currentUserRole={profile.role} />
    </div>
  )
}
