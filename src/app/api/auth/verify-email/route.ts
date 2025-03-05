import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { email, code } = await request.json()

        // Validate required fields
        if (!email || !code) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        // Make request to your backend API
        const response = await fetch("http://localhost:8000/verify-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                code,
            }),
        })

        const data = await response.text()
        const parsedData = data ? JSON.parse(data) : {}

        // Handle error responses from the backend
        if (!response.ok) {
            return NextResponse.json({ message: parsedData.error || "Verification failed" }, { status: response.status })
        }

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 })
    } catch (error) {
        console.error("Email verification error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

