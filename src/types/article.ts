export interface Article {
    slug: string
    id: number
    title: string
    subtitle: string
    content: string
    image_url: string
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