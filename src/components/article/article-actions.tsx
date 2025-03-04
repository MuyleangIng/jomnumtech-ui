"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bookmark, Heart, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth/AuthContext"
import { cn } from "@/lib/utils"
import {ShareButton} from "@/components/article/share-button";

interface ArticleActionsProps {
  articleId: number
  initialLikes: number
  initialBookmarks: number
}

interface LikeResponse {
  total_likes: number
  liked_users: Array<{
    id: number
    article_id: number
    user_id: number
    username: string
  }>
}

interface BookmarkResponse {
  total_bookmarks: number
  bookmarked_users: Array<{
    id: number
    article_id: number
    user_id: number
    username: string
  }>
}

export function ArticleActions({ articleId, initialLikes, initialBookmarks }: ArticleActionsProps) {
  const { user, tokens } = useAuth()
  const router = useRouter()

  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [bookmarkCount, setBookmarkCount] = useState(0)
  const [isLoading, setIsLoading] = useState({
    like: false,
    bookmark: false,
  })

  useEffect(() => {
    if (!tokens?.access_token || !user) return

    const fetchArticleInteractions = async () => {
      try {
        const [likesResponse, bookmarksResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/${articleId}/likes`, {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/${articleId}/bookmarks`, {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          }),
        ])

        if (!likesResponse.ok || !bookmarksResponse.ok) {
          throw new Error("Failed to fetch article interactions")
        }

        const likesData: LikeResponse = await likesResponse.json()
        const bookmarksData: BookmarkResponse = await bookmarksResponse.json()

        // Check if current user has liked/bookmarked
        const userLike = likesData.liked_users.find(like => like.user_id === user.id)
        const userBookmark = bookmarksData.bookmarked_users.find(bookmark => bookmark.user_id === user.id)

        setLiked(!!userLike)
        setBookmarked(!!userBookmark)
        setLikeCount(likesData.total_likes)
        setBookmarkCount(bookmarksData.total_bookmarks)
      } catch (error) {
        console.error("Error fetching article interactions:", error)
      }
    }

    fetchArticleInteractions()
  }, [articleId, tokens, user])

  const toggleLike = async () => {
    if (!tokens?.access_token) {
      router.push("/login")
      return
    }

    setIsLoading(prev => ({ ...prev, like: true }))

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/${articleId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      })

      if (!response.ok) throw new Error("Failed to toggle like")

      // Fetch updated like count after toggling
      const likesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/${articleId}/likes`, {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      })

      if (!likesResponse.ok) throw new Error("Failed to fetch updated likes")

      const likesData: LikeResponse = await likesResponse.json()
      const isLiked = likesData.liked_users.some(like => like.user_id === user?.id)

      setLiked(isLiked)
      setLikeCount(likesData.total_likes)

      toast({
        title: isLiked ? "Added like" : "Removed like",
        description: isLiked ? "You've liked this article" : "You've removed your like from this article",
      })
    } catch (error) {
      console.error("Error toggling like:", error)
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      })
    } finally {
      setIsLoading(prev => ({ ...prev, like: false }))
    }
  }

  const toggleBookmark = async () => {
    if (!tokens?.access_token) {
      router.push("/login")
      return
    }

    setIsLoading(prev => ({ ...prev, bookmark: true }))

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/${articleId}/bookmark`, {
        method: "POST",
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      })

      if (!response.ok) throw new Error("Failed to toggle bookmark")

      // Fetch updated bookmark count after toggling
      const bookmarksResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/${articleId}/bookmarks`, {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      })

      if (!bookmarksResponse.ok) throw new Error("Failed to fetch updated bookmarks")

      const bookmarksData: BookmarkResponse = await bookmarksResponse.json()
      const isBookmarked = bookmarksData.bookmarked_users.some(bookmark => bookmark.user_id === user?.id)

      setBookmarked(isBookmarked)
      setBookmarkCount(bookmarksData.total_bookmarks)

      toast({
        title: isBookmarked ? "Added bookmark" : "Removed bookmark",
        description: isBookmarked ? "You've bookmarked this article" : "You've removed this article from your bookmarks",
      })
    } catch (error) {
      console.error("Error toggling bookmark:", error)
      toast({
        title: "Error",
        description: "Failed to update bookmark status",
        variant: "destructive",
      })
    } finally {
      setIsLoading(prev => ({ ...prev, bookmark: false }))
    }
  }

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/article/${articleId}`
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: "Link copied",
        description: "Article link has been copied to clipboard",
      })
    } catch (error) {
      console.error("Error sharing article:", error)
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      })
    }
  }

  return (
      <div className="flex items-center space-x-2">
        <Button
            variant="ghost"
            size="sm"
            className={cn(
                "flex items-center gap-1 transition-colors",
                liked ? "text-red-500" : "hover:text-red-500"
            )}
            onClick={toggleLike}
            disabled={isLoading.like}
        >
          <Heart
              className={cn(
                  "h-5 w-5 transition-all",
                  liked && "fill-red-500 scale-110"
              )}
          />
          <span className="text-sm font-medium">{likeCount}</span>
        </Button>

        <Button
            variant="ghost"
            size="sm"
            className={cn(
                "flex items-center gap-1 transition-colors",
                bookmarked ? "text-blue-500" : "hover:text-blue-500"
            )}
            onClick={toggleBookmark}
            disabled={isLoading.bookmark}
        >
          <Bookmark
              className={cn(
                  "h-5 w-5 transition-all",
                  bookmarked && "fill-blue-500 scale-110"
              )}
          />
          <span className="text-sm font-medium">{bookmarkCount}</span>
        </Button>

        <ShareButton articleId={articleId} />
      </div>
  )
}
