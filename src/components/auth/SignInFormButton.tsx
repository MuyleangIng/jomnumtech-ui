"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChromeIcon as Google } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth/AuthContext"

interface SignInFormProps {
    onSuccess?: () => void
}

export function SignInFormButton({ onSuccess }: SignInFormProps) {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const { setAuthState } = useAuth()

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    identifier,
                    password,
                }),
            })

            const data = await response.json()
            if (response.ok) {
                setAuthState(data.user, {
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    token_type: "bearer",
                })
                toast({ title: "Success!", description: "You have been signed in." })
                if (onSuccess) onSuccess()
                router.push("/profile")
            } else {
                throw new Error(data.detail || "Failed to sign in")
            }
        } catch (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = () => {
        const clientId = "864319511903-9ppi277qfje6aa3nt2obh0d1tohlro2m.apps.googleusercontent.com"
        const redirectUri = `${window.location.origin}/auth/google/callback`
        const scope = "openid email profile"
        const googleAuthUrl =
            `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${encodeURIComponent(clientId!)}&` +
            `redirect_uri=${encodeURIComponent(redirectUri)}&` +
            `response_type=code&` +
            `scope=${encodeURIComponent(scope)}&` +
            `access_type=offline`

        window.location.href = googleAuthUrl
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Email or Username</p>
                    <Input
                        id="identifier"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter your email or username"
                        required
                        className="border-0 bg-gray-50 h-11 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Password</p>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="border-0 bg-gray-50 h-11 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>
                <Button type="submit" className="w-full h-11 bg-[#0F172A] hover:bg-[#1E293B] text-white" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in with email"}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">OR CONTINUE WITH</span>
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full h-11 border-2 hover:bg-gray-50 font-medium"
                onClick={handleGoogleSignIn}
            >
                <Google className="mr-2 h-5 w-5" />
                Sign in with Google
            </Button>
        </div>
    )
}

