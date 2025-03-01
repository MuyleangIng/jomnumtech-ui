export default interface User {
    id: number
    email: string
    username: string
    profile_image?: string
    bio?: string
    about_me?: string
    cover_image?: string
    created_at?: Date
    updated_at?: Date
    credits?: number
    total_earned_credits?: number
    total_spent_credits?: number
    total_followers?: number
    total_following?: number
    contact_number?: string
    location?: string
    social_links?: string[]
    slug?: string
}

