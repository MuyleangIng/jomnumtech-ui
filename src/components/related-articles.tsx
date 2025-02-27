import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for related articles
const relatedArticles = [
  {
    id: "1",
    title: "Docker Compose: The Complete Guide",
    excerpt: "Learn how to manage multi-container applications with Docker Compose",
    coverImage: "/placeholder.svg?height=200&width=300",
    publishedAt: "Feb 12, 2024",
    readTime: "8 min read",
    author: {
      name: "Sarah Johnson",
      username: "sarahjohnson",
      image: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
  },
  {
    id: "2",
    title: "Kubernetes for Docker Users",
    excerpt: "Making the transition from Docker to Kubernetes orchestration",
    coverImage: "/placeholder.svg?height=200&width=300",
    publishedAt: "Jan 30, 2024",
    readTime: "12 min read",
    author: {
      name: "Michael Chen",
      username: "michaelchen",
      image: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
  },
  {
    id: "3",
    title: "Docker Security Best Practices",
    excerpt: "Protect your containerized applications with these essential security tips",
    coverImage: "/placeholder.svg?height=200&width=300",
    publishedAt: "Feb 5, 2024",
    readTime: "9 min read",
    author: {
      name: "Alex Rivera",
      username: "alexrivera",
      image: "/placeholder.svg?height=40&width=40",
      initials: "AR",
    },
  },
]

export function RelatedArticles({ currentArticleId }: { currentArticleId: string }) {
  // Filter out the current article if it's in the related articles list
  const filteredArticles = relatedArticles.filter((article) => article.id !== currentArticleId)

  return (
      <div className="grid gap-8 md:grid-cols-3">
        {filteredArticles.map((article) => (
            <div key={article.id} className="space-y-3">
              <Link href={`/article/${article.id}`} className="group">
                <Image
                    src={article.coverImage || "/placeholder.svg"}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="aspect-video rounded-lg object-cover transition-transform group-hover:scale-105"
                />
                <h3 className="mt-3 font-bold leading-snug group-hover:text-gray-700">{article.title}</h3>
                <p className="text-sm text-muted-foreground">{article.excerpt}</p>
              </Link>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={article.author.image} alt={article.author.name} />
                  <AvatarFallback>{article.author.initials}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Link href={`/@${article.author.username}`} className="font-medium hover:underline">
                    {article.author.name}
                  </Link>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
        ))}
      </div>
  )
}

