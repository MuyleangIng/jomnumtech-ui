"use client"
import {useFetchProfile} from "@/hook/useFetchProfile";
export default function DashboardPage() {
    const { profile, loading, error } = useFetchProfile()

    if (loading) return <p>Loading profile...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <h2>Welcome, {profile?.username}!</h2>
            <p>Email: {profile?.email}</p>
            <p>Bio: {profile?.bio || "No bio available"}</p>
        </div>
    )
}

