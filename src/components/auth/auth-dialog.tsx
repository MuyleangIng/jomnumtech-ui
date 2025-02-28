// "use client"
//
// import { useState } from "react"
// import { X } from "lucide-react"
// import Link from "next/link"
//
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { SignInForm } from "@/components/auth/sign-in-form"
// import { SignUpForm } from "@/components/auth/sign-up-form"
//
// interface AuthDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   initialView?: "sign-in" | "sign-up"
// }
//
// export function AuthDialog({ open, onOpenChange, initialView = "sign-in" }: AuthDialogProps) {
//   const [view, setView] = useState<"sign-in" | "sign-up">(initialView)
//
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text-center text-2xl font-bold">
//             {view === "sign-in" ? "Welcome back." : "Join QDev Blog."}
//           </DialogTitle>
//           <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => onOpenChange(false)}>
//             {/*<X className="h-4 w-4" />*/}
//             <span className="sr-only">Close</span>
//           </Button>
//         </DialogHeader>
//
//         {view === "sign-in" ? <SignInForm /> : <SignUpForm />}
//
//         <div className="mt-4 text-center text-sm">
//           {view === "sign-in" ? (
//             <p>
//               No account?{" "}
//               <button
//                 onClick={() => setView("sign-up")}
//                 className="text-primary underline underline-offset-4 hover:text-primary/90"
//               >
//                 Create one
//               </button>
//             </p>
//           ) : (
//             <p>
//               Already have an account?{" "}
//               <button
//                 onClick={() => setView("sign-in")}
//                 className="text-primary underline underline-offset-4 hover:text-primary/90"
//               >
//                 Sign in
//               </button>
//             </p>
//           )}
//         </div>
//
//         <div className="mt-4 text-center text-xs text-muted-foreground">
//           Click &#34;Sign in&#34; to agree to QDev Blog&#39;s{" "}
//           <Link href="/terms" className="underline underline-offset-4">
//             Terms of Service
//           </Link>{" "}
//           and acknowledge that QDev Blog&#39;s{" "}
//           <Link href="/privacy" className="underline underline-offset-4">
//             Privacy Policy
//           </Link>{" "}
//           applies to you.
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
//
"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SignUpForm } from "@/components/auth/sign-up-form"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialView?: "sign-in" | "sign-up"
}

export function AuthDialog({ open, onOpenChange, initialView = "sign-in" }: AuthDialogProps) {
  const [view, setView] = useState<"sign-in" | "sign-up">(initialView)

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-center text-2xl font-bold">
              {view === "sign-in" ? "Welcome back." : "Join QDev Blog."}
            </DialogTitle>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>

          {view === "sign-in" ? <SignInForm /> : <SignUpForm />}

          <div className="mt-4 text-center text-sm">
            {view === "sign-in" ? (
                <p>
                  No account?{" "}
                  <button
                      onClick={() => setView("sign-up")}
                      className="text-primary underline underline-offset-4 hover:text-primary/90"
                  >
                    Create one
                  </button>
                </p>
            ) : (
                <p>
                  Already have an account?{" "}
                  <button
                      onClick={() => setView("sign-in")}
                      className="text-primary underline underline-offset-4 hover:text-primary/90"
                  >
                    Sign in
                  </button>
                </p>
            )}
          </div>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            Click &#34;Sign in&#34; to agree to QDev Blog&#39;s{" "}
            <Link href="/terms" className="underline underline-offset-4">
              Terms of Service
            </Link>{" "}
            and acknowledge that QDev Blog&#39;s{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>{" "}
            applies to you.
          </div>
        </DialogContent>
      </Dialog>
  )
}

