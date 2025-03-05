"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/AuthContext"
import { useToast } from "@/components/ui/use-toast"

export default function GoogleCallback() {
  const router = useRouter()
  const { setAuthState } = useAuth()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (isProcessing) return
    setIsProcessing(true)

    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get("error")
    const code = urlParams.get("code")

    if (error) {
      console.error("Google OAuth error:", error)
      toast({
        title: "Error",
        description: `Google sign-in failed: ${error}`,
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (code) {
      console.log("Google OAuth Code:", code)

      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include",
      })
          .then(async (response) => {
            if (!response.ok) {
              const errorText = await response.text()
              console.error("Server Response:", errorText)
              throw new Error(errorText)
            }
            return response.json()
          })
          .then((data) => {
            console.log("Google Login Response:", data)

            if (data.user && data.access_token && data.refresh_token) {
              setAuthState(data.user, {
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                token_type: data.token_type,
              })

              toast({
                title: "Success!",
                description: "You have been signed in with Google.",
              })

              router.push("/profile")
            } else {
              throw new Error("Invalid response format from server")
            }
          })
          .catch((error) => {
            console.error("Error during Google sign-in:", error)
            toast({
              title: "Error",
              description: error.message || "Failed to sign in with Google. Please try again.",
              variant: "destructive",
            })
            router.push("/")
          })
    }
  }, [router, setAuthState, toast])

  return <div>Signing in...</div>
}
