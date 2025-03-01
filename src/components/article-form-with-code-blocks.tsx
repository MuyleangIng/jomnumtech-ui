"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  ImageIcon,
  LinkIcon,
  Code,
  Quote,
  Heading1,
  Heading2,
  Copy,
  Check,
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { createArticle, uploadImage } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import ImagePreviewDialog from "./image-preview-dialog"

interface Category {
  id: number
  name: string
}

interface Tag {
  id: number
  name: string
}

interface ArticleFormProps {
  categories: Category[]
  tags: Tag[]
  token: string
}

export default function ArticleForm({ categories, tags, token }: ArticleFormProps) {
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [isPublic, setIsPublic] = useState(true)
  const [isPreview, setIsPreview] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const [copied, setCopied] = useState(false)
    const match = /language-(\w+)/.exec(className || "")
    const language = match ? match[1] : "text"

    const copyToClipboard = () => {
      navigator.clipboard.writeText(String(children).replace(/\n$/, ""))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    if (!inline && match) {
      return (
        <div className="relative group">
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 p-1 rounded bg-muted/80 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          <SyntaxHighlighter style={vscDarkPlus} language={language} PreTag="div" {...props}>
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      )
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }

  const handleTagChange = (tagId: number) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]

    try {
      setIsSubmitting(true)
      const result = await uploadImage(file)
      setImageUrl(result.url)
      toast({
        title: "Image uploaded successfully",
        description: "Your image has been uploaded and will be used as the cover image.",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Failed to upload image",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim() || !categoryId) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields: title, content, and category.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      const articleData = {
        title,
        subtitle,
        content,
        image_url: imageUrl,
        is_public: isPublic,
        category_id: categoryId,
        tag_ids: selectedTags,
      }

      await createArticle(articleData, token)

      toast({
        title: "Article published successfully",
        description: "Your article has been published and is now available to readers.",
      })

      // Reset form or redirect
      resetForm()
    } catch (error) {
      console.error("Error publishing article:", error)
      toast({
        title: "Failed to publish article",
        description: "There was an error publishing your article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setTitle("")
    setSubtitle("")
    setContent("")
    setSelectedTags([])
    setCategoryId(null)
    setImageUrl("")
    setIsPublic(true)
    setIsPreview(false)
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

  // Function to detect language from code snippet
  const detectLanguage = (code: string): string => {
    // Simple language detection based on common patterns
    if (code.includes("function") || code.includes("const") || code.includes("let") || code.includes("var")) {
      return "javascript"
    } else if (code.includes("def ") || (code.includes("import ") && code.includes(":"))) {
      return "python"
    } else if (code.includes("<html") || code.includes("<div") || code.includes("<body")) {
      return "html"
    } else if (
      code.includes(".class") ||
      code.includes("#id") ||
      code.includes("margin:") ||
      code.includes("padding:")
    ) {
      return "css"
    } else if (code.includes("SELECT") || code.includes("FROM") || code.includes("WHERE")) {
      return "sql"
    }
    return "text"
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
            <Button onClick={handlePublish} disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}>
              {isSubmitting ? "Publishing..." : "Publish"}
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

        <div>
          {isPreview ? (
            <h2 className="text-xl text-muted-foreground">{subtitle}</h2>
          ) : (
            <Input
              type="text"
              placeholder="Subtitle (optional)"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="border-none text-xl text-muted-foreground focus-visible:ring-0"
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const selection = (() => {
                  const textarea = document.getElementById("content") as HTMLTextAreaElement
                  return textarea.value.substring(textarea.selectionStart, textarea.selectionEnd)
                })()

                const language = selection
                  ? detectLanguage(selection)
                  : window.prompt("Enter programming language (e.g., javascript, python, css)", "javascript")

                if (language) {
                  // If there's a selection, wrap it in code block
                  if (selection) {
                    const textarea = document.getElementById("content") as HTMLTextAreaElement
                    const start = textarea.selectionStart
                    const end = textarea.selectionEnd
                    const text = textarea.value
                    const before = text.substring(0, start)
                    const after = text.substring(end)
                    const newText = before + "```" + language + "\n" + selection + "\n```" + after
                    setContent(newText)
                    textarea.focus()
                    // Position cursor after the code block
                    const newCursorPos = start + 3 + language.length + 1 + selection.length + 4
                    textarea.setSelectionRange(newCursorPos, newCursorPos)
                  } else {
                    // Insert empty code block with language
                    insertMarkdown("```" + language + "\n\n```")
                    // Position cursor between the backticks
                    setTimeout(() => {
                      const textarea = document.getElementById("content") as HTMLTextAreaElement
                      const currentPos = textarea.value.indexOf("```" + language + "\n\n```") + 3 + language.length + 1
                      textarea.setSelectionRange(currentPos, currentPos)
                      textarea.focus()
                    }, 0)
                  }
                } else if (language !== null) {
                  // User clicked OK without entering a language
                  insertMarkdown("`")
                }
              }}
            >
              <Code className="h-4 w-4" />
              <span className="sr-only">Code</span>
            </Button>
            <ImagePreviewDialog onImageSelected={(url) => insertMarkdown(`![Image](${url})`)} uploadImage={uploadImage}>
              <Button variant="ghost" size="sm">
                <ImageIcon className="h-4 w-4" />
                <span className="sr-only">Image</span>
              </Button>
            </ImagePreviewDialog>
            <Button variant="ghost" size="sm" onClick={() => insertMarkdown("[Link text](url)")}>
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Link</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const templateChoice = window.confirm("Use article template?")
                if (templateChoice) {
                  setTitle("My Amazing Article")
                  setSubtitle("A compelling subtitle that draws readers in")
                  setContent(`# Introduction

This is where you introduce your topic and hook the reader.

## Main Point 1

Explain your first main point here with supporting evidence.

![Cover Image](https://source.unsplash.com/random/800x400/?article)

## Main Point 2

Develop your second main point with examples and analysis.

> Include an insightful quote or important callout here.

\`\`\`javascript
// Example code block with syntax highlighting
function exampleFunction() {
  const data = fetchData();
  return data.map(item => {
    return {
      id: item.id,
      name: item.name.toUpperCase(),
      value: calculateValue(item)
    };
  });
}
\`\`\`

## Conclusion

Summarize your key points and leave the reader with a final thought.`)
                }
              }}
            >
              <ListOrdered className="h-4 w-4 rotate-90" />
              <span className="sr-only">Template</span>
            </Button>
          </div>
        )}

        <div>
          {isPreview ? (
            <div className="prose max-w-none dark:prose-invert">
              <ReactMarkdown
                components={{
                  code: CodeBlock,
                }}
              >
                {content}
              </ReactMarkdown>
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
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId?.toString()} onValueChange={(value) => setCategoryId(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTagChange(tag.id)}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="is-public" checked={isPublic} onCheckedChange={setIsPublic} />
            <Label htmlFor="is-public">Make this article public</Label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Save draft</Button>
          <Button onClick={handlePublish} disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}>
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={async (e) => {
          if (!e.target.files || e.target.files.length === 0) return

          const file = e.target.files[0]
          try {
            setIsSubmitting(true)
            const result = await uploadImage(file)
            setImageUrl(result.url)
            insertMarkdown(`![Image](${result.url})`)
            toast({
              title: "Image uploaded successfully",
              description: "Your image has been added to the article.",
            })
          } catch (error) {
            console.error("Error uploading image:", error)
            toast({
              title: "Failed to upload image",
              description: "There was an error uploading your image. Please try again.",
              variant: "destructive",
            })
          } finally {
            setIsSubmitting(false)
            // Reset the file input
            e.target.value = ""
          }
        }}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}

