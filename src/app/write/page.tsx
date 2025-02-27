"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Bold, Italic, List, ListOrdered, ImageIcon, LinkIcon, Code, Quote, Heading1, Heading2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Switch } from "@/components/ui/switch"

export default function WritePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const handlePublish = () => {
    // In a real app, you would submit the article to your backend
    console.log("Publishing article:", { title, content, tags, excerpt })
  }

  const insertMarkdown = (markdownSymbol: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const before = text.substring(0, start)
    const selection = text.substring(start, end)
    const after = text.substring(end)
    const newText = before + markdownSymbol + selection + markdownSymbol + after
    setContent(newText)
    textarea.focus()
    textarea.setSelectionRange(start + markdownSymbol.length, end + markdownSymbol.length)
  }

  return (
      <div className="container max-w-5xl py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Write a story</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="preview-mode" checked={isPreview} onCheckedChange={setIsPreview} />
              <Label htmlFor="preview-mode">Preview</Label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Save draft</Button>
              <Button onClick={handlePublish} disabled={!title.trim() || !content.trim()}>
                Publish
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            {isPreview ? (
                <h1 className="text-3xl font-bold">{title || "Untitled"}</h1>
            ) : (
                <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-none text-3xl font-bold focus-visible:ring-0"
                />
            )}
          </div>

          {!isPreview && (
              <div className="flex flex-wrap gap-2 border-y py-2">
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown("**")}>
                  <Bold className="h-4 w-4" />
                  <span className="sr-only">Bold</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown("*")}>
                  <Italic className="h-4 w-4" />
                  <span className="sr-only">Italic</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown("# ")}>
                  <Heading1 className="h-4 w-4" />
                  <span className="sr-only">Heading 1</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown("## ")}>
                  <Heading2 className="h-4 w-4" />
                  <span className="sr-only">Heading 2</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown("> ")}>
                  <Quote className="h-4 w-4" />
                  <span className="sr-only">Quote</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown("- ")}>
                  <List className="h-4 w-4" />
                  <span className="sr-only">Bullet List</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown("1. ")}>
                  <ListOrdered className="h-4 w-4" />
                  <span className="sr-only">Numbered List</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown("`")}>
                  <Code className="h-4 w-4" />
                  <span className="sr-only">Code</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown("![Alt text](url)")}>
                  <ImageIcon className="h-4 w-4" />
                  <span className="sr-only">Image</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown("[Link text](url)")}>
                  <LinkIcon className="h-4 w-4" />
                  <span className="sr-only">Link</span>
                </Button>
              </div>
          )}

          <div>
            {isPreview ? (
                <div className="prose max-w-none">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            ) : (
                <Textarea
                    id="content"
                    placeholder="Tell your story..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] resize-none border-none focus-visible:ring-0"
                />
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="tags">Tags (separated by commas)</Label>
              <Input
                  id="tags"
                  placeholder="e.g. Programming, Web Development, JavaScript"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Short excerpt</Label>
              <Textarea
                  id="excerpt"
                  placeholder="Write a short excerpt for your article (optional)"
                  className="h-24 resize-none"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
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

