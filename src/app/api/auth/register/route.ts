import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { username, name, email, password } = await request.json()

        // Validate required fields
        if (!username || !email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        // Make request to your backend API
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                username,
                password,
            }),
        })

        const data = await response.json()

        // Handle error responses from the backend
        if (!response.ok) {
            // Check for specific error types
            if (data.error && data.error.includes("email already exists")) {
                return NextResponse.json({ message: "Email already in use", code: "duplicate_email" }, { status: 409 })
            } else if (data.error && data.error.includes("username already exists")) {
                return NextResponse.json({ message: "Username already taken", code: "duplicate_username" }, { status: 409 })
            }

            return NextResponse.json({ message: data.error || "Registration failed" }, { status: response.status })
        }

        return NextResponse.json({ message: "Registration successful", user: data.user }, { status: 201 })
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

