import { toast } from "@/components/ui/use-toast"

const API_BASE_URL = "https://jomnumtech-api.shinoshike.studio"

interface ApiResponse<T> {
  data?: T
  error?: string
}

async function fetchWithAuth<T>(url: string, method: string, body?: any, token?: string): Promise<ApiResponse<T>> {
  if (!token) {
    toast({
      title: "Authentication Required",
      description: "Please log in to perform this action",
      variant: "destructive",
    })
    return { error: "Authentication required" }
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || "An error occurred")
    }

    return { data }
  } catch (error) {
    console.error("API Error:", error)
    toast({
      title: "Error",
      description: error.message || "An unexpected error occurred",
      variant: "destructive",
    })
    return { error: error.message }
  }
}

export const api = {
  // Check if user has liked/bookmarked
  checkInteractions: async (articleId: number, token: string) =>
      fetchWithAuth<{ liked: boolean; bookmarked: boolean }>(`/articles/${articleId}/interactions`, "GET", null, token),

  // Like/Unlike
  likeArticle: (articleId: number, token: string) =>
      fetchWithAuth<{ message: string }>(`/articles/${articleId}/like`, "POST", null, token),

  unlikeArticle: (articleId: number, token: string) =>
      fetchWithAuth<{ message: string }>(`/articles/${articleId}/unlike`, "POST", null, token),

  // Bookmark/Unbookmark
  bookmarkArticle: (articleId: number, token: string) =>
      fetchWithAuth<{ message: string }>(`/articles/${articleId}/bookmark`, "POST", null, token),

  unbookmarkArticle: (articleId: number, token: string) =>
      fetchWithAuth<{ message: string }>(`/articles/${articleId}/unbookmark`, "POST", null, token),

  // Comments
  getComments: (articleId: number, token: string) =>
      fetchWithAuth<Array<{ id: number; content: string; author: string; created_at: string; replies: any[] }>>(
          `/articles/${articleId}/comments`,
          "GET",
          null,
          token,
      ),
  addComment: (articleId: number, content: string, token: string) =>
      fetchWithAuth<Comment>(`/articles/${articleId}/comments`, "POST", { content }, token),

  updateComment: (commentId: number, content: string, token: string) =>
      fetchWithAuth<Comment>(`/comments/${commentId}`, "PUT", { content }, token),

  deleteComment: (commentId: number, token: string) =>
      fetchWithAuth<void>(`/comments/${commentId}`, "DELETE", null, token),

  replyToComment: (commentId: number, content: string, token: string) =>
      fetchWithAuth<Comment>(`/comments/${commentId}/reply`, "POST", { content }, token),
}

export interface Comment {
  id: number
  content: string
  parent_id: number | null
  article_id: number
  author: string
  created_at: string
  replies: Comment[]
}

