// Helper functions for API calls

import {Article} from "@/app/profile/page";
import User from "@/types/user"
export async function createArticle(article: any, token: string) {
  const response = await fetch("/api/articles", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  })

  if (!response.ok) {
    throw new Error(`Failed to create article: ${response.statusText}`)
  }

  return response.json()
}

export async function uploadImage(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/articles/upload-image", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.statusText}`)
  }

  return response.json()
}

export async function getArticle(id: string, token?: string) {
  const headers: HeadersInit = {}
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`/api/articles/${id}`, {
    headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.statusText}`)
  }

  return response.json()
}

export async function updateArticle(id: string, article: any, token: string) {
  const response = await fetch(`/api/articles/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  })

  if (!response.ok) {
    throw new Error(`Failed to update article: ${response.statusText}`)
  }

  return response.json()
}

export async function deleteArticle(id: string, token: string) {
  const response = await fetch(`/api/articles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok && response.status !== 204) {
    throw new Error(`Failed to delete article: ${response.statusText}`)
  }

  return true
}
/**
 * Fetches articles authored by the current authenticated user
 * @param token The authentication token
 * @returns Array of user's articles or empty array if error
 */
export async function fetchMyArticles(token: string): Promise<Article[]> {
  if (!token) {
    console.error("No authentication token provided");
    return [];
  }

  try {
    console.log(`Fetching articles with token: ${token}`);

    const response = await fetch("http://localhost:8000/articles/my", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Use dynamic token
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Error fetching articles: ${errorData.message || response.statusText}`);
      return [];
    }

    const articles = await response.json();
    console.log("Fetched articles:", articles);

    if (!Array.isArray(articles)) {
      console.warn("API did not return an array of articles:", articles);
      return [];
    }

    return articles;
  } catch (error) {
    console.error("Error fetching user articles:", error);
    return [];
  }
}

// Update Profile

export async function updateUser(token: string, userData: Partial<User>): Promise<User | null> {
  if (!token) {
    console.error("No authentication token provided")
    return null
  }

  try {
    console.log(`Updating user with token: ${token}`)

    const response = await fetch("http://localhost:8000/auth/profile", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    console.log("Response:", response)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error(`Error updating user: ${errorData.message || response.statusText}`)
      return null
    }

    const updatedUser = await response.json()
    console.log("Updated user:", updatedUser)

    if (!updatedUser || typeof updatedUser !== "object") {
      console.warn("API did not return a valid user object:", updatedUser)
      return null
    }

    return updatedUser
  } catch (error) {
    console.error("Error updating user:", error)
    return null
  }
}


