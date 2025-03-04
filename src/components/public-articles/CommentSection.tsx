"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { api, type Comment } from "@/lib/api-public"
import { CommentItem } from "./CommentItem"
import { CommentSidebar } from "./CommentSidebar"
import { ChevronDown, ChevronUp } from "lucide-react"
import {useAuth} from "@/components/auth/AuthContext";

interface CommentSectionProps {
  articleId: number
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [showAllComments, setShowAllComments] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, tokens } = useAuth()

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    const response = await api.getComments(articleId, tokens?.access_token)
    if (response.data) {
      setComments(response.data)
    }
  }

  const handleAddComment = async () => {
    if (!tokens?.access_token || !newComment.trim()) return

    const response = await api.addComment(articleId, newComment, tokens.access_token)
    if (response.data) {
      setComments([...comments, response.data])
      setNewComment("")
    }
  }

  const visibleComments = showAllComments ? comments : comments.slice(0, 2)
  const hasMoreComments = comments.length > 2

  const handleShowMore = () => {
    if (window.innerWidth >= 1024) {
      // lg breakpoint
      setSidebarOpen(true)
    } else {
      setShowAllComments(true)
    }
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
          {hasMoreComments && !showAllComments && (
              <Button variant="ghost" onClick={handleShowMore} className="text-sm">
                See all comments
              </Button>
          )}
        </div>

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
          {visibleComments.map((comment) => (
              <CommentItem
                  key={comment.id}
                  comment={comment}
                  onUpdate={fetchComments}
                  currentUser={user}
                  token={tokens?.access_token}
              />
          ))}

          {hasMoreComments && showAllComments && (
              <Button variant="ghost" onClick={() => setShowAllComments(false)} className="w-full text-sm">
                <ChevronUp className="mr-2 h-4 w-4" />
                Show less
              </Button>
          )}

          {hasMoreComments && !showAllComments && !sidebarOpen && (
              <Button variant="ghost" onClick={handleShowMore} className="w-full text-sm">
                <ChevronDown className="mr-2 h-4 w-4" />
                Show {comments.length - 2} more comments
              </Button>
          )}
        </div>

        <CommentSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            comments={comments}
            currentUser={user}
            token={tokens?.access_token}
            onUpdate={fetchComments}
        />
      </div>
  )
}

