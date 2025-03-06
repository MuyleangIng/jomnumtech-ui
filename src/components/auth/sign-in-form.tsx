"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChromeIcon as Google } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth/AuthContext"

interface SignInFormProps {
    onSuccess?: () => void
}

export function SignInForm({ onSuccess }: SignInFormProps) {
    const [identifier, setIdentifier] = useState("") // Can be email or username
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
                credentials: "include", // ✅ Important for cookies
                body: JSON.stringify({
                    identifier,
                    password
                }),
            })

            const data = await response.json()
            console.log("form simple login",data)
            if (response.ok) {
                setAuthState(data.user, { access_token: data.access_token,refresh_token: data.refresh_token, token_type: "bearer" })
                toast({ title: "Success!", description: "You have been signed in." })

                // ✅ Close the dialog by calling onSuccess()
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
                    <Label htmlFor="identifier">Email or Username</Label>
                    <Input
                        id="identifier"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter your email or username"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in with email"}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                <Google className="mr-2 h-4 w-4" />
                Sign in with Google
            </Button>
        </div>
    )
}
