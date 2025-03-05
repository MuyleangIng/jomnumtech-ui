"use client"

import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import {useAuth} from "@/components/auth/AuthContext";
import {refreshAccessToken} from "@/hook/security/auth";

export interface Article {
    id: number
    slug: string
    title: string
    subtitle: string
    content: string
    image_url: string
    is_public: boolean
    category_id: number
    author_id: number
    created_at: string
    views: number
    total_likes: number
    total_comments: number
    total_shares: number
    total_bookmarks: number
    tags: { id: number; name: string }[]
}

export function useFetchMyArticles() {
    const { tokens } = useAuth()
    const [articles, setArticles] = useState<Article[]>([])
    const [loadingArticles, setLoadingArticles] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchArticles = async () => {
            if (!tokens?.access_token) {
                console.error("No authentication token provided")
                setError("Authentication required.")
                setLoadingArticles(false)
                return
            }

            try {
                console.log("Fetching user articles...")

                const response = await fetch("https://jomnumtech-api.shinoshike.studio/articles/my", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${tokens.access_token}`,
                        "Content-Type": "application/json",
                    },
                })
                console.log("sdfasf",response.status)
                if (response.status === 401) {
                    console.log("Token expired, refreshing...")
                    await refreshAccessToken()
                    return
                }

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}))
                    throw new Error(errorData.message || `Error: ${response.statusText}`)
                }

                const fetchedArticles = await response.json()
                if (!Array.isArray(fetchedArticles)) {
                    throw new Error("Invalid response format")
                }

                setArticles(fetchedArticles)
            } catch (error) {
                console.error("Error fetching articles:", error)
                setError("Failed to fetch articles. Please try again.")
                toast({
                    title: "Error",
                    description: "Failed to fetch your articles.",
                    variant: "destructive",
                })
            } finally {
                setLoadingArticles(false)
            }
        }

        fetchArticles()
    }, [tokens?.access_token])

    // ✅ Update the visibility state of an article
    const updateArticleVisibility = (articleId: number, newVisibility: boolean) => {
        setArticles((prevArticles) =>
            prevArticles.map((article) =>
                article.id === articleId ? { ...article, is_public: newVisibility } : article
            )
        )
    }



    return { articles ,setArticles, loadingArticles, error, updateArticleVisibility }
}
