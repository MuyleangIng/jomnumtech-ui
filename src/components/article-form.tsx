// "use client"
//
// import { useState, useRef, type ChangeEvent } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Bold, Italic, List, ListOrdered, ImageIcon, LinkIcon, Code, Quote, Heading1, Heading2 } from "lucide-react"
// import ReactMarkdown from "react-markdown"
// import { createArticle, uploadImage } from "@/lib/api"
// import { useToast } from "@/components/ui/use-toast"
// import Image from "next/image"
// import ImagePreviewDialog from "./image-preview-dialog"
//
// interface Category {
//   id: number
//   name: string
// }
//
// interface Tag {
//   id: number
//   name: string
// }
//
// interface ArticleFormProps {
//   categories: Category[]
//   tags: Tag[]
//   token: string
// }
//
// export default function ArticleForm({ categories, tags, token }: ArticleFormProps) {
//   const [title, setTitle] = useState("")
//   const [subtitle, setSubtitle] = useState("")
//   const [content, setContent] = useState("")
//   const [selectedTags, setSelectedTags] = useState<number[]>([])
//   const [categoryId, setCategoryId] = useState<number | null>(null)
//   const [isPublic, setIsPublic] = useState(true)
//   const [isPreview, setIsPreview] = useState(false)
//   const [imageUrl, setImageUrl] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const { toast } = useToast()
//
//   const handleTagChange = (tagId: number) => {
//     setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
//   }
//
//   const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return
//
//     const file = e.target.files[0]
//
//     try {
//       setIsSubmitting(true)
//       const result = await uploadImage(file)
//       setImageUrl(result.url)
//       toast({
//         title: "Image uploaded successfully",
//         description: "Your image has been uploaded and will be used as the cover image.",
//       })
//     } catch (error) {
//       console.error("Error uploading image:", error)
//       toast({
//         title: "Failed to upload image",
//         description: "There was an error uploading your image. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }
//
//   const handlePublish = async () => {
//     if (!title.trim() || !content.trim() || !categoryId) {
//       toast({
//         title: "Missing required fields",
//         description: "Please fill in all required fields: title, content, and category.",
//         variant: "destructive",
//       })
//       return
//     }
//
//     try {
//       setIsSubmitting(true)
//
//       const articleData = {
//         title,
//         subtitle,
//         content,
//         image_url: imageUrl,
//         is_public: isPublic,
//         category_id: categoryId,
//         tag_ids: selectedTags,
//       }
//
//       await createArticle(articleData, token)
//
//       toast({
//         title: "Article published successfully",
//         description: "Your article has been published and is now available to readers.",
//       })
//
//       // Reset form or redirect
//       resetForm()
//     } catch (error) {
//       console.error("Error publishing article:", error)
//       toast({
//         title: "Failed to publish article",
//         description: "There was an error publishing your article. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }
//
//   const resetForm = () => {
//     setTitle("")
//     setSubtitle("")
//     setContent("")
//     setSelectedTags([])
//     setCategoryId(null)
//     setImageUrl("")
//     setIsPublic(true)
//     setIsPreview(false)
//   }
//
//   const insertMarkdown = (markdownSymbol: string) => {
//     const textarea = document.getElementById("content") as HTMLTextAreaElement
//     const start = textarea.selectionStart
//     const end = textarea.selectionEnd
//     const text = textarea.value
//     const before = text.substring(0, start)
//     const selection = text.substring(start, end)
//     const after = text.substring(end)
//     const newText = before + markdownSymbol + selection + markdownSymbol + after
//     setContent(newText)
//     textarea.focus()
//     textarea.setSelectionRange(start + markdownSymbol.length, end + markdownSymbol.length)
//   }
//
//   return (
//       <div className="container max-w-5xl py-10">
//         <div className="mb-8 flex items-center justify-between">
//           <h1 className="text-3xl font-bold">Write a story</h1>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center space-x-2">
//               <Switch id="preview-mode" checked={isPreview} onCheckedChange={setIsPreview} />
//               <Label htmlFor="preview-mode">Preview</Label>
//             </div>
//             <div className="flex gap-2">
//               <Button variant="outline">Save draft</Button>
//               <Button onClick={handlePublish} disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}>
//                 {isSubmitting ? "Publishing..." : "Publish"}
//               </Button>
//             </div>
//           </div>
//         </div>
//
//         <div className="space-y-6">
//           <div>
//             {isPreview ? (
//                 <h1 className="text-3xl font-bold">{title || "Untitled"}</h1>
//             ) : (
//                 <Input
//                     type="text"
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="border-none text-3xl font-bold focus-visible:ring-0"
//                 />
//             )}
//           </div>
//
//           <div>
//             {isPreview ? (
//                 <h2 className="text-xl text-muted-foreground">{subtitle}</h2>
//             ) : (
//                 <Input
//                     type="text"
//                     placeholder="Subtitle (optional)"
//                     value={subtitle}
//                     onChange={(e) => setSubtitle(e.target.value)}
//                     className="border-none text-xl text-muted-foreground focus-visible:ring-0"
//                 />
//             )}
//           </div>
//
//           {!isPreview && (
//               <div className="flex flex-wrap gap-2 border-y py-2">
//                 <Button variant="ghost" size="sm" onClick={() => insertMarkdown("**")}>
//                   <Bold className="h-4 w-4" />
//                   <span className="sr-only">Bold</span>
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={() => insertMarkdown("*")}>
//                   <Italic className="h-4 w-4" />
//                   <span className="sr-only">Italic</span>
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={() => insertMarkdown("# ")}>
//                   <Heading1 className="h-4 w-4" />
//                   <span className="sr-only">Heading 1</span>
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={() => insertMarkdown("## ")}>
//                   <Heading2 className="h-4 w-4" />
//                   <span className="sr-only">Heading 2</span>
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={() => insertMarkdown("> ")}>
//                   <Quote className="h-4 w-4" />
//                   <span className="sr-only">Quote</span>
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={() => insertMarkdown("- ")}>
//                   <List className="h-4 w-4" />
//                   <span className="sr-only">Bullet List</span>
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={() => insertMarkdown("1. ")}>
//                   <ListOrdered className="h-4 w-4" />
//                   <span className="sr-only">Numbered List</span>
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={() => insertMarkdown("`")}>
//                   <Code className="h-4 w-4" />
//                   <span className="sr-only">Code</span>
//                 </Button>
//                 <ImagePreviewDialog onImageSelected={(url) => insertMarkdown(`![Image](${url})`)} uploadImage={uploadImage}>
//                   <Button variant="ghost" size="sm">
//                     <ImageIcon className="h-4 w-4" />
//                     <span className="sr-only">Image</span>
//                   </Button>
//                 </ImagePreviewDialog>
//                 <Button variant="ghost" size="sm" onClick={() => insertMarkdown("[Link text](url)")}>
//                   <LinkIcon className="h-4 w-4" />
//                   <span className="sr-only">Link</span>
//                 </Button>
//                 <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {
//                       const templateChoice = window.confirm("Use article template?")
//                       if (templateChoice) {
//                         setTitle("The Beginner's Guide to Docker")
//                         setSubtitle("A Step-by-Step Introduction to Docker")
//                         setContent(`# Introduction
//
// This is where you introduce your topic and hook the reader.
//
// ## Main Point 1
//
// Explain your first main point here with supporting evidence.
//
// ![Cover Image](https://source.unsplash.com/random/800x400/?article)
//
// ## Main Point 2
//
// Develop your second main point with examples and analysis.
//
// > Include an insightful quote or important callout here.
//
// ## Conclusion
//
// Summarize your key points and leave the reader with a final thought.`)
//                       }
//                     }}
//                 >
//                   <ListOrdered className="h-4 w-4 rotate-90" />
//                   <span className="sr-only">Template</span>
//                 </Button>
//               </div>
//           )}
//
//           <div>
//             {isPreview ? (
//                 <div className="prose max-w-none">
//                   <ReactMarkdown>{content}</ReactMarkdown>
//                 </div>
//             ) : (
//                 <Textarea
//                     id="content"
//                     placeholder="Tell your story..."
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     className="min-h-[400px] resize-none border-none focus-visible:ring-0"
//                 />
//             )}
//           </div>
//
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="category">Category</Label>
//               <Select value={categoryId?.toString()} onValueChange={(value) => setCategoryId(Number(value))}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                       <SelectItem key={category.id} value={category.id.toString()}>
//                         {category.name}
//                       </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//
//             <div>
//               <Label>Tags</Label>
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {tags.map((tag) => (
//                     <Button
//                         key={tag.id}
//                         variant={selectedTags.includes(tag.id) ? "default" : "outline"}
//                         size="sm"
//                         onClick={() => handleTagChange(tag.id)}
//                     >
//                       {tag.name}
//                     </Button>
//                 ))}
//               </div>
//             </div>
//
//             <div>
//               <Label htmlFor="cover-image">Cover image</Label>
//               <div className="mt-2">
//                 <input
//                     type="file"
//                     id="cover-image"
//                     ref={fileInputRef}
//                     onChange={handleImageUpload}
//                     accept="image/*"
//                     className="hidden"
//                 />
//                 <Button
//                     variant="outline"
//                     className="w-full"
//                     onClick={() => fileInputRef.current?.click()}
//                     disabled={isSubmitting}
//                 >
//                   <ImageIcon className="mr-2 h-4 w-4" />
//                   {imageUrl ? "Change cover image" : "Upload cover image"}
//                 </Button>
//                 {imageUrl && (
//                     <div className="mt-2">
//                       <Image
//                           src={imageUrl || "/placeholder.svg"}
//                           alt="Cover preview"
//                           className="mt-2 h-40 w-full rounded-md object-cover"
//                           width={100}
//                           height={100}
//                       />
//                     </div>
//                 )}
//               </div>
//             </div>
//
//             <div className="flex items-center space-x-2">
//               <Switch id="is-public" checked={isPublic} onCheckedChange={setIsPublic} />
//               <Label htmlFor="is-public">Make this article public</Label>
//             </div>
//           </div>
//
//           <div className="flex justify-end gap-2">
//             <Button variant="outline">Save draft</Button>
//             <Button onClick={handlePublish} disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}>
//               {isSubmitting ? "Publishing..." : "Publish"}
//             </Button>
//           </div>
//         </div>
//       </div>
//   )
// }
//
"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bold, Italic, List, ListOrdered, ImageIcon, LinkIcon, Quote, Heading1, Heading2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { createArticle, uploadImage } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import ImagePreviewDialog from "./image-preview-dialog"
import { CodeBlock } from "@/components/code-block"
import { CodeInsertDropdown } from "@/components/code-insert-dropdown"
import { TemplateDropdown } from "@/components/template-dropdown"

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

  const insertCodeBlock = (language: string) => {
    const codeBlock = `\`\`\`${language}\n\n\`\`\``
    insertMarkdown(codeBlock)
    // Position cursor between the backticks
    setTimeout(() => {
      const textarea = document.getElementById("content") as HTMLTextAreaElement
      const currentPos = textarea.value.indexOf(codeBlock) + language.length + 4
      textarea.setSelectionRange(currentPos, currentPos)
      textarea.focus()
    }, 0)
  }

  const insertTemplate = (template: string) => {
    let templateContent = ""
    switch (template) {
      case "blog-post":
        templateContent = `# My Amazing Blog Post

## Introduction

This is where you introduce your topic and hook the reader.

## Main Point 1

Explain your first main point here with supporting evidence.

![Cover Image](https://source.unsplash.com/random/800x400/?blog)

## Main Point 2

Develop your second main point with examples and analysis.

> Include an insightful quote or important callout here.

## Conclusion

Summarize your key points and leave the reader with a final thought.`
        break
      case "tutorial":
        templateContent = `# How to [Do Something]: A Step-by-Step Guide

## Introduction

Briefly explain what this tutorial will cover and why it's useful.

## Prerequisites

List any tools, knowledge, or resources needed before starting.

## Step 1: [First Step]

Detailed explanation of the first step.

\`\`\`code
// Example code if applicable
\`\`\`

## Step 2: [Second Step]

Detailed explanation of the second step.

![Illustrative Image](https://source.unsplash.com/random/800x400/?tutorial)

## Step 3: [Third Step]

Detailed explanation of the third step.

## Conclusion

Summarize what the reader has learned and suggest next steps or related topics.`
        break
        // Add more cases for other templates
    }
    setContent(templateContent)
  }

  const CodeBlockComponent = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "")
    const language = match ? match[1] : "text"

    if (!inline && match) {
      return <CodeBlock language={language} value={String(children).replace(/\n$/, "")} className="my-6" />
    }

    return (
        <code className={className} {...props}>
          {children}
        </code>
    )
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
                <CodeInsertDropdown onSelect={insertCodeBlock} />
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
                <TemplateDropdown onSelect={insertTemplate} />
              </div>
          )}

          <div>
            {isPreview ? (
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <ReactMarkdown
                      components={{
                        code: CodeBlockComponent,
                        pre: ({ children }) => <div className="not-prose">{children}</div>,
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

            <div>
              <Label htmlFor="cover-image">Cover image</Label>
              <div className="mt-2">
                <input
                    type="file"
                    id="cover-image"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                />
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  {imageUrl ? "Change cover image" : "Upload cover image"}
                </Button>
                {imageUrl && (
                    <div className="mt-2">
                      <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt="Cover preview"
                          className="mt-2 h-40 w-full rounded-md object-cover"
                          width={100}
                          height={100}
                      />
                    </div>
                )}
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
      </div>
  )
}

