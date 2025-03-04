"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CommentItem } from "./CommentItem"
import type { Comment } from "@/lib/api-public"

interface CommentSidebarProps {
  isOpen: boolean
  onClose: () => void
  comments: Comment[]
  currentUser: any
  token?: string
  onUpdate: () => void
}

export function CommentSidebar({ isOpen, onClose, comments, currentUser, token, onUpdate }: CommentSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>All Comments ({comments.length})</SheetTitle>
        </SheetHeader>
        <div className="mt-6 p-2 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onUpdate={onUpdate}
              currentUser={currentUser}
              token={token}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

