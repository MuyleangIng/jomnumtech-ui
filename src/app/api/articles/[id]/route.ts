import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id

        // Get the authorization header from the incoming request
        const authHeader = request.headers.get("Authorization")

        // Forward the request to your backend
        const response = await fetch(`https://jomnumtech-api.shinoshike.studio/articles/${id}/`, {
            method: "GET",
            headers: authHeader
                ? {
                    Authorization: authHeader,
                }
                : {},
        })

        // Get the response data
        const data = await response.json()

        // Return the response with the same status
        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error(`Error fetching article ${params.id}:`, error)
        return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const body = await request.json()

        // Get the authorization header from the incoming request
        const authHeader = request.headers.get("Authorization")

        if (!authHeader) {
            return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
        }

        // Forward the request to your backend
        const response = await fetch(`https://jomnumtech-api.shinoshike.studio/articles/${id}/`, {
            method: "PUT",
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
        console.error(`Error updating article ${params.id}:`, error)
        return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id

        // Get the authorization header from the incoming request
        const authHeader = request.headers.get("Authorization")

        if (!authHeader) {
            return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
        }

        // Forward the request to your backend
        const response = await fetch(`https://jomnumtech-api.shinoshike.studio/articles/${id}/`, {
            method: "DELETE",
            headers: {
                Authorization: authHeader,
            },
        })

        // If the response is 204 No Content, return an empty response
        if (response.status === 204) {
            return new NextResponse(null, { status: 204 })
        }

        // Get the response data
        const data = await response.json()

        // Return the response with the same status
        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error(`Error deleting article ${params.id}:`, error)
        return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
    }
}

