"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api-public"
import { useRouter } from "next/navigation"
import {useAuth} from "@/components/auth/AuthContext";

interface ArticleActionsProps {
  articleId: number
  initialLikes: number
  initialBookmarks: number
}

export function ArticleActions({ articleId, initialLikes, initialBookmarks }: ArticleActionsProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikes)
  const [bookmarkCount, setBookmarkCount] = useState(initialBookmarks)
  const { user, tokens } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (tokens?.access_token) {
      checkInteractions()
    }
  }, [tokens?.access_token])

  const checkInteractions = async () => {
    const response = await api.checkInteractions(articleId, tokens.access_token)
    if (response.data) {
      setLiked(response.data.liked)
      setBookmarked(response.data.bookmarked)
    }
  }

  const handleAction = async (action: "like" | "bookmark") => {
    if (!tokens?.access_token) {
      router.push("/login")
      return
    }

    const isLikeAction = action === "like"
    const currentState = isLikeAction ? liked : bookmarked
    const setState = isLikeAction ? setLiked : setBookmarked
    const setCount = isLikeAction ? setLikeCount : setBookmarkCount

    const apiAction = isLikeAction
      ? currentState
        ? api.unlikeArticle
        : api.likeArticle
      : currentState
        ? api.unbookmarkArticle
        : api.bookmarkArticle

    const response = await apiAction(articleId, tokens.access_token)
    if (!response.error) {
      setState(!currentState)
      setCount((prev) => (currentState ? prev - 1 : prev + 1))
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="sm" className="gap-2" onClick={() => handleAction("like")}>
        <Heart className={cn("h-5 w-5", liked && "fill-current text-red-500")} />
        <span>{likeCount}</span>
      </Button>
      <Button variant="ghost" size="sm" className="gap-2" onClick={() => handleAction("bookmark")}>
        <Bookmark className={cn("h-5 w-5", bookmarked && "fill-current")} />
        <span>{bookmarkCount}</span>
      </Button>
    </div>
  )
}

