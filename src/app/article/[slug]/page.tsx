// "use client"
// import { MarkdownArticleViewer } from "@/components/markdown-article-viewer";
// import { notFound } from "next/navigation";
//
// const getArticleData = async (slug: string) => {
//   try {
//     const response = await fetch(`https://jomnumtech-api.shinoshike.studio/articles/slug/${slug}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       cache: "no-store", // Prevents caching issues
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//
//     const article = await response.json();
//
//     return {
//       id: article.id,
//       slug: article.slug,
//       title: article.title,
//       subtitle: article.subtitle || "",
//       content: article.content,
//       image_url: article.image_url || "",
//       username: article.username || "",
//       is_public: article.is_public,
//       category_id: article.category_id,
//       author_id: article.author_id,
//       created_at: article.created_at,
//       views: article.views || 0,
//       total_likes: article.total_likes || 0,
//       total_comments: article.total_comments || 0,
//       total_shares: article.total_shares || 0,
//       total_bookmarks: article.total_bookmarks || 0,
//       tags: article.tags || [],
//     };
//   } catch (error) {
//     console.error("Error fetching article data:", error);
//     return null;
//   }
// };
//
// const getAuthorData = async (username: string) => {
//   try {
//     const response = await fetch(`https://jomnumtech-api.shinoshike.studio/users/${username}`, {
//       method: "GET",
//       redirect: "follow",
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//
//     const result = await response.json();
//     return {
//       id: result.id,
//       name: result.username,
//       username: result.username,
//       bio: result.bio || result.about_me || "No bio available",
//       image: result.profile_image || "/placeholder.svg?height=100&width=100",
//       initials: result.username.substring(0, 2).toUpperCase(),
//     };
//   } catch (error) {
//     console.error("Error fetching author data:", error);
//     return null;
//   }
// };
//
// export default async function ArticlePage({ params }: { params: { slug: string } }) {
//   const { slug } = await params; // Unwrap the Promise (new Next.js requirement)
//
//   const article = await getArticleData(slug);
//   if (!article) {
//     notFound();
//   }
//
//   const author = await getAuthorData(article.username);
//
//   return <MarkdownArticleViewer article={article} author={author} />;
// }

import { MarkdownArticleViewer } from "@/components/markdown-article-viewer"
import { notFound } from "next/navigation"
import { ErrorMessage } from "@/components/error/error-message";

const getArticleData = async (slug: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/articles/slug/${slug}`, {
      method: "GET",
      headers: headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const article = await response.json()

    return {
      id: article.id,
      slug: article.slug, // Ensure slug is stored
      title: article.title,
      subtitle: article.subtitle || "",
      content: article.content,
      image_url: article.image_url || "",
      username: article.username || "",
      is_public: article.is_public,
      category_id: article.category_id,
      author_id: article.author_id,
      created_at: article.created_at,
      views: article.views || 0,
      total_likes: article.total_likes || 0,
      total_comments: article.total_comments || 0,
      total_shares: article.total_shares || 0,
      total_bookmarks: article.total_bookmarks || 0,
      tags: article.tags || [],
    }
  } catch (error) {
    console.error("Error fetching article data:", error)
    throw new Error("Failed to fetch article data")
  }
}

const getAuthorData = async (username: string) => {
  console.log(username)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${username}`, {
      method: "GET",
      redirect: "follow",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log("Successfully fetched user data:", result)
    return {
      id: result.id,
      name: result.username,
      username: result.username,
      bio: result.bio || result.about_me || "No bio available",
      image: result.profile_image || "/placeholder.svg?height=100&width=100",
      initials: result.username.substring(0, 2).toUpperCase(),
    }
  } catch (error) {
    console.error("Error fetching author data:", error)
    return null
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  try {
    const article = await getArticleData(params.slug)

    if (!article) {
      notFound() // This will trigger the not-found.tsx page
    }

    const author = await getAuthorData(article.username)

    return <MarkdownArticleViewer article={article} author={author} />
  } catch (error) {
    console.error("Error in ArticlePage:", error)

    if (error instanceof Error) {
      if (error.message.includes("Failed to fetch")) {
        return (
            <ErrorMessage
                title="Network Error"
                message="Unable to connect to the server. Please check your internet connection and try again."
                canRetry={true}
                onRetry={() => window.location.reload()}
            />
        )
      } else {
        return (
            <ErrorMessage
                title="Server Error"
                message="There was a problem loading the article. Our team has been notified and is working on a fix."
            />
        )
      }
    }

    return <ErrorMessage title="Unexpected Error" message="An unexpected error occurred. Please try again later." />
  }
}
