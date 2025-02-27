import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

export function FeaturedArticles() {
  const articles = [
    {
      id: 1,
      title: "The Art of Building Scalable Web Applications",
      excerpt:
        "Learn the principles and practices that enable you to build web applications that can handle millions of users.",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Michael Brown",
        image: "/placeholder.svg?height=40&width=40",
        initials: "MB",
      },
      date: "Feb 26",
      readTime: "10 min read",
      category: "Programming",
    },
    {
      id: 2,
      title: "Why Remote Work is Here to Stay",
      excerpt:
        "The pandemic accelerated remote work adoption, but there are deeper reasons why it's becoming a permanent fixture in our work culture.",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Jessica Lee",
        image: "/placeholder.svg?height=40&width=40",
        initials: "JL",
      },
      date: "Feb 24",
      readTime: "7 min read",
      category: "Work",
    },
    {
      id: 3,
      title: "The Future of Sustainable Technology",
      excerpt:
        "How tech companies are innovating to reduce their environmental impact and build a more sustainable future.",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Robert Kim",
        image: "/placeholder.svg?height=40&width=40",
        initials: "RK",
      },
      date: "Feb 22",
      readTime: "8 min read",
      category: "Technology",
    },
    {
      id: 4,
      title: "Mastering TypeScript: Advanced Patterns",
      excerpt:
        "Take your TypeScript skills to the next level with these advanced patterns and techniques used by experts.",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Sophia Garcia",
        image: "/placeholder.svg?height=40&width=40",
        initials: "SG",
      },
      date: "Feb 20",
      readTime: "12 min read",
      category: "Programming",
    },
    {
      id: 5,
      title: "The Psychology of User Experience Design",
      excerpt:
        "Understanding how human psychology influences user experience design and how to leverage it to create better products.",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Daniel Park",
        image: "/placeholder.svg?height=40&width=40",
        initials: "DP",
      },
      date: "Feb 18",
      readTime: "9 min read",
      category: "Design",
    },
  ]

  return (
    <div className="space-y-10">
      {articles.map((article) => (
        <article key={article.id} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={article.author.image} alt={article.author.name} />
                <AvatarFallback>{article.author.initials}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{article.author.name}</span>
            </div>
            <Link href={`/article/${article.id}`}>
              <h2 className="text-xl font-bold hover:underline md:text-2xl">{article.title}</h2>
              <p className="mt-2 text-muted-foreground">{article.excerpt}</p>
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
                <span>·</span>
                <Button variant="secondary" size="sm" className="rounded-full text-xs">
                  {article.category}
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
                <span className="sr-only">Save article</span>
              </Button>
            </div>
          </div>
          <div className="order-first md:order-last">
            <Link href={`/article/${article.id}`}>
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}

