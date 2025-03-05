"use client"

import type React from "react"

import { type ChangeEvent, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Settings, Upload, ZoomIn, ZoomOut, Camera, X } from "lucide-react"
import { useAuth } from "@/components/auth/AuthContext"
import { redirect } from "next/navigation"
import { uploadImage, updateUser as updateUserService} from "@/lib/api"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import Cropper from "react-easy-crop"
import type { Area } from "react-easy-crop/types"
import {useToggleVisibility} from "@/hook/aritcles/useToggleVisibility";
import {useFetchMyArticles} from "@/hook/aritcles/useFetchMyArticles";
import {useDeleteArticle} from "@/hook/aritcles/useDeleteArticle";
import {formatDate, calculateReadTime} from "@/lib/utils";

declare global {
  interface Window {
    Image: typeof Image
  }
}

export interface User {
  id: number
  email: string
  username: string
  slug?: string | null
  profile_image?: string | null
  cover_image?: string | null
  bio?: string | null
  about_me?: string | null
  social_links?: string[]
  contact_number?: string
  location?: string
  total_followers: number
  total_following: number
  credits: number
  total_earned_credits: number
  total_spent_credits: number
}

export interface Article {
  slug: string
  id: number
  title: string
  subtitle: string
  content: string
  image_url: string
  is_public: boolean
  category_id: number
  author_id: number
  created_at: string
  views: number
  total_likes: number
  total_comments: number
  total_shares: number
  total_bookmarks: number
  tags: { id: number; name: string }[]
}

type AuthTokens = {
  access_token: string
  refresh_token: string
  token_type: string
}

