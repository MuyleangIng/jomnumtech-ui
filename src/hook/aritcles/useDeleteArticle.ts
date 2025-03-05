"use client"

import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth/AuthContext"

export function useDeleteArticle() {
    const { tokens } = useAuth()
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteArticle = async (articleId: number): Promise<boolean> => {
        if (!tokens?.access_token) {
            toast({
                title: "Authentication Error",
                description: "You must be logged in to delete an article.",
                variant: "destructive",
            })
            return false
        }

        setIsDeleting(true) // ✅ Start deleting

        try {
            const response = await fetch(`https://jomnumtech-api.shinoshike.studio/articles/${articleId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                toast({
                    title: "Delete Failed",
                    description: errorData.message || "An error occurred while deleting the article.",
                    variant: "destructive",
                })
                return false
            }

            toast({
                title: "Article Deleted",
                description: "The article was successfully removed.",
            })

            return true
        } catch (error) {
            toast({
                title: "Delete Failed",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            })
            return false
        } finally {
            setIsDeleting(false) // ✅ Stop deleting
        }
    }

    return { deleteArticle, isDeleting }
}
