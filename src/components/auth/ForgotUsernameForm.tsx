"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface ForgotUsernameFormProps {
  onBack: () => void
}

export function ForgotUsernameForm({ onBack }: ForgotUsernameFormProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleForgotUsername = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/forgot-username`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Your username has been sent to your email." })
        onBack()
      } else {
        const data = await response.json()
        throw new Error(data.detail || "Failed to retrieve username")
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Forgot Username</h2>
      <form onSubmit={handleForgotUsername} className="space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Retrieve Username"}
        </Button>
      </form>
      <Button variant="ghost" onClick={onBack}>
        Back to Sign In
      </Button>
    </div>
  )
}

