"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyEmailPage() {
    const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading")
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()

    const email = searchParams.get("email") || ""
    const code = searchParams.get("code") || ""

    useEffect(() => {
        const verifyEmail = async () => {
            if (!email || !code) {
                setVerificationStatus("error")
                setErrorMessage("Missing verification parameters")
                return
            }

            try {
                const response = await fetch("/api/auth/verify-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, code }),
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || "Verification failed")
                }

                setVerificationStatus("success")

                // Auto redirect to login after successful verification
                setTimeout(() => {
                    router.push("/login")
                }, 3000)
            } catch (error) {
                setVerificationStatus("error")
                setErrorMessage(error instanceof Error ? error.message : "Verification failed")
            }
        }

        verifyEmail()
    }, [email, code, router])

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    {verificationStatus === "loading" && (
                        <div className="flex justify-center mb-4">
                            <Loader2 className="h-16 w-16 animate-spin text-primary" />
                        </div>
                    )}

                    {verificationStatus === "success" && (
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                    )}

                    {verificationStatus === "error" && (
                        <div className="flex justify-center mb-4">
                            <XCircle className="h-16 w-16 text-red-500" />
                        </div>
                    )}

                    <CardTitle className="text-2xl font-bold text-center">
                        {verificationStatus === "loading" && "Verifying your email..."}
                        {verificationStatus === "success" && "Email Verified!"}
                        {verificationStatus === "error" && "Verification Failed"}
                    </CardTitle>

                    <CardDescription className="text-center">
                        {verificationStatus === "loading" && "Please wait while we verify your email address."}
                        {verificationStatus === "success" &&
                            "Your email has been successfully verified. You will be redirected to login."}
                        {verificationStatus === "error" && errorMessage}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {verificationStatus === "success" && (
                        <Button asChild className="w-full">
                            <Link href="/login">Go to Login</Link>
                        </Button>
                    )}

                    {verificationStatus === "error" && (
                        <div className="space-y-2">
                            <Button asChild variant="outline" className="w-full">
                                <Link href={`/register/success?email=${encodeURIComponent(email)}`}>Resend Verification Email</Link>
                            </Button>

                            <Button asChild className="w-full">
                                <Link href="/register">Register Again</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

