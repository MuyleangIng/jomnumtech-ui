"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Bell, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/use-toast"
import {useAuth} from "@/components/auth/AuthContext";

interface Notification {
  id: number
  user_id: number
  sender_id: number
  article_id: number
  notification_type: string
  created_at: string
  comment_id: number | null
  is_read: boolean
}

export function Notifications() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { tokens, user } = useAuth()
  const wsRef = useRef<WebSocket | null>(null)

  const fetchNotifications = useCallback(async () => {
    if (!tokens) {
      setError("You must be logged in to view notifications")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notifications`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      })
      if (!response.ok) throw new Error("Failed to fetch notifications")
      const data = await response.json()
      setNotifications(data)
      setUnreadCount(data.filter((notif: Notification) => !notif.is_read).length)
    } catch (error) {
      console.error("Error fetching notifications:", error)
      setError("Failed to fetch notifications. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }, [tokens])

  const connectWebSocket = useCallback(() => {
    if (!tokens || !user) return

    wsRef.current = new WebSocket(`ws://jomnumtech-api.shinoshike.studio/ws/notifications?token=${tokens.access_token}`)

    wsRef.current.onopen = () => {
      console.log("WebSocket connected")
      toast({
        title: "Notifications",
        description: "Real-time notifications connected",
      })
    }

    wsRef.current.onmessage = (event) => {
      console.log("WebSocket message received:", event.data)
      try {
        const newNotification = JSON.parse(event.data)
        setNotifications((prev) => [newNotification, ...prev])
        setUnreadCount((prev) => prev + 1)
        toast({
          title: "New Notification",
          description: getNotificationMessage(newNotification),
        })
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error)
      toast({
        title: "Notification Error",
        description: "Failed to connect to real-time notifications",
        variant: "destructive",
      })
    }

    wsRef.current.onclose = () => {
      console.log("WebSocket closed")
      toast({
        title: "Notifications",
        description: "Real-time notifications disconnected",
        variant: "destructive",
      })
    }
  }, [tokens, user])

  useEffect(() => {
    if (tokens && user) {
      fetchNotifications()
      connectWebSocket()

      return () => {
        if (wsRef.current) {
          wsRef.current.close()
        }
      }
    }
  }, [tokens, user, fetchNotifications, connectWebSocket])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markAsRead = async (id: number) => {
    if (!tokens) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notifications/${id}/read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      })
      if (!response.ok) throw new Error("Failed to mark notification as read")
      setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, is_read: true } : notif)))
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const getNotificationMessage = (notification: Notification) => {
    switch (notification.notification_type) {
      case "reply":
        return "Someone replied to your comment"
      case "comment":
        return "Someone commented on your article"
      case "bookmark":
        return "Someone bookmarked your article"
      case "like":
        return "Someone liked your article"
      default:
        return "You have a new notification"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const handleRefresh = () => {
    fetchNotifications()
    if (wsRef.current && wsRef.current.readyState !== WebSocket.OPEN) {
      connectWebSocket()
    }
  }

  return (
      <div className="relative">
        <Button variant="ghost" size="icon" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
          )}
        </Button>

        {isNotificationsOpen && (
            <div
                ref={dropdownRef}
                className="absolute right-1/2 translate-x-1/2 mt-2 w-80 bg-white shadow-md border rounded-lg p-3 z-50"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">Notifications</p>
                <Button variant="ghost" size="sm" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              {isLoading ? (
                  <div className="flex justify-center items-center h-20">
                    <Spinner />
                  </div>
              ) : error ? (
                  <p className="text-sm text-red-500">{error}</p>
              ) : notifications.length === 0 ? (
                  <p className="text-sm text-gray-500">No notifications</p>
              ) : (
                  <ul className="space-y-2 max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                        <li
                            key={notification.id}
                            className={`text-sm p-2 hover:bg-gray-100 rounded cursor-pointer ${!notification.is_read ? "bg-blue-50" : ""}`}
                            onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex justify-between items-center">
                            <span>{getNotificationMessage(notification)}</span>
                            <span className="text-xs text-gray-500">{formatDate(notification.created_at)}</span>
                          </div>
                        </li>
                    ))}
                  </ul>
              )}
            </div>
        )}
      </div>
  )
}

