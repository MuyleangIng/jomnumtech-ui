"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link";

export function RecommendedTopics() {
    const [topics, setTopics] = useState<string[]>([])
    const [showAll, setShowAll] = useState(false) // State to track visibility

    useEffect(() => {
        async function loadTags() {
            const fetchedTags = await fetchTags()
            console.log("Fetched Tags:", fetchedTags)

            // Extract 'name' from objects and remove duplicates
            const uniqueTopics = [...new Set(fetchedTags.map(tag => tag.name))]

            setTopics(uniqueTopics.length > 0 ? uniqueTopics : defaultTopics)
        }

        loadTags()
    }, [])

    const defaultTopics = [
        "Programming",
        "Data Science",
        "Technology",
        "Self Improvement",
        "Writing",
        "Relationships",
        "Machine Learning",
        "Productivity",
        "Politics",
    ]

    // Limit to 10 topics unless expanded
    const visibleTopics = showAll ? topics : topics.slice(0, 10)

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Recommended Topics</h2>
            <div className="flex flex-wrap gap-2">
                {visibleTopics.map((topic) => (
                    <Button key={topic} variant="secondary" size="sm" className="rounded-full" asChild>
                        <Link href={`/topic/${String(topic).toLowerCase().replace(/ /g, "-")}`}>
                            {topic}
                        </Link>
                    </Button>
                ))}
            </div>

             {/*Toggle button for "See More" / "See Less"*/}
            {topics.length > 10 && (
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "See Less" : "See More"}
                </Button>
            )}
        </div>
    )
}

async function fetchTags(): Promise<{ name: string }[]> {
    try {
        const response = await fetch("https://jomnumtech-api.shinoshike.studio/tags/")

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        // Ensure we return an array of objects with 'name' field
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error("Error fetching tags:", error)
        return []
    }
}
