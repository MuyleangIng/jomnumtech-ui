import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        // Get the form data from the request
        const formData = await request.formData()

        // Forward the request to your backend
        const response = await fetch("https://jomnumtech-api.shinoshike.studio/articles/upload-image/", {
            method: "POST",
            body: formData,
        })

        // Check if the response is successful
        if (!response.ok) {
            const errorText = await response.text()
            return NextResponse.json({ error: `Failed to upload image: ${errorText}` }, { status: response.status })
        }

        // Get the response data
        const data = await response.json()

        // Return the response
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error uploading image:", error)
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
    }
}

