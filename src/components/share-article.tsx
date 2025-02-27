"use client"

import { useState } from "react"
import { Facebook, LinkIcon, Linkedin, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface Article {
  id: string
  title: string
  excerpt?: string
  author: {
    name: string
  }
}

export function ShareArticle({ article }: { article: Article }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const articleUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/article/${article.id}`
      : `https://medium-clone.vercel.app/article/${article.id}`

  const shareText = `Check out "${article.title}" by ${article.author.name}`

  const shareViaTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(articleUrl)}`
    window.open(url, "_blank")
  }

  const shareViaFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`
    window.open(url, "_blank")
  }

  const shareViaLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`
    window.open(url, "_blank")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(articleUrl).then(() => {
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      })
      setIsDialogOpen(false)
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={shareViaTwitter}>
            <X className="mr-2 h-4 w-4" />
            Share on X
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareViaFacebook}>
            <Facebook className="mr-2 h-4 w-4" />
            Share on Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareViaLinkedIn}>
            <Linkedin className="mr-2 h-4 w-4" />
            Share on LinkedIn
          </DropdownMenuItem>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <LinkIcon className="mr-2 h-4 w-4" />
                Copy link
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share article</DialogTitle>
                <DialogDescription>Copy the link below to share this article with others.</DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input value={articleUrl} readOnly className="w-full" />
                </div>
                <Button onClick={copyToClipboard} type="submit" size="sm" className="px-3">
                  <span className="sr-only">Copy</span>
                  Copy
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster />
    </>
  )
}

