"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Apple, Facebook, Mail, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth/AuthContext"

export function SignInForm() {
  const [isEmailForm, setIsEmailForm] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { setAuthState } = useAuth()

  const handleGoogleLogin = () => {
    const clientId = "864319511903-9ppi277qfje6aa3nt2obh0d1tohlro2m.apps.googleusercontent.com"
    const redirectUri = "http://localhost:3000/auth/google/callback" // Ensure it matches backend
    const scope = "openid email profile" // Add 'openid'

    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(clientId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent(scope)}&` +
      `access_type=offline` // Request refresh token

    window.location.href = googleAuthUrl
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: email,
          password,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Login failed")
      }

      const data = await response.json()
      setAuthState(data.user, {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
      })

      toast({
        title: "Success!",
        description: "You have been signed in.",
      })
      router.push("/profile")
    } catch (error) {
      toast({
        title: "Error signing in",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleProviderSignIn = (provider: string) => {
    // Implement provider sign-in logic here
    console.log(`Sign in with ${provider}`)
  }

  if (isEmailForm) {
    return (
      <form onSubmit={handleEmailSignIn} className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" size="sm" className="px-0">
              Forgot password?
            </Button>
          </div>
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
        <Button type="button" variant="outline" className="w-full" onClick={() => setIsEmailForm(false)}>
          Back to all options
        </Button>
      </form>
    )
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      <Button variant="outline" className="flex items-center justify-center gap-2" onClick={handleGoogleLogin}>
        <svg viewBox="0 0 24 24" width="16" height="16">
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path
              fill="#4285F4"
              d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
            />
            <path
              fill="#34A853"
              d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
            />
            <path
              fill="#FBBC05"
              d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
            />
            <path
              fill="#EA4335"
              d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
            />
          </g>
        </svg>
        Sign in with Google
      </Button>

      <Button
        variant="outline"
        className="flex items-center justify-center gap-2"
        onClick={() => handleProviderSignIn("facebook")}
      >
        <Facebook className="h-4 w-4 text-blue-600" />
        Sign in with Facebook
      </Button>

      <Button
        variant="outline"
        className="flex items-center justify-center gap-2"
        onClick={() => handleProviderSignIn("apple")}
      >
        <Apple className="h-4 w-4" />
        Sign in with Apple
      </Button>

      <Button
        variant="outline"
        className="flex items-center justify-center gap-2"
        onClick={() => handleProviderSignIn("twitter")}
      >
        <X className="h-4 w-4" />
        Sign in with X
      </Button>

      <Button variant="outline" className="flex items-center justify-center gap-2" onClick={() => setIsEmailForm(true)}>
        <Mail className="h-4 w-4" />
        Sign in with email
      </Button>
    </div>
  )
}

