// Helper functions for API calls

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

