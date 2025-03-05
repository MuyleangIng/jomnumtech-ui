"use client"

import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {useDeleteArticle} from "@/hook/aritcles/useDeleteArticle";

export function DeleteArticleButton({ article }) {
    const { deleteArticle, isDeleting } = useDeleteArticle()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleDeleteArticle = async () => {
        setIsSubmitting(true)
        const success = await deleteArticle(article.id)
        if (success) {
            setDeleteDialogOpen(false)
        }
        setIsSubmitting(false)
    }

    return (
        <>
            {/* Dropdown Item for Delete */}
            <DropdownMenuItem
                onClick={() => setDeleteDialogOpen(true)}
                className="flex items-center cursor-pointer text-red-500 focus:text-red-500"
                disabled={isDeleting}
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

            {/* Confirm Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Article</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this article? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteArticle} disabled={isSubmitting}>
                            {isSubmitting ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
