"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Loader2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegistrationSuccessPage() {
    const [isResending, setIsResending] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [verificationCode, setVerificationCode] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState("")

    const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get("email") || ""
    const { toast } = useToast()

    const handleResendVerification = async () => {
        setIsResending(true)
        setError("")

        try {
            const response = await fetch("/api/auth/resend-verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to resend verification code")
            }

            toast({
                title: "Verification code sent",
                description: "Please check your inbox for the verification code",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to resend verification code",
                variant: "destructive",
            })
        } finally {
            setIsResending(false)
        }
    }

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsVerifying(true)
        setError("")

        if (!verificationCode || verificationCode.length < 6) {
            setError("Please enter a valid verification code")
            setIsVerifying(false)
            return
        }

        try {
            const response = await fetch("/api/auth/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    code: verificationCode,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Invalid verification code")
            }

            setIsVerified(true)
            toast({
                title: "Email verified!",
                description: "Your account has been successfully verified",
            })

            // Redirect to login after successful verification
            setTimeout(() => {
                router.push("/login")
            }, 2000)
        } catch (error) {
            setError(error instanceof Error ? error.message : "Verification failed")
            toast({
                title: "Verification failed",
                description: error instanceof Error ? error.message : "Please check your code and try again",
                variant: "destructive",
            })
        } finally {
            setIsVerifying(false)
        }
    }

    if (isVerified) {
        return (
            <div className="container flex h-screen w-screen flex-col items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">Email Verified!</CardTitle>
                        <CardDescription className="text-center">
                            Your account has been successfully verified. Redirecting to login...
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button asChild className="w-full">
                            <Link href="/login">Go to Login</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
                    <CardDescription className="text-center">
                        We've sent a verification code to <span className="font-medium">{email}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg text-sm">
                        <p className="flex items-start gap-2">
                            <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>
                Please check your email inbox for a 6-digit verification code. If you don't see the email, please check
                your spam folder.
              </span>
                        </p>
                    </div>

                    <form onSubmit={handleVerifyCode} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="verification-code">Verification Code</Label>
                            <Input
                                id="verification-code"
                                placeholder="Enter 6-digit code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                maxLength={6}
                                className={error ? "border-red-500" : ""}
                            />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={isVerifying}>
                            {isVerifying ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify Email"
                            )}
                        </Button>
                    </form>

                    <div className="text-center">
                        <Button onClick={handleResendVerification} variant="link" className="text-sm" disabled={isResending}>
                            {isResending ? (
                                <>
                                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                    Resending...
                                </>
                            ) : (
                                "Didn't receive a code? Resend"
                            )}
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="text-sm text-muted-foreground">
                        <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                            Back to registration
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

