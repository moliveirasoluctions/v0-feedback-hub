"use client"

import { Suspense } from "react"
import { EditUserDialog } from "./edit-user-dialog"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"

interface User {
  id: string
  email: string
  full_name: string
  role: string
  department?: string
  position?: string
  is_active: boolean
}

interface EditUserDialogWrapperProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
  currentUserRole: string
}

export function EditUserDialogWrapper({ user, open, onOpenChange, currentUserRole }: EditUserDialogWrapperProps) {
  return (
    <Suspense fallback={<EditUserDialogSkeleton open={open} onOpenChange={onOpenChange} />}>
      <EditUserDialog user={user} open={open} onOpenChange={onOpenChange} currentUserRole={currentUserRole} />
    </Suspense>
  )
}

function EditUserDialogSkeleton({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-4 p-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
