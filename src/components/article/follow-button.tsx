"use client"

import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { useAuth } from "@/components/auth/AuthContext"

interface FollowButtonProps {
  userId: number
}

export function FollowButton({ userId }: FollowButtonProps) {
  const { user, tokens, updateUser } = useAuth()
  const router = useRouter()

  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!tokens?.access_token) return

    const checkFollowStatus = async () => {
      try {
        const response = await fetch(`https://jomnumtech-api.shinoshike.studio/users/${userId}/is-following`, {
          method: "GET",
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        })

        if (!response.ok) throw new Error("Failed to check follow status")

        const data = await response.json()
        setIsFollowing(data.is_following)
      } catch (error) {
        console.error("Error checking follow status:", error)
      }
    }

    checkFollowStatus()
  }, [userId, tokens])

  const toggleFollow = async () => {
    if (isLoading) return

    if (!tokens?.access_token) {
      router.push("/login")
      return
    }

    setIsLoading(true)
    const method = isFollowing ? "DELETE" : "POST"
    const action = isFollowing ? "unfollow" : "follow"

    try {
      const response = await fetch(`https://jomnumtech-api.shinoshike.studio/users/${userId}/${action}`, {
        method,
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || `Failed to ${action} user`)
      }

      setIsFollowing(!isFollowing)

      // Update user follow count in context
      if (user && updateUser) {
        updateUser({
          ...user,
          total_following: isFollowing ? user.total_following - 1 : user.total_following + 1,
        })
      }

      toast({
        title: isFollowing ? "Unfollowed" : "Followed",
        description: isFollowing ? "You are no longer following this user" : "You are now following this user",
      })
    } catch (error) {
      console.error("Error toggling follow:", error)
      toast({
        title: "Error",
        description: error.message || `Failed to ${action} user`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" className="rounded-full" onClick={toggleFollow} disabled={isLoading}>
      <Users className="mr-2 h-4 w-4" />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}

