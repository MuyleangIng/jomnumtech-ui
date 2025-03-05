import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function formatDate(dateString: string): string {
//   const date = new Date(dateString)
//
//   // Check if date is valid
//   if (isNaN(date.getTime())) {
//     return "Invalid date"
//   }
//
//   // Format: "Jan 1, 2023"
//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   })
// }



// Format date for display
export  const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Calculate read time (roughly 200 words per minute)
export const calculateReadTime = (content: string) => {
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)
  return `${readTime} min read`
}
