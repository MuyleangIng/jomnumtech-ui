// "use client"
//
// import type React from "react"
//
// import { useState } from "react"
// import Link from "next/link"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { AlertCircle, Home, RefreshCw, Search } from "lucide-react"
//
// interface ErrorPageProps {
//   error?: Error
//   reset?: () => void
// }
//
// export default function ErrorPage({ error, reset }: ErrorPageProps) {
//   const [searchQuery, setSearchQuery] = useState("")
//   const is404 = error?.message === "404" || error?.name === "NotFoundError"
//
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Implement search functionality here
//     console.log("Searching for:", searchQuery)
//   }
//
//   return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8 text-center">
//           <div>
//             <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
//             <h1 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">{is404 ? "404" : "Oops!"}</h1>
//             <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
//               {is404 ? "Page not found" : "Something went wrong"}
//             </p>
//             <p className="mt-2 text-lg text-gray-600">
//               {is404
//                   ? "Sorry, we couldn't find the page you're looking for."
//                   : "An unexpected error occurred. Our team has been notified."}
//             </p>
//           </div>
//
//           <div className="mt-8 space-y-4">
//             <form className="flex items-center" onSubmit={handleSearch}>
//               <Input
//                   type="text"
//                   placeholder="Search for content..."
//                   className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <Button type="submit" className="rounded-l-none">
//                 <Search className="h-4 w-4" />
//                 <span className="sr-only">Search</span>
//               </Button>
//             </form>
//
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Button asChild variant="outline" className="w-full sm:w-auto">
//                 <Link href="/" className="flex items-center justify-center gap-2">
//                   <Home className="h-4 w-4" />
//                   Go to Homepage
//                 </Link>
//               </Button>
//               {!is404 && reset && (
//                   <Button
//                       onClick={() => reset()}
//                       variant="outline"
//                       className="w-full sm:w-auto flex items-center justify-center gap-2"
//                   >
//                     <RefreshCw className="h-4 w-4" />
//                     Try Again
//                   </Button>
//               )}
//             </div>
//           </div>
//
//           <p className="mt-6 text-base text-gray-500">
//             If you think this is a mistake, please{" "}
//             <Link href="/contact" className="font-medium text-primary hover:underline">
//               contact our support team
//             </Link>
//             .
//           </p>
//         </div>
//       </div>
//   )
// }
//
"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft, Home, RefreshCw } from "lucide-react"
import {SearchForm} from "@/components/error/search-form";

interface ErrorPageProps {
  error?: Error
  reset?: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const is404 = error?.message === "404" || error?.name === "NotFoundError"

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">{is404 ? "404" : "Oops!"}</h1>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              {is404 ? "Page not found" : "Something went wrong"}
            </p>
            <p className="mt-2 text-lg text-gray-600">
              {is404
                  ? "Sorry, we couldn't find the page you're looking for."
                  : "An unexpected error occurred. Our team has been notified."}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <SearchForm />

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/" className="flex items-center justify-center gap-2">
                  <Home className="h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
              {!is404 && reset && (
                  <Button
                      onClick={reset}
                      variant="outline"
                      className="w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
              )}
              <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>

          <p className="mt-6 text-base text-gray-500">
            If you think this is a mistake, please{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
  )
}

