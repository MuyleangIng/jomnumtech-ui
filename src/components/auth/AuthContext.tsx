"use client"
import { createContext, useContext, useState, useEffect } from "react"

export default interface User {
    id: number
    email: string
    username: string
    profile_image?: string
    bio?: string
    about_me: string
    cover_image?: string
    created_at?: Date
    updated_at?: Date
    credits?: number
    total_earned_credits?: number
    total_followers?: number
    contact_number?: string
    location?: string
    total_following?: number
    social_links?: string[]
}

interface AuthTokens {
    access_token: string
    token_type: string
    refresh_token: string
}

interface AuthContextType {
    user: User | null
    tokens: AuthTokens | null
    setAuthState: (user: User | null, tokens: AuthTokens | null) => void
    logout: () => void
    refreshAccessToken: () => Promise<void>
    updateUser: (updatedUser: Partial<User>) => void

}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [tokens, setTokens] = useState<AuthTokens | null>(null)
    const [isLoaded, setIsLoaded] = useState(false) // ✅ Ensures state loads before rendering

    useEffect(() => {
        if (typeof window === "undefined") return // ✅ Ensure code runs only on the client

        const storedUser = localStorage.getItem("user")
        const storedTokens = localStorage.getItem("tokens")

        if (storedUser && storedTokens) {
            setUser(JSON.parse(storedUser))
            setTokens(JSON.parse(storedTokens))
        }
        setIsLoaded(true) // ✅ Ensure the component only renders when data is ready
    }, [])

    const setAuthState = (newUser: User | null, newTokens: AuthTokens | null) => {
        setUser(newUser)
        setTokens(newTokens)

        if (newUser && newTokens) {
            localStorage.setItem("user", JSON.stringify(newUser))
            localStorage.setItem("tokens", JSON.stringify(newTokens))
        }
    }

    useEffect(() => {
        // ✅ Auto refresh token every 55s
        const refreshInterval = setInterval(() => {
            refreshAccessToken();
        }, 55 * 1000); // Refresh 5s before expiry

        return () => clearInterval(refreshInterval);
    }, []);

    const refreshAccessToken = async () => {
        try {
            console.log("Fetching new access token...");

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/refresh`, {
                method: "POST",
                credentials: "include", // ✅ Send cookies with the request
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Refresh Token Response:", data);

            if (response.ok) {
                setTokens({ access_token: data.access_token });
                localStorage.setItem("tokens", JSON.stringify({ access_token: data.access_token }));
            } else {
                console.error("Failed to refresh token:", data);
                logout();
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            logout();
        }
    };


    const updateUser = (updatedUser: Partial<User>) => {
        setUser((prevUser) => {
            if (!prevUser) return null
            const newUser = { ...prevUser, ...updatedUser }
            return newUser
        })
    }
    const clearAllCookies = () => {
        document.cookie.split(";").forEach((cookie) => {
            document.cookie = cookie
                .replace(/^ +/, "") // Trim spaces
                .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; HttpOnly;");
        });
    };
    const logout = async () => {
        try {
            // Call the backend to clear HTTP-only cookies
            await fetch( `${process.env.NEXT_PUBLIC_BASE_API_URL}/logout`, { method: "POST", credentials: "include" });
        } catch (error) {
            console.error("Error logging out:", error);
        }

        // Clear local storage and cookies
        setUser(null);
        setTokens(null);
        localStorage.clear();
        clearAllCookies();

        // Redirect to login page
        window.location.href = "/";
    };



    return (
        <AuthContext.Provider value={{ user, tokens, setAuthState,updateUser , logout, refreshAccessToken }}>
            {isLoaded ? children : null} {/* ✅ Ensures it only renders when ready */}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

