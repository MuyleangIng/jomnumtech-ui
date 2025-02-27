"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Reply } from "lucide-react"

interface Comment {
  id: number
  author: {
    name: string
    username: string
    image: string
    initials: string
  }
  content: string
  publishedAt: string
  likes: number
  replies: number
}

export function ArticleComments() {
  const [commentText, setCommentText] = useState("")

  // In a real app, you would fetch comments based on the article ID
  const comments: Comment[] = [
    {
      id: 1,
      author: {
        name: "Emily Chen",
        username: "emilychen",
        image: "/placeholder.svg?height=40&width=40",
        initials: "EC",
      },
      content:
        "This is such a comprehensive guide! I especially appreciate the section on database optimization as it's often overlooked in scaling discussions.",
      publishedAt: "2 days ago",
      likes: 15,
      replies: 2,
    },
    {
      id: 2,
      author: {
        name: "James Wilson",
        username: "jameswilson",
        image: "/placeholder.svg?height=40&width=40",
        initials: "JW",
      },
      content:
        "Great article! I've been implementing some of these principles in my current project and they've made a huge difference in performance.",
      publishedAt: "3 days ago",
      likes: 8,
      replies: 1,
    },
    {
      id: 3,
      author: {
        name: "Sophia Rodriguez",
        username: "sophiarodriguez",
        image: "/placeholder.svg?height=40&width=40",
        initials: "SR",
      },
      content:
        "I'd love to see a follow-up article that dives deeper into microservices architecture and how it relates to scalability.",
      publishedAt: "5 days ago",
      likes: 12,
      replies: 3,
    },
  ]

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      // In a real app, you would submit the comment to your backend
      console.log("Submitting comment:", commentText)
      setCommentText("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <div className="space-y-4">
        <Textarea
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleSubmitComment} disabled={!commentText.trim()}>
          Publish
        </Button>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={comment.author.image} alt={comment.author.name} />
                <AvatarFallback>{comment.author.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.author.name}</span>
                  <span className="text-sm text-muted-foreground">{comment.publishedAt}</span>
                </div>
                <p className="mt-1">{comment.content}</p>
                <div className="mt-2 flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                    <Heart className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                    <Reply className="h-4 w-4" />
                    <span>Reply</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

