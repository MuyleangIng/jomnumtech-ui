"use client"
import { MarkdownArticleViewer } from "@/components/markdown-article-viewer";
import { notFound } from "next/navigation";

const getArticleData = async (slug: string) => {
  try {
    const response = await fetch(`https://jomnumtech-api.shinoshike.studio/articles/slug/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // Prevents caching issues
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const article = await response.json();

    return {
      id: article.id,
      slug: article.slug,
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
    };
  } catch (error) {
    console.error("Error fetching article data:", error);
    return null;
  }
};

const getAuthorData = async (username: string) => {
  try {
    const response = await fetch(`https://jomnumtech-api.shinoshike.studio/users/${username}`, {
      method: "GET",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      id: result.id,
      name: result.username,
      username: result.username,
      bio: result.bio || result.about_me || "No bio available",
      image: result.profile_image || "/placeholder.svg?height=100&width=100",
      initials: result.username.substring(0, 2).toUpperCase(),
    };
  } catch (error) {
    console.error("Error fetching author data:", error);
    return null;
  }
};

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = await params; // Unwrap the Promise (new Next.js requirement)

  const article = await getArticleData(slug);
  if (!article) {
    notFound();
  }

  const author = await getAuthorData(article.username);

  return <MarkdownArticleViewer article={article} author={author} />;
}
