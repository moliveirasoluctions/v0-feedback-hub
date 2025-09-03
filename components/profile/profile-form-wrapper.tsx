"use client"

import { Suspense } from "react"
import { ProfileForm } from "./profile-form"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ProfileFormWrapperProps {
  user: {
    id: string
    full_name: string
    email: string
    department?: string
    position?: string
    role: string
  }
}

export function ProfileFormWrapper({ user }: ProfileFormWrapperProps) {
  return (
    <Suspense fallback={<ProfileFormSkeleton />}>
      <ProfileForm user={user} />
    </Suspense>
  )
}

function ProfileFormSkeleton() {
  return (
    <div className="grid gap-6 max-w-2xl">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
    </div>
  )
}
