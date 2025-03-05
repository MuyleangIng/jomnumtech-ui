export async function refreshAccessToken(): Promise<string | null> {
    try {
        console.log("Refreshing access token...");

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/refresh`, {
            method: "POST",
            credentials: "include", // ✅ Sends the refresh token from cookies
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            console.error("Failed to refresh access token:", response.statusText);
            return null; // ❌ Refresh failed, user should log in again
        }

        const data = await response.json();
        console.log("New access token:", data);

        if (!data.access_token) {
            console.error("No access token returned from refresh endpoint.");
            return null;
        }

        // ✅ Store the new access token
        localStorage.setItem("tokens", JSON.stringify({ access_token: data.access_token }));

        return data.access_token;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return null;
    }
}
