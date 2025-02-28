"use client"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Settings, Twitter } from "lucide-react"
import {useAuth} from "@/components/auth/AuthContext";
import {redirect} from "next/navigation";

export interface User {
  id: number;
  email: string;
  username: string;
  slug?: string | null; // Nullable in your response
  profile_image?: string | null;
  total_followers: number;
  total_following: number;
  credits: number;
  total_earned_credits: number;
  total_spent_credits: number;
}

export default function ProfilePage() {
  const { user } = useAuth()
  console.log(user)
  if (!user) {
    redirect("/")
  }
  // In a real app, you would fetch the user profile data
  const profile = {
    name: "Michael Brown",
    username: "michaelbrown",
    bio: "Software architect and tech writer with 10+ years of experience building scalable systems",
    image: "/placeholder.svg?height=150&width=150",
    coverImage: "/placeholder.svg?height=300&width=1200",
    initials: "MB",
    followers: 4200,
    following: 350,
    twitter: "michaelbrown",
    joinedDate: "Jan 2020",
  }

  // In a real app, you would fetch the user's articles
  const articles = [
    {
      id: "1",
      title: "The Art of Building Scalable Web Applications",
      excerpt:
        "Learn the principles and practices that enable you to build web applications that can handle millions of users.",
      publishedAt: "Feb 26, 2023",
      readTime: "10 min read",
    },
    {
      id: "2",
      title: "Microservices Architecture: Patterns and Best Practices",
      excerpt: "A comprehensive guide to designing, implementing, and maintaining microservices architecture.",
      publishedAt: "Jan 15, 2023",
      readTime: "12 min read",
    },
    {
      id: "3",
      title: "Performance Optimization Techniques for Modern Web Apps",
      excerpt:
        "Practical strategies to improve the performance of your web applications and deliver a better user experience.",
      publishedAt: "Dec 10, 2022",
      readTime: "8 min read",
    },
  ]

  return (
    <div>
      {/* Cover Image */}
      <div className="relative h-48 w-full sm:h-64 md:h-80">
        <Image src={user.profile_image || "/placeholder.svg"} alt="Cover" fill className="object-cover" priority />
      </div>

      {/* Profile Info */}
      <div className="container max-w-5xl">
        <div className="relative -mt-20 flex flex-col items-center px-4 sm:flex-row sm:items-end sm:px-0">
          <Avatar className="h-32 w-32 border-4 border-background sm:h-40 sm:w-40">
            <AvatarImage src={user.profile_image} alt={profile.name} />
            <AvatarFallback>{profile.initials}</AvatarFallback>
          </Avatar>

          <div className="mt-4 flex flex-1 flex-col items-center space-y-4 sm:ml-6 sm:items-start">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold sm:text-3xl">{user.username || profile.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>

            <div className="flex w-full flex-wrap items-center justify-center gap-4 sm:justify-start">
              <div className="flex items-center gap-4">
                <div>
                  <span className="font-bold">{profile.followers.toLocaleString()}</span>
                  <span className="ml-1 text-muted-foreground">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{profile.following.toLocaleString()}</span>
                  <span className="ml-1 text-muted-foreground">Following</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Twitter className="h-4 w-4" />
                <Link
                  href={`https://twitter.com/${profile.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  @{profile.twitter}
                </Link>
              </div>

              <div className="text-sm text-muted-foreground">Joined {profile.joinedDate}</div>
            </div>
          </div>

          <div className="mt-4 flex gap-2 sm:mt-0">
            <Button variant="outline" size="sm" className="rounded-full">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 px-4 sm:px-0">
          <p className="max-w-2xl">{profile.bio}</p>
        </div>

        {/* Profile Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="articles">
            <TabsList className="w-full justify-start border-b bg-transparent p-0">
              <TabsTrigger
                value="articles"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Articles
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                About
              </TabsTrigger>
            </TabsList>
            <TabsContent value="articles" className="mt-6 space-y-8">
              {articles.map((article) => (
                <article key={article.id} className="space-y-2">
                  <Link href={`/article/${article.id}`}>
                    <h2 className="text-xl font-bold hover:underline">{article.title}</h2>
                  </Link>
                  <p className="text-muted-foreground">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{article.publishedAt}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </article>
              ))}
            </TabsContent>
            <TabsContent value="about" className="mt-6">
              <div className="prose max-w-none dark:prose-invert">
                <h2>About Michael Brown</h2>
                <p>
                  Michael is a software architect and tech writer with over 10 years of experience building scalable
                  systems. He specializes in distributed systems, cloud architecture, and performance optimization.
                </p>
                <p>
                  Previously, he worked at several tech companies including Amazon and Microsoft, where he led teams
                  building high-performance web applications and services.
                </p>
                <p>
                  When not writing code or articles, Michael enjoys hiking, photography, and experimenting with new
                  programming languages and frameworks.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

