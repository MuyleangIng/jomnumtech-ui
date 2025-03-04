// import Link from "next/link"
// import { TrendingUp } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
//
// export function TrendingArticles() {
//   const trendingArticles = [
//     {
//       id: 1,
//       title: "The Future of AI in Content Creation",
//       author: {
//         name: "Alex Johnson",
//         image: "/placeholder.svg?height=40&width=40",
//         initials: "AJ",
//       },
//       date: "Feb 25",
//       readTime: "5 min read",
//     },
//     {
//       id: 2,
//       title: "How I Built a Successful SaaS Business in 12 Months",
//       author: {
//         name: "Sarah Miller",
//         image: "/placeholder.svg?height=40&width=40",
//         initials: "SM",
//       },
//       date: "Feb 23",
//       readTime: "8 min read",
//     },
//     {
//       id: 3,
//       title: "The Psychology of Productivity: Work Less, Achieve More",
//       author: {
//         name: "David Chen",
//         image: "/placeholder.svg?height=40&width=40",
//         initials: "DC",
//       },
//       date: "Feb 21",
//       readTime: "6 min read",
//     },
//     {
//       id: 4,
//       title: "10 Design Principles Every Developer Should Know",
//       author: {
//         name: "Emma Wilson",
//         image: "/placeholder.svg?height=40&width=40",
//         initials: "EW",
//       },
//       date: "Feb 20",
//       readTime: "7 min read",
//     },
//   ]
//
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-2">
//         <TrendingUp className="h-5 w-5" />
//         <h2 className="text-xl font-bold">Trending on JomNum Blog</h2>
//       </div>
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {trendingArticles.map((article, index) => (
//           <Link key={article.id} href={`/article/${article.id}`} className="group space-y-3">
//             <div className="flex items-start gap-4">
//               <div className="text-3xl font-bold text-muted-foreground/30">{String(index + 1).padStart(2, "0")}</div>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <Avatar className="h-6 w-6">
//                     <AvatarImage src={article.author.image} alt={article.author.name} />
//                     <AvatarFallback>{article.author.initials}</AvatarFallback>
//                   </Avatar>
//                   <span className="text-sm font-medium">{article.author.name}</span>
//                 </div>
//                 <h3 className="font-bold group-hover:underline">{article.title}</h3>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <span>{article.date}</span>
//                   <span>·</span>
//                   <span>{article.readTime}</span>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }
//
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export function TrendingArticles() {
  const [trendingArticles, setTrendingArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/`)
        const data = await response.json()

        // ✅ Sort articles based on views, likes, and comments (descending order)
        const sortedArticles = data.sort(
            (a: any, b: any) =>
                b.views + b.total_likes + b.total_comments - (a.views + a.total_likes + a.total_comments)
        )

        setTrendingArticles(sortedArticles.slice(0, 6)) // Show only top 6 trending articles
      } catch (error) {
        console.error("Failed to fetch trending articles:", error)
      } finally {
        setIsLoading(false) // ✅ Stop loading when data is fetched
      }
    }

    fetchArticles()
  }, [])

  return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <h2 className="text-xl font-bold">Trending on JomNum Blog</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
              ? // ✅ Show Skeleton Loading UI when fetching
              [...Array(6)].map((_, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
              ))
              : // ✅ Show actual articles when loaded
              trendingArticles.length > 0 ? (
                  trendingArticles.map((article, index) => (
                      <Link key={article.id} href={`/article/${article.slug}`} className="group space-y-3">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl font-bold text-muted-foreground/30">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={article.profile_image || "/placeholder.svg?height=40&width=40"} alt={article.username || "Author"} />
                                <AvatarFallback>{article.username ? article.username.charAt(0).toUpperCase() : "?"}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{article.username || "Unknown Author"}</span>
                            </div>
                            <h3 className="font-bold group-hover:underline">{article.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{new Date(article.created_at).toLocaleDateString()}</span>
                              <span>·</span>
                              <span>{article.views} views</span>
                              <span>·</span>
                              <span>{article.total_likes} likes</span>
                              <span>·</span>
                              <span>{article.total_comments} comments</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                  ))
              ) : (
                  <p className="text-muted-foreground">No trending articles found</p>
              )}
        </div>
      </div>
  )
}
