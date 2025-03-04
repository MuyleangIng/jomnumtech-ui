"use client"

import { useState } from "react"
import { Share2, Copy, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

interface ShareButtonProps {
  articleId: number
}

export function ShareButton({ articleId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/article/${articleId}` 
    : `/article/${articleId}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast({
      title: "Link copied",
      description: "The article link has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToTwitter = () => {
    const text = "Check out this article!"
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`, "_blank")
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share article</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-4">
            <Button onClick={shareToTwitter} variant="outline" size="icon" className="rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button onClick={shareToFacebook} variant="outline" size="icon" className="rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button onClick={shareToLinkedIn} variant="outline" size="icon" className="rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input value={shareUrl} readOnly className="flex-1" />
            <Button onClick={copyToClipboard} size="sm">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
