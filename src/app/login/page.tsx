"use client"
import loginAnimation from "./login.json"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SignInFormButton } from "@/components/auth/SignInFormButton"
import Lottie from "lottie-react";
export default function LoginPage() {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Image */}
            <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center">
                <div className="relative w-full h-full">
                    {/*<Image*/}
                    {/*    src="/placeholder.svg?height=600&width=600"*/}
                    {/*    alt="Login visual"*/}
                    {/*    layout="fill"*/}
                    {/*    objectFit="cover"*/}
                    {/*    priority*/}
                    {/*/>*/}
                    i
                    <Lottie
                        animationData={loginAnimation}
                        loop={true}
                    />


                </div>
            </div>

            {/* Right side - Login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
                <Card className="w-full max-w-md border-0 shadow-none">
                    <CardHeader className="space-y-1 pb-4">
                        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                        <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
                    </CardHeader>
                    <CardContent>
                        <SignInFormButton onSuccess={() => console.log("Login successful")} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

