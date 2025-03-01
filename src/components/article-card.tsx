"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Edit, BarChart2, Copy, Trash, Eye, EyeOff } from "lucide-react"

interface ArticleCardProps {
  article: {
    id: number
    title: string
    subtitle: string
    content: string
    created_at: string
    views: number
    total_likes: number
    is_public: boolean
  }
  onToggleVisibility: (id: number, isPublic: boolean) => Promise<void>
  isLoading?: boolean
  formatDate: (date: string) => string
  calculateReadTime: (content: string) => string
}

export default function ArticleCard({
  article,
  onToggleVisibility,
  isLoading,
  formatDate,
  calculateReadTime,
}: ArticleCardProps) {
  const [isActionLoading, setIsActionLoading] = useState(false)

  const handleVisibilityToggle = async () => {
    setIsActionLoading(true)
    await onToggleVisibility(article.id, article.is_public)
    setIsActionLoading(false)
  }

  return (
    <article className="flex flex-col space-y-3 border-b pb-6 last:border-b-0">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1 flex-1">
          <Link href={`/article/${article.id}`} className="block group">
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{article.title}</h2>
          </Link>
          <p className="text-muted-foreground line-clamp-2">{article.subtitle}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
              aria-label="Article options"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem asChild>
              <Link href={`/article/edit/${article.id}`} className="flex items-center cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit Article</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleVisibilityToggle}
              disabled={isActionLoading}
              className="flex items-center cursor-pointer"
            >
              {article.is_public ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  <span>Make Private</span>
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Make Public</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/article/${article.id}/stats`} className="flex items-center cursor-pointer">
                <BarChart2 className="mr-2 h-4 w-4" />
                <span>View Stats</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center cursor-pointer">
              <Copy className="mr-2 h-4 w-4" />
              <span>Duplicate</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center cursor-pointer text-destructive focus:text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{formatDate(article.created_at)}</span>
        <span>·</span>
        <span>{calculateReadTime(article.content)}</span>
        <span>·</span>
        <span>{article.views} views</span>
        <span>·</span>
        <span>{article.total_likes} likes</span>
        <span>·</span>
        <span className="flex items-center">
          {article.is_public ? (
            <span className="flex items-center text-green-600">
              <Eye className="mr-1 h-3 w-3" />
              Public
            </span>
          ) : (
            <span className="flex items-center text-amber-600">
              <EyeOff className="mr-1 h-3 w-3" />
              Private
            </span>
          )}
        </span>
      </div>

      {isLoading && (
        <div className="flex items-center text-sm text-muted-foreground">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Updating...
        </div>
      )}
    </article>
  )
}

