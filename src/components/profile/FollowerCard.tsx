
    import Image from "next/image"
    import Link from "next/link"
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

    interface FollowerCardProps {
    id: number
    username: string
    slug: string
    profile_image: string | null
}

    export function FollowerCard({ id, username, slug, profile_image }: FollowerCardProps) {
    return (
    <Link href={`/${slug}`} className="block">
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <Avatar className="h-12 w-12">
            <AvatarImage src={profile_image || "/default-avatar.png"} alt={username} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
            <p className="font-medium">{username}</p>
            <p className="text-sm text-muted-foreground">@{slug}</p>
        </div>
    </div>
</Link>
)
}