export default function ProfilePage() {
  const { user, tokens, updateUser: setUser } = useAuth()
  const { articles, loadingArticles, error, updateArticleVisibility, setArticles } = useFetchMyArticles()
  const { toggleVisibility, loadingArticle } = useToggleVisibility()
  const [coverImage, setCoverImage] = useState(user?.cover_image || "/placeholder.svg?height=300&width=1200")
  const [profileImage, setProfileImage] = useState(user?.profile_image || "/default-avatar.png")
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<Partial<User>>({})

  // Image cropping state
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [cropperOpen, setCropperOpen] = useState(false)
  const [uploadType, setUploadType] = useState<"profile" | "cover">("profile")
  // Handle file input for both profile and cover images
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, type: "profile" | "cover") => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImageSrc(reader.result as string)
      setUploadType(type)
      setCropperOpen(true)
      // Reset crop and zoom for new image
      setCrop({ x: 0, y: 0 })
      setZoom(1)
    }
  }
  const { deleteArticle, isDeleting } = useDeleteArticle()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null)
  const [inputValue, setInputValue] = useState("")
  const isConfirmDisabled = inputValue !== "DELETE" // ✅ Disable button unless correct input

  const confirmDelete = async () => {
    if (!articleToDelete) return

    const success = await deleteArticle(articleToDelete.id)
    if (success) {
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleToDelete.id))
      setDeleteDialogOpen(false) // Close the dialog after successful deletion
    }
  }

  // Handle crop complete
  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  // Create a cropped image from the source
  const createCroppedImage = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
    const image = new window.Image()
    image.src = imageSrc

    // Create a canvas to draw the cropped image
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("No 2d context")
    }

    // Set canvas dimensions to the cropped size
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // Wait for image to load
    await new Promise((resolve) => {
      image.onload = resolve
      image.crossOrigin = "anonymous"
    })

    // Draw the cropped image
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
    )

    // Get the data as blob
    return new Promise((resolve) => {
      canvas.toBlob(
          (blob) => {
            if (!blob) throw new Error("Canvas is empty")
            resolve(blob)
          },
          "image/jpeg",
          0.95,
      )
    })
  }

  // Upload the cropped image
  const uploadCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    setLoading(true)
    try {
      // Create cropped image
      const croppedImage = await createCroppedImage(imageSrc, croppedAreaPixels)

      // Create file from blob
      const file = new File([croppedImage], `${uploadType}-image-${Date.now()}.jpg`, { type: "image/jpeg" })

      // Upload to server
      const data = await uploadImage(file)

      // Prepare the update payload
      const updatePayload: Partial<User> = {}
      if (uploadType === "profile") {
        updatePayload.profile_image = data.image_url
        setProfileImage(data.image_url)
      } else {
        updatePayload.cover_image = data.image_url
        setCoverImage(data.image_url)
      }

      // Update user profile
      await updateProfile(updatePayload)

      // Close cropper dialog
      setCropperOpen(false)
      setImageSrc(null)

      toast({
        title: "Image uploaded",
        description: `Your ${uploadType} image has been successfully updated.`,
      })
    } catch (error) {
      console.error("Upload failed:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  const updateProfile = async (updatedFields: Partial<User>) => {
    if (!tokens?.access_token) {
      console.error("No authentication token provided")
      return
    }

    setLoading(true)
    try {
      const updatedUser = await updateUserService(tokens.access_token, updatedFields)
      if (updatedUser) {
        setUser(updatedUser)
        setEditedUser({})
        setIsEditing(false)
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        })
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedUser({ ...editedUser, [name]: value })
  }

  const handleSocialLinkChange = (index: number, value: string) => {
    const updatedLinks = [...(editedUser.social_links || user?.social_links || [])]
    updatedLinks[index] = value
    setEditedUser({ ...editedUser, social_links: updatedLinks })
  }

  const addSocialLink = () => {
    setEditedUser({
      ...editedUser,
      social_links: [...(editedUser.social_links || user?.social_links || []), ""],
    })
  }

  const removeSocialLink = (index: number) => {
    const updatedLinks = [...(editedUser.social_links || user?.social_links || [])]
    updatedLinks.splice(index, 1)
    setEditedUser({ ...editedUser, social_links: updatedLinks })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateProfile(editedUser)
  }

  if (!user) {
    redirect("/")
  }



  return (
      <div>
        {/* Cover Image Section */}
        <div className="relative h-48 w-full sm:h-64 md:h-80 overflow-hidden">
          <Image src={coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          {/* Cover Image Upload Button */}
          <label
              htmlFor="coverUpload"
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-black p-2 rounded-full cursor-pointer shadow-md transition-all duration-200 flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            <span className="text-sm font-medium">Change Cover</span>
            <input
                id="coverUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "cover")}
            />
          </label>
        </div>

        {/* Profile Info */}
        <div className="container max-w-5xl">
          <div className="relative -mt-[3rem] flex flex-col items-center px-4 sm:flex-row sm:items-end sm:px-0">
            {/* Profile Picture with Upload Overlay */}
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-background sm:h-40 sm:w-40">
                <AvatarImage src={profileImage} alt={user.username || "User"} />
                <AvatarFallback>{user.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>

                {/* Profile Upload Overlay */}
                <label
                    htmlFor="profileUpload"
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
                >
                  <Upload className="h-6 w-6 text-white" />
                  <span className="text-white text-xs mt-1">Update</span>
                  <input
                      id="profileUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "profile")}
                  />
                </label>
              </Avatar>
            </div>

            {/* Profile Details */}
            <div className="mt-4 flex flex-1 flex-col items-center space-y-4 sm:ml-6 sm:items-start">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold sm:text-3xl">{user.username || "User"}</h1>
                <p className="text-muted-foreground">@{user.username || "username"}</p>
              </div>

              {/* Follower & Following Counts */}
              <div className="flex w-full flex-wrap items-center justify-center gap-4 sm:justify-start">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-bold">{user.total_followers}</span>
                    <span className="ml-1 text-muted-foreground">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold">{user.total_following}</span>
                    <span className="ml-1 text-muted-foreground">Following</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Joined {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
                <div className="mt-4 flex gap-2 sm:mt-0">
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:px-0">
            <p className="max-w-2xl">{user.bio || "No bio available. Add a bio to tell others about yourself."}</p>
          </div>

          {/* Profile Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="articles">
              <TabsList className="w-full justify-start border-b bg-transparent p-0">
                <TabsTrigger
                    value="articles"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Articles
                </TabsTrigger>
                <TabsTrigger
                    value="about"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  About
                </TabsTrigger>
              </TabsList>
              <TabsContent value="articles" className="mt-6 space-y-8">
                {articles.length === 0 ? (
                    <div className="text-center py-8">Loading articles...</div>
                ) : (
                    articles.map((article) => (
                        <article
                            key={article.id}
                            className="space-y-2 border-b pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <Link href={`/article/${article.slug}`}>
                                <h2 className="text-xl font-bold hover:underline">{article.title}</h2>
                              </Link>
                              <p className="text-muted-foreground">{article.subtitle}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{formatDate(article.created_at)}</span>
                                <span>·</span>
                                <span>{calculateReadTime(article.content)}</span>
                                <span>·</span>
                                <span>{article.views} views</span>
                                <span>·</span>
                                <span>{article.total_likes} likes</span>
                              </div>
                            </div>

                            {/* Improved Dropdown Menu */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    aria-label="Article options"
                                >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="currentColor"
                                      className="text-muted-foreground"
                                  >
                                    <circle cx="8" cy="2.5" r="1.5" />
                                    <circle cx="8" cy="8" r="1.5" />
                                    <circle cx="8" cy="13.5" r="1.5" />
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

                                {/* TODO : Handle toggle visibility*/}
                                <DropdownMenuItem onClick={() => toggleVisibility(article.id, article.is_public, updateArticleVisibility)} className="flex items-center cursor-pointer" disabled={loadingArticle === article.id}>
                                  {loadingArticle === article.id ? (
                                      <>
                                        <svg
                                            className="animate-spin mr-2 h-4 w-4 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                          <path
                                              fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                          ></path>
                                        </svg>
                                        <span>Updating...</span>
                                      </>
                                  ) : article.is_public ? (
                                      <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2 h-4 w-4 text-green-500"
                                        >
                                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                          <circle cx="12" cy="12" r="3" />
                                        </svg>
                                        <span>Make Private</span>
                                      </>
                                  ) : (
                                      <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2 h-4 w-4 text-gray-500"
                                        >
                                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                          <line x1="2" x2="22" y1="2" y2="22" />
                                        </svg>
                                        <span>Make Public</span>
                                      </>
                                  )}
                                </DropdownMenuItem>
                                {/* TODO : Close Handle toggle visibility*/}

                                <DropdownMenuItem asChild>
                                  <Link href={`/article/${article.id}/stats`} className="flex items-center cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-2 h-4 w-4"
                                    >
                                      <path d="M3 3v18h18" />
                                      <path d="m19 9-5 5-4-4-3 3" />
                                    </svg>
                                    <span>View Stats</span>
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center cursor-pointer">
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mr-2 h-4 w-4"
                                  >
                                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                  </svg>
                                  <span>Duplicate</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                      setArticleToDelete(article)
                                      setDeleteDialogOpen(true)
                                    }}
                                    className="flex items-center cursor-pointer text-red-500 focus:text-red-500"
                                >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mr-2 h-4 w-4"
                                  >
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    <line x1="10" x2="10" y1="11" y2="17" />
                                    <line x1="14" x2="14" y1="11" y2="17" />
                                  </svg>
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {loadingArticle === article.id && (
                              <div className="flex items-center text-sm text-muted-foreground mt-2">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                  <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                  ></circle>
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
                    ))

                )}
              </TabsContent>
              <TabsContent value="about" className="mt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h2>About {user.username || "User"}</h2>
                  <p>{user.about_me || "This user"} is a writer and content creator on our platform.</p>
                  <p>
                    They have published {articles.length} articles and have {user.total_followers} followers.
                  </p>
                  <p>
                    Credits: {user.credits} (Earned: {user.total_earned_credits}, Spent: {user.total_spent_credits})
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-red-500">Delete Article</DialogTitle>
              <p className="text-muted-foreground">
                ⚠️ This action **cannot be undone**. Type <strong>&#34;DELETE&#34;</strong> in the box below to confirm.
              </p>
            </DialogHeader>

            {/* User input confirmation */}
            <div className="mt-4">
              <Input
                  placeholder="Type DELETE to confirm"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  disabled={isConfirmDisabled || isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Edit Profile Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Update your profile information. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right">
                    Username
                  </label>
                  <Input
                      id="username"
                      name="username"
                      value={editedUser.username || user.username || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="bio" className="text-right">
                    Bio
                  </label>
                  <Textarea
                      id="bio"
                      name="bio"
                      value={editedUser.bio || user.bio || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="about_me" className="text-right">
                    About Me
                  </label>
                  <Textarea
                      id="about_me"
                      name="about_me"
                      value={editedUser.about_me || user.about_me || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="location" className="text-right">
                    Location
                  </label>
                  <Input
                      id="location"
                      name="location"
                      value={editedUser.location || user.location || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="contact_number" className="text-right">
                    Contact Number
                  </label>
                  <Input
                      id="contact_number"
                      name="contact_number"
                      value={editedUser.contact_number || user.contact_number || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label className="text-right mt-2">Social Links</label>
                  <div className="col-span-3 space-y-2">
                    {(editedUser.social_links || user.social_links || []).map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                              value={link}
                              onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                              placeholder="https://example.com"
                          />
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addSocialLink}>
                      Add Social Link
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Image Cropper Dialog */}
        <Dialog open={cropperOpen} onOpenChange={setCropperOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{uploadType === "profile" ? "Crop Profile Picture" : "Crop Cover Image"}</DialogTitle>
              <DialogDescription>
                Drag to position and use the slider to zoom. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <div className="relative h-[300px] w-full mt-4">
              {imageSrc && (
                  <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={uploadType === "profile" ? 1 : 16 / 9}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      cropShape={uploadType === "profile" ? "round" : "rect"}
                      showGrid={true}
                  />
              )}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <ZoomOut className="h-4 w-4 text-muted-foreground" />
              <Slider
                  value={[zoom]}
                  min={1}
                  max={3}
                  step={0.1}
                  onValueChange={(value) => setZoom(value[0])}
                  className="flex-1"
              />
              <ZoomIn className="h-4 w-4 text-muted-foreground" />
            </div>

            <DialogFooter className="mt-4">
              <Button
                  variant="outline"
                  onClick={() => {
                    setCropperOpen(false)
                    setImageSrc(null)
                  }}
              >
                Cancel
              </Button>
              <Button onClick={uploadCroppedImage} disabled={loading}>
                {loading ? "Uploading..." : "Save & Upload"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )

}

