import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        // Validate required fields
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 })
        }

        // Make request to your backend API
        const response = await fetch("http://localhost:8000/resend-verification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        })

        const data = await response.text()
        const parsedData = data ? JSON.parse(data) : {}

        // Handle error responses from the backend
        if (!response.ok) {
            return NextResponse.json(
                { message: parsedData.error || "Failed to resend verification email" },
                { status: response.status },
            )
        }

        return NextResponse.json({ message: "Verification email sent successfully" }, { status: 200 })
    } catch (error) {
        console.error("Resend verification error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

