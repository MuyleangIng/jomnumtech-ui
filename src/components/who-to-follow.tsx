import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function WhoToFollow() {
  const users = [
    {
      id: 1,
      name: "Tech Insights",
      username: "techinsights",
      image: "/placeholder.svg?height=40&width=40",
      initials: "TI",
      bio: "Latest tech news and analysis",
    },
    {
      id: 2,
      name: "Startup Chronicles",
      username: "startupchronicles",
      image: "/placeholder.svg?height=40&width=40",
      initials: "SC",
      bio: "Stories from the startup world",
    },
    {
      id: 3,
      name: "Design Matters",
      username: "designmatters",
      image: "/placeholder.svg?height=40&width=40",
      initials: "DM",
      bio: "UX/UI design insights and trends",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Who to follow</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/@${user.username}`} className="font-medium hover:underline">
                  {user.name}
                </Link>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">
              Follow
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="w-full" asChild>
        <Link href="/discover">See more suggestions</Link>
      </Button>
    </div>
  )
}

