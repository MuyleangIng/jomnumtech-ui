import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ErrorMessageProps {
  title: string
  message: string
  canRetry?: boolean
  onRetry?: () => void
}

export function ErrorMessage({ title, message, canRetry = false, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">{message}</p>
      <div className="flex gap-4">
        {canRetry && (
          <Button onClick={onRetry} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
        <Button asChild variant="outline">
          <Link href="/public">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}

