"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Loader2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function RegistrationSuccessPage() {
    const [isResending, setIsResending] = useState(false)
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""
    const { toast } = useToast()

    const handleResendVerification = async () => {
        setIsResending(true)

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
                throw new Error(data.message || "Failed to resend verification email")
            }

            toast({
                title: "Verification email sent",
                description: "Please check your inbox for the verification link",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to resend verification email",
                variant: "destructive",
            })
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Registration Successful!</CardTitle>
                    <CardDescription className="text-center">
                        We've sent a verification email to <span className="font-medium">{email}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg text-sm">
                        <p className="flex items-start gap-2">
                            <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>
                Please check your email inbox and click on the verification link to activate your account. If you don't
                see the email, please check your spam folder.
              </span>
                        </p>
                    </div>

                    <Button onClick={handleResendVerification} variant="outline" className="w-full" disabled={isResending}>
                        {isResending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Resending...
                            </>
                        ) : (
                            "Resend verification email"
                        )}
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="text-sm text-muted-foreground">
                        Already verified?{" "}
                        <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

