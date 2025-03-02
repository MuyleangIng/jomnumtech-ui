import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    MessageCircle,
    Users,
    MapPin,
    MoreHorizontal,
    Heart,
    MessageSquare,
    Share2,
    Phone,
    Facebook,
    Globe, Bookmark,
} from "lucide-react"

// Types from your existing profile page
interface User {
    id: number
    email: string
    username: string
    slug?: string | null
    profile_image?: string | null
    cover_image?: string | null
    bio?: string | null
    about_me?: string | null
    social_links?: string[]
    contact_number?: string
    location?: string
    total_followers: number
    total_following: number
    credits: number
    total_earned_credits: number
    total_spent_credits: number
}

interface Article {
    id: number
    title: string
    subtitle: string
    content: string
    image_url: string
    bio: string
    cover_image_url: string
    about_me: string
    social_links?: string[]
    contact_number?: string
    location?: string
    is_public: boolean
    category_id: number
    author_id: number
    created_at: string
    views: number
    total_likes: number
    total_comments: number
    total_shares: number
    total_bookmarks: number
    tags: { id: number; name: string }[]
}

// Fetch user data by username
async function getUserByUsername(username: string): Promise<User | null> {
    try {
        const response = await fetch(`https://jomnumtech-api.shinoshike.studio/users/${username}`, {
            method: "GET",
        })
        console.log("response",response)
        if (!response.ok) {
            if (response.status === 404) {
                return null
            }
            throw new Error(`Failed to fetch user: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching user:", error)
        return null
    }
}

// Fetch user's public articles
async function getUserArticles(username: string): Promise<Article[]> {
    try {
        const response = await fetch(`https://jomnumtech-api.shinoshike.studio/articles/user/${username}`, {
            method: "GET",
            redirect: "follow",
            // next: { revalidate: 3600 }, // Revalidate every hour
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching articles:", error)
        return []
    }
}

// Format date for display
function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

// Calculate read time (roughly 200 words per minute)
function calculateReadTime(content: string) {
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)
    return `${readTime} min read`
}

export default async function UserProfilePage({ params }: { params: { username: string } }) {
    const user = await getUserByUsername(params.username)
    // If user not found, show 404 page
    if (!user) {
        notFound()
    }

    // Use username instead of user.id to fetch articles
    const articles = await getUserArticles(params.username)
    // Filter only public articles
    const publicArticles = articles.filter((article) => article.is_public)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cover Image Section */}
            <div className="relative h-48 w-full sm:h-64 md:h-80 overflow-hidden">
                <Image
                    src={user.cover_image || "/placeholder.svg?height=300&width=1200"}
                    alt="Cover"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Profile Info */}
            <div className="container max-w-5xl">
                <div className="relative -mt-[3rem] flex flex-col items-center px-4 sm:flex-row sm:items-end sm:px-0">
                    {/* Profile Picture */}
                    <Avatar className="h-32 w-32 border-4 border-background sm:h-40 sm:w-40">
                        <AvatarImage src={user.profile_image || "/default-avatar.png"} alt={user.username || "User"} />
                        <AvatarFallback>{user.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>

                    {/* Profile Details */}
                    <div className="mt-4 flex flex-1 flex-col items-center space-y-4 sm:ml-6 sm:items-start">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold sm:text-3xl">{user.username || "User"}</h1>
                            <p className="text-muted-foreground">@{user.username || "username"}</p>
                        </div>

                        {/* Follower & Following Counts */}
                        <div className="flex w-full flex-wrap items-center justify-center gap-4 sm:justify-start">
                            <div className="flex items-center gap-4">
                                <div>
                                    <span className="font-bold">{user.total_followers}</span>
                                    <span className="ml-1 text-muted-foreground">Followers</span>
                                </div>
                                <div>
                                    <span className="font-bold">{user.total_following}</span>
                                    <span className="ml-1 text-muted-foreground">Following</span>
                                </div>
                            </div>

                            <div className="text-sm text-muted-foreground">
                                Joined {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                            </div>

                            {/* Message button */}
                            <div className="mt-4 flex gap-2 sm:mt-0 sm:ml-auto">
                                {/*<Button className="rounded-full">*/}
                                {/*    <MessageCircle className="mr-2 h-4 w-4" />*/}
                                {/*    Message*/}
                                {/*</Button>*/}
                                <Button variant="outline" className="rounded-full">
                                    <Users className="mr-2 h-4 w-4" />
                                    Follow
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <MoreHorizontal className="h-5 w-5" />
                                    <span className="sr-only">More options</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 px-4 sm:px-0">
                    <p className="max-w-2xl">{user.bio || "No bio available."}</p>
                </div>

                {/* Profile Tabs */}
                <div className="mt-8">
                    <Tabs defaultValue="posts">
                        <TabsList className="w-full justify-start border-b bg-transparent p-0">
                            <TabsTrigger
                                value="posts"
                                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                            >
                                Articles
                            </TabsTrigger>
                            {/*<TabsTrigger*/}
                            {/*    value="about"*/}
                            {/*    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"*/}
                            {/*>*/}
                            {/*    About*/}
                            {/*</TabsTrigger>*/}
                            <TabsTrigger
                                value="friends"
                                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                            >
                                Friends
                            </TabsTrigger>
                            {/*<TabsTrigger*/}
                            {/*    value="photos"*/}
                            {/*    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"*/}
                            {/*>*/}
                            {/*    Photos*/}
                            {/*</TabsTrigger>*/}
                            {/*<TabsTrigger*/}
                            {/*    value="videos"*/}
                            {/*    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"*/}
                            {/*>*/}
                            {/*    Videos*/}
                            {/*</TabsTrigger>*/}
                        </TabsList>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            {/* Left sidebar - Intro */}
                            <div className="md:col-span-1">
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h2 className="text-xl font-semibold mb-4">Intro</h2>

                                    {user.about_me && (
                                        <div className="mb-4">
                                            <h3 className="text-sm font-medium mb-2">About Me</h3>
                                            <p>{user.about_me}</p>
                                        </div>
                                    )}

                                    {user.location && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                            <span>Lives in {user.location}</span>
                                        </div>
                                    )}

                                    {user.contact_number && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <Phone className="h-5 w-5 text-muted-foreground" />
                                            <span>{user.contact_number}</span>
                                        </div>
                                    )}

                                    {/* Social links */}
                                    {user.social_links && user.social_links.length > 0 && (
                                        <div className="mt-4">
                                            <h3 className="text-sm font-medium mb-2">Social Links</h3>
                                            <div className="space-y-2">
                                                {user.social_links.map((link, index) => (
                                                    <a
                                                        key={index}
                                                        href={link.startsWith("http") ? link : `https://${link}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-blue-600 hover:underline"
                                                    >
                                                        {link.includes("facebook.com") ? (
                                                            <Facebook className="h-4 w-4" />
                                                        ) : (
                                                            <Globe className="h-4 w-4" />
                                                        )}
                                                        <span className="truncate">{link.replace(/^https?:\/\//, "").replace(/^www\./, "")}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Main content area */}
                            <div className="md:col-span-2">
                                <TabsContent value="posts" className="space-y-6">
                                    {publicArticles.length > 0 ? (
                                        publicArticles.map((article) => (
                                            <div
                                                key={article.id}
                                                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                            >
                                                <div className="p-6">
                                                    <div className="flex items-start gap-3 mb-4">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={user.profile_image || "/default-avatar.png"} alt={user.username} />
                                                            <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <div className="font-medium">{user.username}</div>
                                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                        <span>{formatDate(article.created_at)}</span>
                                                                        <span>·</span>
                                                                        <span>{calculateReadTime(article.content)} read</span>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    <Bookmark className="h-4 w-4" />
                                                                    <span className="sr-only">Bookmark</span>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-6">
                                                        <div className="flex-1">
                                                            <Link href={`/article/${article.id}`} className="block group">
                                                                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                                                    {article.title}
                                                                </h2>
                                                                <p className="text-muted-foreground text-lg">{article.subtitle}</p>
                                                            </Link>
                                                            <div className="mt-4 flex items-center gap-2">
                                                                {article.category_id && (
                                                                    <Link
                                                                        href={`/category/${article.category_id}`}
                                                                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-secondary"
                                                                    >
                                                                        Programming
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {article.image_url && (
                                                            <div className="relative hidden sm:block flex-shrink-0 w-[200px] h-[134px] rounded-lg overflow-hidden">
                                                                <Image
                                                                    src={article.image_url || "/placeholder.svg"}
                                                                    alt={article.title}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-white rounded-lg shadow p-8 text-center">
                                            <p className="text-muted-foreground">No public posts available.</p>
                                        </div>
                                    )}
                                </TabsContent>
                                <TabsContent value="about" className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-2xl font-bold mb-4">About {user.username}</h2>

                                    <div className="space-y-6">
                                        {user.about_me ? (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                                                <p>{user.about_me}</p>
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground">No additional information available.</p>
                                        )}

                                        {user.location && (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">Location</h3>
                                                <p>{user.location}</p>
                                            </div>
                                        )}

                                        {user.social_links && user.social_links.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">Social Media</h3>
                                                <ul className="space-y-2">
                                                    {user.social_links.map((link, index) => (
                                                        <li key={index}>
                                                            <a
                                                                href={link.startsWith("http") ? link : `https://${link}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                {link.replace(/^https?:\/\//, "").replace(/^www\./, "")}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="friends" className="bg-white rounded-lg shadow p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-2xl font-bold">Friends</h2>
                                        <span className="text-muted-foreground">{user.total_followers} followers</span>
                                    </div>

                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground">Friend list is not available in the public profile view.</p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="photos" className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-2xl font-bold mb-4">Photos</h2>

                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground">Photo gallery is not available in the public profile view.</p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="videos" className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-2xl font-bold mb-4">Videos</h2>

                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground">Video gallery is not available in the public profile view.</p>
                                    </div>
                                </TabsContent>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

