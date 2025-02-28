import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Get the authorization header from the incoming request
        const authHeader = request.headers.get("Authorization")

        if (!authHeader) {
            return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
        }

        // Forward the request to your backend
        const response = await fetch("https://jomnumtech-api.shinoshike.studio/articles/", {
            method: "POST",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        // Get the response data
        const data = await response.json()

        // Return the response with the same status
        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error("Error creating article:", error)
        return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
    }
}

