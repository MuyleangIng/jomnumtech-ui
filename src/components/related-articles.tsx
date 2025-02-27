import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RelatedArticles({ currentArticleId }: { currentArticleId: string }) {
  // In a real app, you would fetch related articles based on the current article
  const articles = [
    {
      id: "101",
      title: "Microservices vs Monoliths: Choosing the Right Architecture",
      excerpt:
        "A comprehensive comparison of microservices and monolithic architectures to help you make the right choice for your project.",
      image: "/placeholder.svg?height=150&width=250",
      author: {
        name: "Jennifer Park",
        image: "/placeholder.svg?height=40&width=40",
        initials: "JP",
      },
      date: "Mar 2",
      readTime: "8 min read",
    },
    {
      id: "102",
      title: "Optimizing Database Performance for High-Traffic Applications",
      excerpt:
        "Learn advanced techniques for optimizing your database to handle high traffic and large datasets efficiently.",
      image: "/placeholder.svg?height=150&width=250",
      author: {
        name: "Marcus Johnson",
        image: "/placeholder.svg?height=40&width=40",
        initials: "MJ",
      },
      date: "Feb 28",
      readTime: "11 min read",
    },
    {
      id: "103",
      title: "The Role of Caching in Modern Web Applications",
      excerpt:
        "Explore different caching strategies and how they can dramatically improve the performance of your web applications.",
      image: "/placeholder.svg?height=150&width=250",
      author: {
        name: "Aisha Patel",
        image: "/placeholder.svg?height=40&width=40",
        initials: "AP",
      },
      date: "Feb 25",
      readTime: "9 min read",
    },
  ].filter((article) => article.id !== currentArticleId)

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link key={article.id} href={`/article/${article.id}`} className="group">
          <div className="space-y-3">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              width={250}
              height={150}
              className="rounded-lg object-cover"
            />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={article.author.image} alt={article.author.name} />
                  <AvatarFallback>{article.author.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{article.author.name}</span>
              </div>
              <h3 className="font-bold group-hover:underline">{article.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
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
  )
}

