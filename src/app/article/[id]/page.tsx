import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bookmark, Heart, MessageSquare } from "lucide-react"
import { RelatedArticles } from "@/components/related-articles"
// import { ArticleComments } from "@/components/article-comments"
import { ShareArticle } from "@/components/share-article"

// This would typically come from a database or API
const getArticleData = (id: string) => {
  return {
    id,
    title: "The Art of Building Scalable Web Applications",
    subtitle:
        "Learn the principles and practices that enable you to build web applications that can handle millions of users.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    content: `
      <p>Building scalable web applications is both an art and a science. It requires a deep understanding of system architecture, performance optimization, and user experience design. In this article, we'll explore the key principles and practices that enable you to build web applications that can handle millions of users without sacrificing performance or user experience.

## Understanding Scalability

Scalability refers to a system's ability to handle growing amounts of work by adding resources to the system. In web applications, this means being able to serve more users, process more data, and handle more transactions as your application grows.

There are two main types of scalability:

1. **Vertical Scaling (Scaling Up)**: Adding more power to your existing machine (CPU, RAM, etc.)
2. **Horizontal Scaling (Scaling Out)**: Adding more machines to your pool of resources

Both approaches have their place in a comprehensive scaling strategy, but horizontal scaling is generally more flexible and cost-effective for modern web applications.

## Key Principles of Scalable Architecture

### 1. Statelessness

Stateless applications don't store client session information between requests. This makes it easier to distribute requests across multiple servers, as any server can handle any request without needing access to previous state.

### 2. Caching

Implementing effective caching strategies at various levels (browser, CDN, application, database) can dramatically reduce load times and server load.

### 3. Database Optimization

Your database is often the first bottleneck in scaling. Techniques like indexing, query optimization, sharding, and read replicas can help distribute database load.

### 4. Asynchronous Processing

Moving time-consuming tasks to background processes can prevent blocking the main application thread and improve responsiveness.

### 5. Load Balancing

Distributing incoming traffic across multiple servers ensures no single server becomes overwhelmed.

## Best Practices for Implementation

When implementing these principles, consider the following best practices:

- Start with a modular, service-oriented architecture
- Implement comprehensive monitoring and alerting
- Design for failure - assume components will fail and plan accordingly
- Automate deployment and scaling processes
- Test performance under load regularly

By following these principles and practices, you can build web applications that not only handle current demand but can scale seamlessly as your user base grows.
    `,
    publishedAt: "Feb 26, 2023",
    readTime: "10 min read",
    author: {
      id: 1,
      name: "Michael Brown",
      username: "michaelbrown",
      bio: "Software architect and tech writer with 10+ years of experience building scalable systems",
      image: "/placeholder.svg?height=100&width=100",
      initials: "MB",
      followers: 4200,
    },
    tags: ["Programming", "Web Development", "Architecture", "Performance"],
    likes: 342,
    comments: 28,
    excerpt:
        "Learn the principles and practices that enable you to build web applications that can handle millions of users without sacrificing performance or user experience.",
  }
}

// Generate metadata for the article page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = getArticleData(params.id)

  const ogImage = new URL(
      `/api/og?title=${encodeURIComponent(article.title)}&author=${encodeURIComponent(article.author.name)}`,
      "https://medium-clone.vercel.app",
  ).toString()

  return {
    title: article.title,
    description: article.excerpt || article.subtitle,
    authors: [{ name: article.author.name, url: `https://medium-clone.vercel.app/@${article.author.username}` }],
    keywords: [...article.tags, "article", "blog", "medium"],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt || article.subtitle,
      url: `https://medium-clone.vercel.app/article/${article.id}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: new Date(article.publishedAt).toISOString(),
      authors: [`https://medium-clone.vercel.app/@${article.author.username}`],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || article.subtitle,
      images: [ogImage],
    },
  }
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticleData(params.id)

  return (
      <div className="container max-w-5xl py-10">
        <article className="space-y-8">
          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{article.title}</h1>
            <p className="text-xl text-muted-foreground">{article.subtitle}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={article.author.image} alt={article.author.name} />
                  <AvatarFallback>{article.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/@${article.author.username}`} className="font-medium hover:underline">
                    {article.author.name}
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{article.publishedAt}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShareArticle article={article} />
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-5 w-5" />
                  <span className="sr-only">Save</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <Image
              src={article.coverImage || "/placeholder.svg"}
              alt={article.title}
              width={1200}
              height={600}
              className="rounded-lg object-cover"
              priority
          />

          {/* Article Content */}
          <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
                <Button key={tag} variant="secondary" size="sm" className="rounded-full" asChild>
                  <Link href={`/tag/${tag.toLowerCase().replace(" ", "-")}`}>{tag}</Link>
                </Button>
            ))}
          </div>

          {/* Article Actions */}
          <div className="flex items-center justify-between border-y py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="h-5 w-5" />
                <span>{article.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>{article.comments}</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Bookmark className="mr-2 h-5 w-5" />
              Save
            </Button>
          </div>

          {/* Author Info */}
          <div className="rounded-lg border p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={article.author.image} alt={article.author.name} />
                <AvatarFallback>{article.author.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Link href={`/@${article.author.username}`} className="text-lg font-medium hover:underline">
                    {article.author.name}
                  </Link>
                  <Button className="rounded-full">Follow</Button>
                </div>
                <p className="text-muted-foreground">{article.author.bio}</p>
                <p className="text-sm text-muted-foreground">{article.author.followers.toLocaleString()} followers</p>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Comments ({article.comments})</h2>
            {/*<ArticleComments articleId={article.id} />*/}
          </div>
        </article>

        {/* Related Articles */}
        <Separator className="my-10" />
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">More from Medium</h2>
          <RelatedArticles currentArticleId={article.id} />
        </div>
      </div>
  )
}

