import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TrendingArticles() {
  const trendingArticles = [
    {
      id: 1,
      title: "The Future of AI in Content Creation",
      author: {
        name: "Alex Johnson",
        image: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      date: "Feb 25",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "How I Built a Successful SaaS Business in 12 Months",
      author: {
        name: "Sarah Miller",
        image: "/placeholder.svg?height=40&width=40",
        initials: "SM",
      },
      date: "Feb 23",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "The Psychology of Productivity: Work Less, Achieve More",
      author: {
        name: "David Chen",
        image: "/placeholder.svg?height=40&width=40",
        initials: "DC",
      },
      date: "Feb 21",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "10 Design Principles Every Developer Should Know",
      author: {
        name: "Emma Wilson",
        image: "/placeholder.svg?height=40&width=40",
        initials: "EW",
      },
      date: "Feb 20",
      readTime: "7 min read",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        <h2 className="text-xl font-bold">Trending on JomNum Blog</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trendingArticles.map((article, index) => (
          <Link key={article.id} href={`/article/${article.id}`} className="group space-y-3">
            <div className="flex items-start gap-4">
              <div className="text-3xl font-bold text-muted-foreground/30">{String(index + 1).padStart(2, "0")}</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={article.author.image} alt={article.author.name} />
                    <AvatarFallback>{article.author.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{article.author.name}</span>
                </div>
                <h3 className="font-bold group-hover:underline">{article.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

