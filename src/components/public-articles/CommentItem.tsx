"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { api } from "@/lib/api-public"

interface CommentItemProps {
  comment: Comment
  onUpdate: () => void
  currentUser: any
  token?: string
  level?: number
}

interface Comment {
  id: number
  content: string
  author: string
  created_at: string
  profile_image: string
  replies: Comment[]
}

export function CommentItem({ comment, onUpdate, currentUser, token, level = 0 }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [showAllReplies, setShowAllReplies] = useState(false)
  const isAuthor = currentUser?.username === comment.author
  const canReply = level < 1 // Only allow replies for top-level comments

  const handleEdit = async () => {
    if (!token) return

    const response = await api.updateComment(comment.id, editContent, token)
    if (response.data) {
      setIsEditing(false)
      onUpdate()
    }
  }

  const handleDelete = async () => {
    if (!token) return

    const response = await api.deleteComment(comment.id, token)
    if (!response.error) {
      onUpdate()
    }
  }

  const handleReply = async () => {
    if (!token || !replyContent.trim()) return

    const response = await api.replyToComment(comment.id, replyContent, token)
    if (response.data) {
      setShowReplyInput(false)
      setReplyContent("")
      onUpdate()
    }
  }

  const visibleReplies = showAllReplies ? comment.replies : comment.replies.slice(0, 2)

  return (
    <div className="group">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.profile_image} alt={comment.author} />
          <AvatarFallback>{comment.author[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{comment.author}</span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </span>
            </div>

            {isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleEdit}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p>{comment.content}</p>
              {canReply && currentUser && (
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground"
                  onClick={() => setShowReplyInput(!showReplyInput)}
                >
                  Reply
                </Button>
              )}
            </>
          )}

          {showReplyInput && (
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={handleReply}>Post Reply</Button>
                <Button variant="outline" onClick={() => setShowReplyInput(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12 mt-4 space-y-4 max-h-[300px] overflow-y-auto">
          {visibleReplies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onUpdate={onUpdate}
              currentUser={currentUser}
              token={token}
              level={level + 1}
            />
          ))}
          {comment.replies.length > 2 && !showAllReplies && (
            <Button variant="link" className="text-sm text-muted-foreground" onClick={() => setShowAllReplies(true)}>
              See {comment.replies.length - 2} more {comment.replies.length - 2 === 1 ? "reply" : "replies"}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

