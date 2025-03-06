import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, BookOpen, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// This would come from your database
const topics = {
    javascript: {
        name: "JavaScript",
        description: "Modern JavaScript tutorials and best practices",
        followers: "234K",
        posts: 1205,
        relatedTopics: [
            "TypeScript",
            "React",
            "Node.js",
            "Vue.js",
            "Angular",
            "Web Development",
            "Frontend",
            "Programming",
        ],
    },
    typescript: {
        name: "TypeScript",
        description: "Type-safe JavaScript development",
        followers: "156K",
        posts: 834,
        relatedTopics: ["JavaScript", "React", "Node.js", "Angular", "Programming"],
    },
    // Add more topics...
}

interface Post {
    id: string
    title: string
    excerpt: string
    author: {
        name: string
        image: string
    }
    readTime: string
    date: string
    image?: string
}

// Mock data - replace with actual data fetching
const getPosts = (topic: string): Post[] => {
    return [
        {
            id: "1",
            title: "Understanding JavaScript Promises",
            excerpt: "A deep dive into asynchronous programming with Promises",
            author: {
                name: "John Doe",
                image: "/placeholder.svg?height=40&width=40",
            },
            readTime: "5 min read",
            date: "Mar 6, 2025",
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: "1",
            title: "Understanding JavaScript Promises",
            excerpt: "A deep dive into asynchronous programming with Promises",
            author: {
                name: "John Doe",
                image: "/placeholder.svg?height=40&width=40",
            },
            readTime: "5 min read",
            date: "Mar 6, 2025",
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: "1",
            title: "Understanding JavaScript Promises",
            excerpt: "A deep dive into asynchronous programming with Promises",
            author: {
                name: "John Doe",
                image: "/placeholder.svg?height=40&width=40",
            },
            readTime: "5 min read",
            date: "Mar 6, 2025",
            image: "/placeholder.svg?height=200&width=300",
        },
        // Add more posts...
    ]
}

interface RecommendedList {
    id: string
    title: string
    author: {
        name: string
        image: string
    }
    storyCount: number
    coverImage: string
}

// Mock data - replace with actual data fetching
const getRecommendedLists = (topic: string): RecommendedList[] => {
    return [
        {
            id: "1",
            title: "JavaScript Fundamentals",
            author: {
                name: "Sarah Smith",
                image: "/placeholder.svg?height=40&width=40",
            },
            storyCount: 12,
            coverImage: "/placeholder.svg?height=200&width=300",
        },
        // Add more lists...
    ]
}

export default function TopicPage({ params }: { params: { slug: string } }) {
    const topic = topics[params.slug as keyof typeof topics]

    if (!topic) {
        notFound()
    }

    const posts = getPosts(params.slug)
    const recommendedLists = getRecommendedLists(params.slug)

    return (
        <main className="min-h-screen bg-background">
            {/* Topic Header */}
            <div className="border-b">
                <div className="container max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <Link href="/" className="hover:text-foreground">
                            Topics
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground">{topic.name}</span>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{topic.name}</h1>
                            <p className="text-muted-foreground mb-4">{topic.description}</p>
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{topic.followers} Followers</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{topic.posts} Posts</span>
                                </div>
                            </div>
                        </div>
                        <Button>Follow</Button>
                    </div>
                </div>
            </div>

            {/* Related Topics */}
            <div className="border-b">
                <div className="container max-w-7xl mx-auto px-4">
                    <ScrollArea className="w-full whitespace-nowrap">
                        <div className="flex space-x-2 py-4">
                            {topic.relatedTopics.map((relatedTopic) => (
                                <Button key={relatedTopic} variant="secondary" className="rounded-full" asChild>
                                    <Link href={`/topic/${relatedTopic.toLowerCase()}`}>{relatedTopic}</Link>
                                </Button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>

            {/* Content */}
            <div className="container max-w-7xl mx-auto px-4 py-8">
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <h2 className="text-2xl font-bold">Latest Posts</h2>
                        <div className="grid gap-8">
                            {posts.map((post) => (
                                <article key={post.id} className="group">
                                    <Link href={`/post/${post.id}`}>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            {post.image && (
                                                <div className="relative aspect-video md:aspect-square overflow-hidden rounded-lg">
                                                    <Image
                                                        src={post.image || "/placeholder.svg"}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform group-hover:scale-105"
                                                    />
                                                </div>
                                            )}
                                            <div className={post.image ? "md:col-span-2" : "md:col-span-3"}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Image
                                                        src={post.author.image || "/placeholder.svg"}
                                                        alt={post.author.name}
                                                        width={24}
                                                        height={24}
                                                        className="rounded-full"
                                                    />
                                                    <span className="text-sm font-medium">{post.author.name}</span>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary">{post.title}</h3>
                                                <p className="text-muted-foreground mb-2">{post.excerpt}</p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{post.readTime}</span>
                                                    <span>•</span>
                                                    <span>{post.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Recommended Lists</h2>
                            <div className="space-y-4">
                                {recommendedLists.map((list) => (
                                    <Link key={list.id} href={`/list/${list.id}`} className="block group">
                                        <div className="relative aspect-video overflow-hidden rounded-lg mb-2">
                                            <Image
                                                src={list.coverImage || "/placeholder.svg"}
                                                alt={list.title}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="font-medium group-hover:text-primary mb-1">{list.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Image
                                                src={list.author.image || "/placeholder.svg"}
                                                alt={list.author.name}
                                                width={20}
                                                height={20}
                                                className="rounded-full"
                                            />
                                            <span>{list.author.name}</span>
                                            <span>•</span>
                                            <span>{list.storyCount} stories</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

