"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Bold, Italic, List, ListOrdered, ImageIcon, LinkIcon, Code, Quote, Heading1, Heading2 } from "lucide-react"

export default function WritePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handlePublish = () => {
    // In a real app, you would submit the article to your backend
    console.log("Publishing article:", { title, content })
  }

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Write a story</h1>
        <div className="flex gap-2">
          <Button variant="outline">Save draft</Button>
          <Button onClick={handlePublish} disabled={!title.trim() || !content.trim()}>
            Publish
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-none text-3xl font-bold focus-visible:ring-0"
          />
        </div>

        <div className="flex flex-wrap gap-2 border-y py-2">
          <Button variant="ghost" size="sm">
            <Bold className="h-4 w-4" />
            <span className="sr-only">Bold</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Italic className="h-4 w-4" />
            <span className="sr-only">Italic</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Heading1 className="h-4 w-4" />
            <span className="sr-only">Heading 1</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Heading2 className="h-4 w-4" />
            <span className="sr-only">Heading 2</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Quote className="h-4 w-4" />
            <span className="sr-only">Quote</span>
          </Button>
          <Button variant="ghost" size="sm">
            <List className="h-4 w-4" />
            <span className="sr-only">Bullet List</span>
          </Button>
          <Button variant="ghost" size="sm">
            <ListOrdered className="h-4 w-4" />
            <span className="sr-only">Numbered List</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Code className="h-4 w-4" />
            <span className="sr-only">Code</span>
          </Button>
          <Button variant="ghost" size="sm">
            <ImageIcon className="h-4 w-4" />
            <span className="sr-only">Image</span>
          </Button>
          <Button variant="ghost" size="sm">
            <LinkIcon className="h-4 w-4" />
            <span className="sr-only">Link</span>
          </Button>
        </div>

        <div>
          <Textarea
            placeholder="Tell your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] resize-none border-none focus-visible:ring-0"
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="tags">Tags (separated by commas)</Label>
            <Input id="tags" placeholder="e.g. Programming, Web Development, JavaScript" />
          </div>

          <div>
            <Label htmlFor="excerpt">Short excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Write a short excerpt for your article (optional)"
              className="h-24 resize-none"
            />
          </div>

          <div>
            <Label htmlFor="cover-image">Cover image</Label>
            <div className="mt-2">
              <Button variant="outline" className="w-full">
                <ImageIcon className="mr-2 h-4 w-4" />
                Upload cover image
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Save draft</Button>
          <Button onClick={handlePublish} disabled={!title.trim() || !content.trim()}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}

