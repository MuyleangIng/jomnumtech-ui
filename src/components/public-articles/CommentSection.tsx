"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { api, type Comment } from "@/lib/api-public"

interface CommentSectionProps {
  articleId: number
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const { user, tokens } = useAuth()

  useEffect(() => {
    fetchComments()
  }, []) // Removed articleId from dependencies

  const fetchComments = async () => {
    const response = await api.getComments(articleId, tokens?.access)
    if (response.data) {
      setComments(response.data)
    }
  }

  const handleAddComment = async () => {
    if (!tokens?.access || !newComment.trim()) return

    const response = await api.addComment(articleId, newComment, tokens.access)
    if (response.data) {
      setComments([...comments, response.data])
      setNewComment("")
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments</h2>

      {user ? (
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleAddComment}>Post Comment</Button>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">Please log in to comment.</p>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onUpdate={fetchComments}
            currentUser={user}
            token={tokens?.access}
          />
        ))}
      </div>
    </div>
  )
}

interface CommentItemProps {
  comment: Comment
  onUpdate: () => void
  currentUser: any
  token?: string
  level?: number
}

function CommentItem({ comment, onUpdate, currentUser, token, level = 0 }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState("")
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

  return (
    <div className="group">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`/placeholder.svg?text=${comment.author[0]}`} alt={comment.author} />
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
        <div className="ml-12 mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onUpdate={onUpdate}
              currentUser={currentUser}
              token={token}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

