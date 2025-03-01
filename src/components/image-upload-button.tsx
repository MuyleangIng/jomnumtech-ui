import type { ChangeEvent, ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface ImageUploadButtonProps {
  id: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  children: ReactNode
  variant?: "default" | "outline" | "ghost" | "secondary"
  className?: string
}

export default function ImageUploadButton({
  id,
  onChange,
  children,
  variant = "default",
  className = "",
}: ImageUploadButtonProps) {
  return (
    <label htmlFor={id} className="cursor-pointer">
      <Button
        variant={variant}
        className={className}
        type="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            document.getElementById(id)?.click()
          }
        }}
      >
        {children}
      </Button>
      <input id={id} type="file" accept="image/*" className="hidden" onChange={onChange} />
    </label>
  )
}

