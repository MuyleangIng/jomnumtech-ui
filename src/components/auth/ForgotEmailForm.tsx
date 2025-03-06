"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface ForgotEmailFormProps {
  onBack: () => void
}

export function ForgotEmailForm({ onBack }: ForgotEmailFormProps) {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleForgotEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/forgot-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Your email has been sent to your registered email address." })
        onBack()
      } else {
        const data = await response.json()
        throw new Error(data.detail || "Failed to retrieve email")
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Forgot Email</h2>
      <form onSubmit={handleForgotEmail} className="space-y-4">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Retrieve Email"}
        </Button>
      </form>
      <Button variant="ghost" onClick={onBack}>
        Back to Sign In
      </Button>
    </div>
  )
}

