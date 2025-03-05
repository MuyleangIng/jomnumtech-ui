"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/AuthContext"

export const useFetchProfile = () => {
    const { tokens, refreshAccessToken } = useAuth()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    console.log("useFetchProfile",profile)
    useEffect(() => {
        const fetchProfile = async () => {
            if (!tokens?.access_token) {
                console.log("No access token available, waiting...")
                await refreshAccessToken()
                return
            }

            try {
                console.log("Fetching profile with access token:", tokens.access_token)

                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/profile`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${tokens.access_token}`,
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })

                if (response.status === 401) {
                    console.log("Token expired, refreshing...")
                    await refreshAccessToken()
                    return
                }

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`)
                }

                const data = await response.json()
                console.log("Profile Data:", data)
                setProfile(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error")
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [tokens?.access_token]) // ✅ Waits until tokens are available

    return { profile, loading, error }
}
