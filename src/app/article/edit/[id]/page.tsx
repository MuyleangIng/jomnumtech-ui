"use client"

import {useState, useRef, type ChangeEvent, useEffect, use} from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bold, Italic, List, ListOrdered, ImageIcon, LinkIcon, Quote, Heading1, Heading2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { updateArticle, uploadImage, getArticle, deleteArticle, fetchCategories, fetchTags } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import ImagePreviewDialog from "@/components/image-preview-dialog"
import { CodeBlock } from "@/components/code-block"
import { CodeInsertDropdown } from "@/components/code-insert-dropdown"
import { TemplateDropdown } from "@/components/template-dropdown"
import { useAuth } from "@/components/auth/AuthContext"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface EditArticlePageProps {
    params: {
        id: string
    }
}

export default function EditArticlePage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = use(params); // ✅ Unwrap the Promise
    const { tokens } = useAuth()
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [content, setContent] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [categoryId, setCategoryId] = useState<string>("")
    const [isPublic, setIsPublic] = useState(true)
    const [isPreview, setIsPreview] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [categories, setCategories] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])
    console.log(selectedTags)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

    useEffect(() => {
        const fetchArticleData = async () => {
            if (!tokens?.access_token) return

            try {
                const article = await getArticle(id, tokens.access_token)
                if (article) {
                    setTitle(article.title)
                    setSubtitle(article.subtitle)
                    setContent(article.content)
                    setSelectedTags(selectedTags)
                    setCategoryId(article.category_id.toString())
                    setIsPublic(article.is_public)
                    setImageUrl(article.image_url)
                }

                const fetchedCategories = await fetchCategories()
                setCategories(fetchedCategories)

                const fetchedTags = await fetchTags()
                setTags(fetchedTags)
            } catch (error) {
                console.error("Error fetching data:", error)
                toast({
                    title: "Error",
                    description: "Failed to load article data. Please try again.",
                    variant: "destructive",
                })
            }
        }

        fetchArticleData()
    }, [id, tokens, toast])

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

    const handleUpdate = async () => {
        if (!title.trim() || !content.trim() || !categoryId || !tokens?.access_token) {
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
                category_id: Number.parseInt(categoryId),
                tag_ids: selectedTags,
            }

            await updateArticle(Number.parseInt(id), articleData, tokens.access_token)

            toast({
                title: "Article updated successfully",
                description: "Your article has been updated and changes are now live.",
            })

            router.push("/profile")
        } catch (error) {
            console.error("Error updating article:", error)
            toast({
                title: "Failed to update article",
                description: "There was an error updating your article. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!tokens?.access_token) return

        try {
            setIsSubmitting(true)
            const success = await deleteArticle(Number.parseInt(id), tokens.access_token)

            if (success) {
                toast({
                    title: "Article deleted successfully",
                    description: "Your article has been permanently deleted.",
                })
                router.push("/profile")
            } else {
                throw new Error("Failed to delete article")
            }
        } catch (error) {
            console.error("Error deleting article:", error)
            toast({
                title: "Failed to delete article",
                description: "There was an error deleting your article. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
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
        // Implementation remains the same as in ArticleForm
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
                <h1 className="text-3xl font-bold">Edit Article</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Switch id="preview-mode" checked={isPreview} onCheckedChange={setIsPreview} />
                        <Label htmlFor="preview-mode">Preview</Label>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => router.push("/profile")}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}>
                            {isSubmitting ? "Updating..." : "Update"}
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your article and remove it from our
                                        servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete} disabled={isSubmitting}>
                                        {isSubmitting ? "Deleting..." : "Delete"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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
                        <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category, index) => (
                                    <SelectItem key={index} value={index.toString()}>
                                        {category}
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
                    <Button variant="outline" onClick={() => router.push("/profile")}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}>
                        {isSubmitting ? "Updating..." : "Update"}
                    </Button>
                </div>
            </div>
        </div>
    )
}


// "use client"
//
// import { useState, useRef, type ChangeEvent, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Bold, Italic, List, ListOrdered, ImageIcon, LinkIcon, Quote, Heading1, Heading2 } from "lucide-react"
// import ReactMarkdown from "react-markdown"
// import { updateArticle, uploadImage, getArticle } from "@/lib/api"
// import { useToast } from "@/components/ui/use-toast"
// import Image from "next/image"
// import ImagePreviewDialog from "@/components/image-preview-dialog"
// import { CodeBlock } from "@/components/code-block"
// import { CodeInsertDropdown } from "@/components/code-insert-dropdown"
// import { TemplateDropdown } from "@/components/template-dropdown"
// import { useAuth } from "@/components/auth/AuthContext"
//
// interface Category {
//     id: number
//     name: string
// }
//
// interface Tag {
//     id: number
//     name: string
// }
//
// interface EditArticlePageProps {
//     params: {
//         id: string
//     }
// }
//
// export default function EditArticlePage({ params }: EditArticlePageProps) {
//     const { id } = params
//     const { tokens } = useAuth()
//     const router = useRouter()
//     const [title, setTitle] = useState("")
//     const [subtitle, setSubtitle] = useState("")
//     const [content, setContent] = useState("")
//     const [selectedTags, setSelectedTags] = useState<number[]>([])
//     const [categoryId, setCategoryId] = useState<number | null>(null)
//     const [isPublic, setIsPublic] = useState(true)
//     const [isPreview, setIsPreview] = useState(false)
//     const [imageUrl, setImageUrl] = useState("")
//     const [isSubmitting, setIsSubmitting] = useState(false)
//     const [categories, setCategories] = useState<Category[]>([])
//     const [tags, setTags] = useState<Tag[]>([])
//
//     const fileInputRef = useRef<HTMLInputElement>(null)
//     const { toast } = useToast()
//
//     useEffect(() => {
//         const fetchArticle = async () => {
//             if (!tokens?.access_token) return
//
//             try {
//                 const article = await getArticle(id, tokens.access_token)
//                 if (article) {
//                     setTitle(article.title)
//                     setSubtitle(article.subtitle)
//                     setContent(article.content)
//                     setSelectedTags(article.tags.map((tag) => tag.id))
//                     setCategoryId(article.category_id)
//                     setIsPublic(article.is_public)
//                     setImageUrl(article.image_url)
//                 }
//             } catch (error) {
//                 console.error("Error fetching article:", error)
//                 toast({
//                     title: "Error",
//                     description: "Failed to load article. Please try again.",
//                     variant: "destructive",
//                 })
//             }
//         }
//
//         fetchArticle()
//         // TODO: Fetch categories and tags from API
//         // setCategories(...)
//         // setTags(...)
//     }, [id, tokens, toast])
//
//     const handleTagChange = (tagId: number) => {
//         setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
//     }
//
//     const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//         if (!e.target.files || e.target.files.length === 0) return
//
//         const file = e.target.files[0]
//
//         try {
//             setIsSubmitting(true)
//             const result = await uploadImage(file)
//             setImageUrl(result.url)
//             toast({
//                 title: "Image uploaded successfully",
//                 description: "Your image has been uploaded and will be used as the cover image.",
//             })
//         } catch (error) {
//             console.error("Error uploading image:", error)
//             toast({
//                 title: "Failed to upload image",
//                 description: "There was an error uploading your image. Please try again.",
//                 variant: "destructive",
//             })
//         } finally {
//             setIsSubmitting(false)
//         }
//     }
//
//     const handleUpdate = async () => {
//         if (!title.trim() || !content.trim() || !categoryId || !tokens?.access_token) {
//             toast({
//                 title: "Missing required fields",
//                 description: "Please fill in all required fields: title, content, and category.",
//                 variant: "destructive",
//             })
//             return
//         }
//
//         try {
//             setIsSubmitting(true)
//
//             const articleData = {
//                 title,
//                 subtitle,
//                 content,
//                 image_url: imageUrl,
//                 is_public: isPublic,
//                 category_id: categoryId,
//                 tag_ids: selectedTags,
//             }
//
//             await updateArticle(Number.parseInt(id), articleData, tokens.access_token)
//
//             toast({
//                 title: "Article updated successfully",
//                 description: "Your article has been updated and changes are now live.",
//             })
//
//             router.push("/profile") // Redirect to profile page after successful update
//         } catch (error) {
//             console.error("Error updating article:", error)
//             toast({
//                 title: "Failed to update article",
//                 description: "There was an error updating your article. Please try again.",
//                 variant: "destructive",
//             })
//         } finally {
//             setIsSubmitting(false)
//         }
//     }
//
//     const insertMarkdown = (markdownSymbol: string) => {
//         const textarea = document.getElementById("content") as HTMLTextAreaElement
//         const start = textarea.selectionStart
//         const end = textarea.selectionEnd
//         const text = textarea.value
//         const before = text.substring(0, start)
//         const selection = text.substring(start, end)
//         const after = text.substring(end)
//         const newText = before + markdownSymbol + selection + markdownSymbol + after
//         setContent(newText)
//         textarea.focus()
//         textarea.setSelectionRange(start + markdownSymbol.length, end + markdownSymbol.length)
//     }
//
//     const insertCodeBlock = (language: string) => {
//         const codeBlock = `\`\`\`${language}\n\n\`\`\``
//         insertMarkdown(codeBlock)
//         // Position cursor between the backticks
//         setTimeout(() => {
//             const textarea = document.getElementById("content") as HTMLTextAreaElement
//             const currentPos = textarea.value.indexOf(codeBlock) + language.length + 4
//             textarea.setSelectionRange(currentPos, currentPos)
//             textarea.focus()
//         }, 0)
//     }
//
//     const insertTemplate = (template: string) => {
//         // Implementation remains the same as in ArticleForm
//     }
//
//     const CodeBlockComponent = ({ node, inline, className, children, ...props }: any) => {
//         const match = /language-(\w+)/.exec(className || "")
//         const language = match ? match[1] : "text"
//
//         if (!inline && match) {
//             return <CodeBlock language={language} value={String(children).replace(/\n$/, "")} className="my-6" />
//         }
//
//         return (
//             <code className={className} {...props}>
//                 {children}
//             </code>
//         )
//     }
//
//     return (
//         <div className="container max-w-5xl py-10">
//             <div className="mb-8 flex items-center justify-between">
//                 <h1 className="text-3xl font-bold">Edit Article</h1>
//                 <div className="flex items-center gap-4">
//                     <div className="flex items-center space-x-2">
//                         <Switch id="preview-mode" checked={isPreview} onCheckedChange={setIsPreview} />
//                         <Label htmlFor="preview-mode">Preview</Label>
//                     </div>
//                     <div className="flex gap-2">
//                         <Button variant="outline" onClick={() => router.push("/profile")}>
//                             Cancel
//                         </Button>
//                         <Button onClick={handleUpdate} disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}>
//                             {isSubmitting ? "Updating..." : "Update"}
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="space-y-6">
//                 <div>
//                     {isPreview ? (
//                         <h1 className="text-3xl font-bold">{title || "Untitled"}</h1>
//                     ) : (
//                         <Input
//                             type="text"
//                             placeholder="Title"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             className="border-none text-3xl font-bold focus-visible:ring-0"
//                         />
//                     )}
//                 </div>
//
//                 <div>
//                     {isPreview ? (
//                         <h2 className="text-xl text-muted-foreground">{subtitle}</h2>
//                     ) : (
//                         <Input
//                             type="text"
//                             placeholder="Subtitle (optional)"
//                             value={subtitle}
//                             onChange={(e) => setSubtitle(e.target.value)}
//                             className="border-none text-xl text-muted-foreground focus-visible:ring-0"
//                         />
//                     )}
//                 </div>
//
//                 {!isPreview && (
//                     <div className="flex flex-wrap gap-2 border-y py-2">
//                         <Button variant="ghost" size="sm" onClick={() => insertMarkdown("**")}>
//                             <Bold className="h-4 w-4" />
//                             <span className="sr-only">Bold</span>
//                         </Button>
//                         <Button variant="ghost" size="sm" onClick={() => insertMarkdown("*")}>
//                             <Italic className="h-4 w-4" />
//                             <span className="sr-only">Italic</span>
//                         </Button>
//                         <Button variant="ghost" size="sm" onClick={() => insertMarkdown("# ")}>
//                             <Heading1 className="h-4 w-4" />
//                             <span className="sr-only">Heading 1</span>
//                         </Button>
//                         <Button variant="ghost" size="sm" onClick={() => insertMarkdown("## ")}>
//                             <Heading2 className="h-4 w-4" />
//                             <span className="sr-only">Heading 2</span>
//                         </Button>
//                         <Button variant="ghost" size="sm" onClick={() => insertMarkdown("> ")}>
//                             <Quote className="h-4 w-4" />
//                             <span className="sr-only">Quote</span>
//                         </Button>
//                         <Button variant="ghost" size="sm" onClick={() => insertMarkdown("- ")}>
//                             <List className="h-4 w-4" />
//                             <span className="sr-only">Bullet List</span>
//                         </Button>
//                         <Button variant="ghost" size="sm" onClick={() => insertMarkdown("1. ")}>
//                             <ListOrdered className="h-4 w-4" />
//                             <span className="sr-only">Numbered List</span>
//                         </Button>
//                         <CodeInsertDropdown onSelect={insertCodeBlock} />
//                         <ImagePreviewDialog onImageSelected={(url) => insertMarkdown(`![Image](${url})`)} uploadImage={uploadImage}>
//                             <Button variant="ghost" size="sm">
//                                 <ImageIcon className="h-4 w-4" />
//                                 <span className="sr-only">Image</span>
//                             </Button>
//                         </ImagePreviewDialog>
//                         <Button variant="ghost" size="sm" onClick={() => insertMarkdown("[Link text](url)")}>
//                             <LinkIcon className="h-4 w-4" />
//                             <span className="sr-only">Link</span>
//                         </Button>
//                         <TemplateDropdown onSelect={insertTemplate} />
//                     </div>
//                 )}
//
//                 <div>
//                     {isPreview ? (
//                         <div className="prose prose-gray dark:prose-invert max-w-none">
//                             <ReactMarkdown
//                                 components={{
//                                     code: CodeBlockComponent,
//                                     pre: ({ children }) => <div className="not-prose">{children}</div>,
//                                 }}
//                             >
//                                 {content}
//                             </ReactMarkdown>
//                         </div>
//                     ) : (
//                         <Textarea
//                             id="content"
//                             placeholder="Tell your story..."
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                             className="min-h-[400px] resize-none border-none focus-visible:ring-0"
//                         />
//                     )}
//                 </div>
//
//                 <div className="space-y-4">
//                     <div>
//                         <Label htmlFor="category">Category</Label>
//                         <Select value={categoryId?.toString()} onValueChange={(value) => setCategoryId(Number(value))}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select a category" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {categories.map((category) => (
//                                     <SelectItem key={category.id} value={category.id.toString()}>
//                                         {category.name}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>
//
//                     <div>
//                         <Label>Tags</Label>
//                         <div className="mt-2 flex flex-wrap gap-2">
//                             {tags.map((tag) => (
//                                 <Button
//                                     key={tag.id}
//                                     variant={selectedTags.includes(tag.id) ? "default" : "outline"}
//                                     size="sm"
//                                     onClick={() => handleTagChange(tag.id)}
//                                 >
//                                     {tag.name}
//                                 </Button>
//                             ))}
//                         </div>
//                     </div>
//
//                     <div>
//                         <Label htmlFor="cover-image">Cover image</Label>
//                         <div className="mt-2">
//                             <input
//                                 type="file"
//                                 id="cover-image"
//                                 ref={fileInputRef}
//                                 onChange={handleImageUpload}
//                                 accept="image/*"
//                                 className="hidden"
//                             />
//                             <Button
//                                 variant="outline"
//                                 className="w-full"
//                                 onClick={() => fileInputRef.current?.click()}
//                                 disabled={isSubmitting}
//                             >
//                                 <ImageIcon className="mr-2 h-4 w-4" />
//                                 {imageUrl ? "Change cover image" : "Upload cover image"}
//                             </Button>
//                             {imageUrl && (
//                                 <div className="mt-2">
//                                     <Image
//                                         src={imageUrl || "/placeholder.svg"}
//                                         alt="Cover preview"
//                                         className="mt-2 h-40 w-full rounded-md object-cover"
//                                         width={100}
//                                         height={100}
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//
//                     <div className="flex items-center space-x-2">
//                         <Switch id="is-public" checked={isPublic} onCheckedChange={setIsPublic} />
//                         <Label htmlFor="is-public">Make this article public</Label>
//                     </div>
//                 </div>
//
//                 <div className="flex justify-end gap-2">
//                     <Button variant="outline" onClick={() => router.push("/profile")}>
//                         Cancel
//                     </Button>
//                     <Button onClick={handleUpdate} disabled={isSubmitting || !title.trim() || !content.trim() || !categoryId}>
//                         {isSubmitting ? "Updating..." : "Update"}
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
