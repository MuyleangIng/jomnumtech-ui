// "use client"
//
// import Link from "next/link"
// import {Bell, Edit, Search, User, Webhook} from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ThemeToggle } from "@/components/theme-toggle"
//
// export function Navbar() {
//   // const pathname = usePathname()
//
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center">
//         <div className="flex items-center gap-2 md:gap-4">
//           <Link href="/" className="flex items-center space-x-2">
//             {/*<BookOpen className="h-6 w-6" />*/}
//             <Webhook  className="h-6 w-6"/>
//             <span className="hidden font-bold sm:inline-block">QDev Blog</span>
//           </Link>
//         </div>
//
//         <div className="flex flex-1 items-center justify-end space-x-4">
//           <div className="relative hidden w-full max-w-sm md:flex">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search articles..."
//               className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
//             />
//           </div>
//
//           <nav className="flex items-center space-x-2">
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="/search">
//                 <Search className="h-5 w-5 md:hidden" />
//                 <span className="sr-only">Search</span>
//               </Link>
//             </Button>
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="/notifications">
//                 <Bell className="h-5 w-5" />
//                 <span className="sr-only">Notifications</span>
//               </Link>
//             </Button>
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="/write">
//                 <Edit className="h-5 w-5" />
//                 <span className="sr-only">Write</span>
//               </Link>
//             </Button>
//             <ThemeToggle />
//             <Button variant="ghost" size="icon" className="rounded-full" asChild>
//               <Link href="/profile">
//                 <User className="h-5 w-5" />
//                 <span className="sr-only">Profile</span>
//               </Link>
//             </Button>
//           </nav>
//         </div>
//       </div>
//     </header>
//   )
// }
//
// "use client"
//
// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { Bell, Edit, LogIn, Search, User, Webhook } from "lucide-react"
// import { useSession, signOut } from "next-auth/react"
//
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { AuthDialog } from "@/components/auth/auth-dialog"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
//
// export function Navbar() {
//   usePathname();
//   // const { data: session, status } = useSession()
//   const status = null
//   const [authDialogOpen, setAuthDialogOpen] = useState(false)
//   const [authDialogView, setAuthDialogView] = useState<"sign-in" | "sign-up">("sign-in")
//
//   const handleSignInClick = () => {
//     setAuthDialogView("sign-in")
//     setAuthDialogOpen(true)
//   }
//
//   const handleGetStartedClick = () => {
//     setAuthDialogView("sign-up")
//     setAuthDialogOpen(true)
//   }
//
//   return (
//       <>
//         <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//           <div className="container flex h-16 items-center">
//             <div className="flex items-center gap-2 md:gap-4">
//               <Link href="/" className="flex items-center space-x-2">
//                 <Webhook className="h-6 w-6" />
//                 <span className="hidden font-bold sm:inline-block">QDev Blog</span>
//               </Link>
//             </div>
//
//             <div className="flex flex-1 items-center justify-end space-x-4">
//               <div className="relative hidden w-full max-w-sm md:flex">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                     type="search"
//                     placeholder="Search articles..."
//                     className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
//                 />
//               </div>
//
//               <nav className="flex items-center space-x-2">
//                 <Button variant="ghost" size="icon" asChild>
//                   <Link href="/search">
//                     <Search className="h-5 w-5 md:hidden" />
//                     <span className="sr-only">Search</span>
//                   </Link>
//                 </Button>
//                 <Button variant="ghost" size="icon" asChild>
//                   <Link href="/notifications">
//                     <Bell className="h-5 w-5" />
//                     <span className="sr-only">Notifications</span>
//                   </Link>
//                 </Button>
//                 <Button variant="ghost" size="icon" asChild>
//                   <Link href="/write">
//                     <Edit className="h-5 w-5" />
//                     <span className="sr-only">Write</span>
//                   </Link>
//                 </Button>
//                 <ThemeToggle />
//
//                 {status === "authenticated" ? (
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="rounded-full">
//                           {/*{session.user?.image ? (*/}
//                           {/*    <img*/}
//                           {/*        src={session.user.image || "/placeholder.svg"}*/}
//                           {/*        alt={session.user.name || "User"}*/}
//                           {/*        className="h-8 w-8 rounded-full"*/}
//                           {/*    />*/}
//                           {/*) : (*/}
//                           {/*    <User className="h-5 w-5" />*/}
//                           {/*)}*/}
//                           <span className="sr-only">Profile</span>
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem asChild>
//                           <Link href="/profile">Profile</Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem asChild>
//                           <Link href="/settings">Settings</Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         {/*<DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>*/}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                 ) : (
//                     <>
//                       <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSignInClick}>
//                         <LogIn className="h-5 w-5" />
//                         <span className="sr-only">Sign in</span>
//                       </Button>
//                       <Button variant="ghost" className="rounded-full" onClick={handleGetStartedClick}>
//                         <span>Get Started</span>
//                       </Button>
//                     </>
//                 )}
//               </nav>
//             </div>
//           </div>
//         </header>
//
//         <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialView={authDialogView} />
//       </>
//   )
// }



"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Edit, LogIn, Search, User, Webhook } from "lucide-react"
import { useAuth } from "@/components/auth/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthDialog } from "@/components/auth/auth-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";

export function Navbar() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authDialogView, setAuthDialogView] = useState<"sign-in" | "sign-up">("sign-in")
  const { user, logout } = useAuth()

  const handleSignInClick = () => {
    setAuthDialogView("sign-in")
    setAuthDialogOpen(true)
  }

  const handleGetStartedClick = () => {
    setAuthDialogView("sign-up")
    setAuthDialogOpen(true)
  }

  return (
      <>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <Webhook className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">QDev Blog</span>
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-end space-x-4">
              <div className="relative hidden w-full max-w-sm md:flex">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search articles..."
                    className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                />
              </div>

              <nav className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/search">
                    <Search className="h-5 w-5 md:hidden" />
                    <span className="sr-only">Search</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/notifications">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/write">
                    <Edit className="h-5 w-5" />
                    <span className="sr-only">Write</span>
                  </Link>
                </Button>
                <ThemeToggle />

                {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          {user.profile_image ? (
                              <Image
                                  src={user.profile_image || "/placeholder.svg"}
                                  alt={user.username || "User"}
                                  className="h-8 w-8 rounded-full"
                              />
                          ) : (
                              <User className="h-5 w-5" />
                          )}
                          <span className="sr-only">Profile</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/settings">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
                      <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSignInClick}>
                        <LogIn className="h-5 w-5" />
                        <span className="sr-only">Sign in</span>
                      </Button>
                      <Button variant="ghost" className="rounded-full" onClick={handleGetStartedClick}>
                        <span>Get Started</span>
                      </Button>
                    </>
                )}
              </nav>
            </div>
          </div>
        </header>

        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialView={authDialogView} />
      </>
  )
}

