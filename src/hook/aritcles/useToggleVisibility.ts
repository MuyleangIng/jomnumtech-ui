"use client"

import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import {useAuth} from "@/components/auth/AuthContext";
import {refreshAccessToken} from "@/hook/security/auth";

export function useToggleVisibility() {
    const { tokens } = useAuth()
    const [loadingArticle, setLoadingArticle] = useState<number | null>(null)

    const toggleVisibility = async (articleId: number, isPublic: boolean, updateArticles: (id: number, newVisibility: boolean) => void) => {
        if (!tokens?.access_token) {
            console.error("No authentication token provided")
            toast({
                title: "Error",
                description: "You must be logged in to update article visibility.",
                variant: "destructive",
            })
            return
        }

        setLoadingArticle(articleId) // Indicate loading state for the specific article

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/${articleId}/visibility`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_public: !isPublic }),
            })
            console.log("sdfasf",response.status)
            if (response.status === 401) {
                console.log("Token expired, refreshing...")
                await refreshAccessToken()
                return
            }

            if (!response.ok) {
                throw new Error(`Failed to update visibility: ${response.statusText}`)
            }

            // Update state with new visibility
            updateArticles(articleId, !isPublic)

            toast({
                title: "Success",
                description: `Article is now ${!isPublic ? "Private" : "Public"}.`,
            })
        } catch (error) {
            console.error("Error updating article visibility:", error)
            toast({
                title: "Update failed",
                description: "There was an error updating the article visibility. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoadingArticle(null) // Reset loading state
        }
    }

    return { toggleVisibility, loadingArticle }
}
