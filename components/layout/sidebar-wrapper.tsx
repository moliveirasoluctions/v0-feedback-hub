"use client"

import { Suspense } from "react"
import { Sidebar } from "./sidebar"
import { Skeleton } from "@/components/ui/skeleton"

interface SidebarWrapperProps {
  userRole: string
}

function SidebarSkeleton() {
  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="flex-1 px-3 py-4 space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  )
}

export function SidebarWrapper({ userRole }: SidebarWrapperProps) {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <Sidebar userRole={userRole} />
    </Suspense>
  )
}
