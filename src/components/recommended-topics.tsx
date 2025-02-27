import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RecommendedTopics() {
  const topics = [
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recommended topics</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Button key={topic} variant="secondary" size="sm" className="rounded-full" asChild>
            <Link href={`/topic/${topic.toLowerCase().replace(" ", "-")}`}>{topic}</Link>
          </Button>
        ))}
      </div>
      <Button variant="outline" size="sm" className="w-full" asChild>
        <Link href="/topics">See more topics</Link>
      </Button>
    </div>
  )
}

