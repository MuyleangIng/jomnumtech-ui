"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Upload, LinkIcon } from "lucide-react"
import Image from "next/image"

interface ImagePreviewDialogProps {
  onImageSelected: (url: string) => void
  uploadImage: (file: File) => Promise<{ url: string }>
  children: React.ReactNode
}

export default function ImagePreviewDialog({ onImageSelected, uploadImage, children }: ImagePreviewDialogProps) {
  const [open, setOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    setSelectedFile(file)

    // Create a preview URL
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // Clean up the object URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      setIsUploading(true)
      const result = await uploadImage(selectedFile)
      setImageUrl(result.url)
      onImageSelected(result.url)
      setOpen(false)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleUrlSubmit = () => {
    if (imageUrl) {
      onImageSelected(imageUrl)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Image</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <label
                htmlFor="image-upload"
                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/50 px-4 py-5 text-center"
              >
                {previewUrl ? (
                  <div className="relative h-full w-full">
                    <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                  </div>
                ) : (
                  <>
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drag and drop or click to upload</p>
                  </>
                )}
                <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
              <Button onClick={handleUpload} disabled={!selectedFile || isUploading} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload and Insert"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="url" className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                {imageUrl && (
                  <div className="relative mt-2 h-32 w-full overflow-hidden rounded-md border">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      fill
                      className="object-contain"
                      onError={() => setImageUrl("")}
                    />
                  </div>
                )}
              </div>
              <Button onClick={handleUrlSubmit} disabled={!imageUrl}>
                <LinkIcon className="mr-2 h-4 w-4" />
                Insert Image
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

