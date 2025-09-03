"use client"

import { Suspense } from "react"
import { DashboardHeader } from "./dashboard-header"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardHeaderWrapperProps {
  user: {
    full_name: string
    email: string
    role: string
    department?: string
    position?: string
    avatar_url?: string
  }
}

export function DashboardHeaderWrapper({ user }: DashboardHeaderWrapperProps) {
  return (
    <Suspense fallback={<DashboardHeaderSkeleton />}>
      <DashboardHeader user={user} />
    </Suspense>
  )
}

function DashboardHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  )
}
