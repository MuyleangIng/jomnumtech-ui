"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, Heart, MessageSquare, Share2, Copy, Check, Maximize2 } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface Tag {
  id: number
  name: string
}

interface Author {
  id: number
  name: string
  username: string
  bio?: string
  image?: string
  initials?: string
}

interface Article {
  id: number
  title: string
  subtitle?: string
  content: string
  image_url?: string
  is_public: boolean
  category_id: number
  author_id: number
  created_at: string
  views: number
  total_likes: number
  total_comments: number
  total_shares: number
  total_bookmarks: number
  tags: Tag[]
  author?: Author
}

interface MarkdownArticleViewerProps {
  article: Article
  author?: Author
}

export function MarkdownArticleViewer({ article, author }: MarkdownArticleViewerProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(article.total_likes)
  const [bookmarkCount, setBookmarkCount] = useState(article.total_bookmarks)

  const toggleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  const toggleBookmark = () => {
    if (bookmarked) {
      setBookmarkCount((prev) => prev - 1)
    } else {
      setBookmarkCount((prev) => prev + 1)
    }
    setBookmarked(!bookmarked)
  }

  const formattedDate = article.created_at ? formatDistanceToNow(new Date(article.created_at), { addSuffix: true }) : ""

  const articleAuthor = author || {
    id: article.author_id,
    name: "Anonymous",
    username: "anonymous",
    initials: "A",
    image: "/placeholder.svg?height=100&width=100",
  }

  return (
    <div className="mx-auto max-w-full bg-white">
      <div className="container max-w-[728px] py-10">
        <article className="space-y-8">
          {/* Article Header */}
          <div className="space-y-3 sm:space-y-4">
            {/* Article Title */}
            <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight">
              {article.title}
            </h1>

            {/* Subtitle (if available) */}
            {article.subtitle && (
                <p className="text-lg text-muted-foreground">{article.subtitle}</p>
            )}

            {/* Author Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              {/* Author Avatar */}
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage src={articleAuthor.image} alt={articleAuthor.name} />
                <AvatarFallback>{articleAuthor.initials}</AvatarFallback>
              </Avatar>

              {/* Author Info & Actions */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Link
                      href={`/@${articleAuthor.username}`}
                      className="font-medium hover:underline"
                  >
                    {articleAuthor.name}
                  </Link>
                  <Button
                      variant="outline"
                      size="sm"
                      className="h-6 sm:h-7 rounded-full text-xs"
                  >
                    Follow
                  </Button>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>{formattedDate}</span>
                  <span>·</span>
                  <span>{article.views} views</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <ShareButton article={article} />
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full">
                  <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path>
                  </svg>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full"
                    onClick={toggleBookmark}
                >
                  <Bookmark className={cn("h-5 w-5", bookmarked && "fill-current")} />
                </Button>
              </div>
            </div>
          </div>


          {/* Cover Image */}
          {/*{article.image_url && (*/}
          {/*  <Image*/}
          {/*    src={article.image_url || "/placeholder.svg"}*/}
          {/*    alt={article.title}*/}
          {/*    width={1200}*/}
          {/*    height={600}*/}
          {/*    className="rounded-lg object-cover"*/}
          {/*    priority*/}
          {/*  />*/}
          {/*)}*/}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none font-serif article-content">
            <ReactMarkdown
              components={{
                img: ({ node, ...props }) => (
                  <Image
                    src={props.src || "/placeholder.svg"}
                    alt={props.alt || ""}
                    width={800}
                    height={400}
                    className="rounded-lg object-cover my-4"
                  />
                ),
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "")
                  const language = match ? match[1] : "text"
                  const code = String(children).replace(/\n$/, "")

                  if (!inline && match) {
                    return <CodeBlock code={code} language={language} />
                  }

                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="my-4 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                a: ({ node, ...props }) => <a className="text-primary underline hover:no-underline" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Article Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {article.tags.map((tag) => (
              <Button
                key={tag.id}
                variant="secondary"
                size="sm"
                className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                asChild
              >
                <Link href={`/tag/${tag.name.toLowerCase().replace(" ", "-")}`}>{tag.name}</Link>
              </Button>
            ))}
          </div>

          {/* Article Actions */}
          <div className="flex items-center justify-between border-y py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2" onClick={toggleLike}>
                <Heart className={cn("h-5 w-5", liked && "fill-current text-red-500")} />
                <span>{likeCount}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>{article.total_comments}</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <ShareButton article={article} />
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={toggleBookmark}>
                <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
              </Button>
            </div>
          </div>

          {/* Author Info */}
          {articleAuthor && (
            <div className="rounded-lg border p-6 bg-gray-50">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={articleAuthor.image} alt={articleAuthor.name} />
                  <AvatarFallback>{articleAuthor.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Link href={`/@${articleAuthor.username}`} className="text-lg font-medium hover:underline">
                      {articleAuthor.name}
                    </Link>
                    <Button className="rounded-full">Follow</Button>
                  </div>
                  {articleAuthor.bio && <p className="text-muted-foreground">{articleAuthor.bio}</p>}
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

function CodeBlock({ code, language = "text" }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-md overflow-hidden my-6">
      <pre className="p-4 overflow-x-auto bg-muted text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted/80 hover:bg-muted" onClick={copyToClipboard}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted/80 hover:bg-muted">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-full max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Code - {language}</DialogTitle>
            </DialogHeader>
            <div className="overflow-auto">
              <pre className="p-4 rounded bg-muted overflow-auto">
                <code className={`language-${language}`}>{code}</code>
              </pre>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function ShareButton({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false)

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/article/${article.id}` : `/article/${article.id}`

  const shareText = `Check out this article: ${article.title}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      "_blank",
    )
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareToLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Share2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share article</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={shareToTwitter}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={shareToFacebook}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={shareToLinkedin}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="2"
                  y="9"
                  width="4"
                  height="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="4"
                  cy="4"
                  r="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path
                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input className="flex-1 bg-transparent outline-none" value={shareUrl} readOnly />
              </div>
            </div>
            <Button size="sm" className="px-3" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

