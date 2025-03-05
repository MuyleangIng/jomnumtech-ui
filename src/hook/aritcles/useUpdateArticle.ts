import {refreshAccessToken} from "@/hook/security/auth";
import {Article} from "@/types/article";

export async function useUpdateArticle(id: number, article: Partial<Article>, token: string): Promise<Article | null> {
    if (!token) {
        console.error("No authentication token provided");
        return null;
    }

    try {
        console.log(`Updating article with ID: ${id}`);

        let response = await fetch(`https://jomnumtech-api.shinoshike.studio/articles/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(article),
        });

        console.log("Response:", response);

        // ✅ Check if token expired (401 Unauthorized)
        if (response.status === 401) {
            console.warn("Access token expired. Trying to refresh...");

            const newToken = await refreshAccessToken();
            if (!newToken) {
                console.error("Failed to refresh token. User needs to log in again.");
                return null;
            }

            // 🔄 Retry request with new token
            response = await fetch(`https://jomnumtech-api.shinoshike.studio/articles/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${newToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(article),
            });
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error(`Error updating article: ${errorData.message || response.statusText}`);
            return null;
        }

        const updatedArticle = await response.json();
        console.log("Updated article:", updatedArticle);
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article:", error);
        return null;
    }
}
