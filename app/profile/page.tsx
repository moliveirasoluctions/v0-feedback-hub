import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileFormWrapper } from "@/components/profile/profile-form-wrapper"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <ProfileHeader user={profile} />
      <ProfileFormWrapper user={profile} />
    </div>
  )
}
