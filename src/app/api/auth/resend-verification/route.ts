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

        // Try to parse the response as JSON
        let data
        const responseText = await response.text()
        try {
            data = JSON.parse(responseText)
        } catch (e) {
            // If parsing fails, use the raw text
            data = { message: responseText }
        }

        // Handle error responses from the backend
        if (!response.ok) {
            return NextResponse.json(
                { message: data.error || "Failed to resend verification code" },
                { status: response.status },
            )
        }

        return NextResponse.json({ message: "Verification code sent successfully" }, { status: 200 })
    } catch (error) {
        console.error("Resend verification error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

