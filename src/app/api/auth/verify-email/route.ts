import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { email, code } = await request.json()

        // Validate required fields
        if (!email || !code) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        // Make request to your backend API
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/verify-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                code,
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
            return NextResponse.json({ message: data.error || "Invalid verification code" }, { status: response.status })
        }

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 })
    } catch (error) {
        console.error("Email verification error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

