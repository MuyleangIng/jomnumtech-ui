// "use client"
//
// import { useState } from "react"
// import Link from "next/link"
// import { Bell, Edit, LogIn, Search, User, Webhook, Code } from "lucide-react"
// import { useAuth } from "@/components/auth/AuthContext"
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
// import Image from "next/image"
//
// export function Navbar() {
//   const [authDialogOpen, setAuthDialogOpen] = useState(false)
//   const [authDialogView, setAuthDialogView] = useState<"sign-in" | "sign-up">("sign-in")
//   const { user, logout } = useAuth()
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
//                 {/*<Button variant="ghost" size="icon" asChild>*/}
//                 {/*  <Link href="/search">*/}
//                 {/*    <Search className="h-5 w-5 md:hidden" />*/}
//                 {/*    <span className="sr-only">Search</span>*/}
//                 {/*  </Link>*/}
//                 {/*</Button>*/}
//
//                 <Button
//                     variant="outline"
//                     size="lg"
//                     asChild
//                     className="mx-6 px-6 py-3 flex items-center gap-3 rounded-lg shadow-md
//                         border border-gray-300 hover:border-blue-500
//                         hover:bg-blue-50 transition-all duration-300"
//                 >
//                   <Link href="/playground">
//                     <Code className="w-5 h-5 text-blue-500" />
//                     <span className="text-lg font-semibold text-gray-700">Playground</span>
//                   </Link>
//                 </Button>
//
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
//                 {/*<Button variant="ghost" size="icon" asChild>*/}
//                 {/*  <Link href="/playground">*/}
//                 {/*    <Code className="h-5 w-5" />*/}
//                 {/*    <span className="sr-only">Playground</span>*/}
//                 {/*  </Link>*/}
//                 {/*</Button>*/}
//                 <ThemeToggle />
//
//                 {user ? (
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="rounded-full">
//                           {user.profile_image ? (
//                               <Image
//                                   src={user.profile_image || "/placeholder.svg"}
//                                   alt={user.username || "User"}
//                                   className="h-8 w-8 rounded-full"
//                                   width={100}
//                                   height={100}
//                                   unoptimized
//                               />
//                           ) : (
//                               <User className="h-5 w-5" />
//                           )}
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
//                         <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
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
//
// "use client"
//
// import { useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Bell, Edit, LogIn, Search, User, Webhook, Code, Menu } from "lucide-react"
// import { useAuth } from "@/components/auth/AuthContext"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { AuthDialog } from "@/components/auth/auth-dialog"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
//
// export function Navbar() {
//     const [authDialogOpen, setAuthDialogOpen] = useState(false)
//     const [authDialogView, setAuthDialogView] = useState<"sign-in" | "sign-up">("sign-in")
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//     const { user, logout } = useAuth()
//
//     const handleSignInClick = () => {
//         setAuthDialogView("sign-in")
//         setAuthDialogOpen(true)
//     }
//
//     return (
//         <>
//             {/* Main Navbar */}
//             <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//                 <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//
//                     {/* Left Side (Logo) */}
//                     <Link href="/" className="flex items-center space-x-2">
//                         <Webhook className="h-6 w-6" />
//                         <span className="hidden font-bold md:inline-block">QDev Blog</span>
//                     </Link>
//
//                     {/* Search Bar (Visible on Desktop, Hidden on Mobile) */}
//                     <div className="hidden md:flex flex-1 max-w-sm">
//                         <div className="relative w-full">
//                             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                             <Input
//                                 type="search"
//                                 placeholder="Search articles..."
//                                 className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
//                             />
//                         </div>
//                     </div>
//
//                     {/* Right Side (Nav Icons & Mobile Menu Button) */}
//                     <div className="flex items-center space-x-2">
//
//                         {/* Search Icon (Visible Only on Mobile) */}
//                         <Button variant="ghost" size="icon" className="md:hidden">
//                             <Search className="h-5 w-5" />
//                         </Button>
//
//                         {/* Playground Button - Hidden on Mobile */}
//                         <div className="hidden md:flex">
//                             <Button
//                                 variant="outline"
//                                 size="lg"
//                                 asChild
//                                 className="px-4 py-2 flex items-center gap-3 rounded-lg shadow-md
//                   border border-gray-300 hover:border-blue-500
//                   hover:bg-blue-50 transition-all duration-300"
//                             >
//                                 <Link href="/playground" className="flex items-center gap-2">
//                                     <Code className="w-5 h-5 text-blue-500" />
//                                     <span className="text-lg font-semibold text-gray-700">Playground</span>
//                                 </Link>
//                             </Button>
//                         </div>
//
//                         {/* Notifications */}
//                         <Button variant="ghost" size="icon">
//                             <Bell className="h-5 w-5" />
//                         </Button>
//
//                         {/* Theme Toggle (Dark Mode / Light Mode) */}
//                         <ThemeToggle />
//
//                         {/* User Profile or Auth Buttons */}
//                         {user ? (
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button variant="ghost" size="icon" className="rounded-full">
//                                         {user.profile_image ? (
//                                             <Image
//                                                 src={user.profile_image || "/placeholder.svg"}
//                                                 alt={user.username || "User"}
//                                                 className="h-8 w-8 rounded-full"
//                                                 width={100}
//                                                 height={100}
//                                                 unoptimized
//                                             />
//                                         ) : (
//                                             <User className="h-5 w-5" />
//                                         )}
//                                     </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align="end">
//                                     <DropdownMenuItem asChild>
//                                         <Link href="/profile">Profile</Link>
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem asChild>
//                                         <Link href="/settings">Settings</Link>
//                                     </DropdownMenuItem>
//                                     <DropdownMenuSeparator />
//                                     <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         ) : (
//                             <>
//                                 <Button variant="ghost" size="icon" onClick={handleSignInClick}>
//                                     <LogIn className="h-5 w-5" />
//                                 </Button>
//                             </>
//                         )}
//
//                         {/* Mobile Menu Button */}
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="md:hidden"
//                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                         >
//                             <Menu className="h-6 w-6" />
//                         </Button>
//                     </div>
//                 </div>
//
//                 {/* Mobile Menu (Shows when toggled) */}
//                 {isMobileMenuOpen && (
//                     <div className="absolute top-16 left-0 w-full bg-white shadow-md border-b p-4 flex flex-col space-y-3 md:hidden">
//                         {/* Playground (Moved to Mobile Menu) */}
//                         <Link href="/playground" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//                             <Code className="w-5 h-5 text-blue-500" />
//                             <span className="text-lg font-semibold text-gray-700">Playground</span>
//                         </Link>
//
//                         {/* Write Article (Moved to Mobile Menu) */}
//                         <Link href="/write" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//                             <Edit className="h-5 w-5" />
//                             <span>Write Article</span>
//                         </Link>
//
//                         {/* Notifications */}
//                         <Link href="/notifications" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//                             <Bell className="h-5 w-5" />
//                             <span>Notifications</span>
//                         </Link>
//
//                         {/* Profile */}
//                         <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//                             <User className="h-5 w-5" />
//                             <span>Profile</span>
//                         </Link>
//                     </div>
//                 )}
//             </header>
//
//             <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialView={authDialogView} />
//         </>
//     )
// }
"use client"

import {useEffect, useRef, useState} from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, Edit, LogIn, Search, User, Webhook, Code, Menu, X } from "lucide-react"
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
// import {Notifications} from "@/components/Notifications";

export function Navbar() {
    const [authDialogOpen, setAuthDialogOpen] = useState(false)
    const [authDialogView, setAuthDialogView] = useState<"sign-in" | "sign-up">("sign-in")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false) // 🔍 State for search popup
    const { user, logout , tokens } = useAuth()
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleSignInClick = () => {
        setAuthDialogView("sign-in")
        setAuthDialogOpen(true)
    }
    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])
    return (
        <>
            {/* Main Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">

                    {/* Left Side (Logo) */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Webhook className="h-6 w-6" />
                        <span className="hidden font-bold md:inline-block">QDev Blog</span>
                    </Link>

                    {/* Search Bar (Visible on Desktop, Hidden on Mobile) */}
                    <div className="hidden md:flex flex-1 max-w-sm">
                        <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search articles..."
                                className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                            />
                        </div>
                    </div>

                    {/* Right Side (Nav Icons & Mobile Menu Button) */}
                    <div className="flex items-center space-x-2 md:space-x-4">

                        {/* Search Icon (Opens Popup on Mobile) */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Playground Button - Hidden on Mobile */}
                        <div className="hidden md:flex">
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="px-4 py-2 flex items-center gap-3 rounded-lg shadow-md
                  border border-gray-300 hover:border-blue-500
                  hover:bg-blue-50 transition-all duration-300"
                            >
                                <Link href="/playground" className="flex items-center gap-2">
                                    <Code className="w-5 h-5 text-blue-500" />
                                    <span className="text-lg font-semibold text-gray-700">Playground</span>
                                </Link>
                            </Button>
                        </div>

                        {/*/!* Notifications *!/*/}
                        {/*<Button variant="ghost" size="icon">*/}
                        {/*    <Bell className="h-5 w-5" />*/}
                        {/*</Button>*/}
                         Notifications (Bell Icon)
                         Notifications (Bell Icon) with Alert Count
                        <div className="relative">
                            <Button variant="ghost" size="icon" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
                                <Bell className="h-5 w-5" />
                                {/* Notification Badge (Only shows if there are notifications) */}
                                {3 > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                3
            </span>
                                )}
                            </Button>

                            {/* Notification Dropdown (Centered Below) */}
                            {isNotificationsOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-1/2 translate-x-1/2 mt-2 w-64 bg-white shadow-md border rounded-lg p-3 z-50"
                                >
                                    <p className="text-sm font-semibold">Notifications</p>
                                    <ul className="mt-2 space-y-2">
                                        <li className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">🔔 New article published!</li>
                                        <li className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">📩 You have a new message</li>
                                        <li className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">🚀 Check out our latest update!</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        {/*<Notifications />*/}
                        <Button variant="ghost" size="icon" asChild>
                           <Link href="/write">
                             <Edit className="h-5 w-5" />
                             <span className="sr-only">Write</span>
                           </Link>
                         </Button>

                        {/* Theme Toggle (Dark Mode / Light Mode) */}
                        <ThemeToggle />

                        {/* User Profile or Auth Buttons */}
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        {user.profile_image ? (
                                            <Image
                                                src={user.profile_image || "/placeholder.svg"}
                                                alt={user.username || "User"}
                                                className="h-8 w-8 rounded-full"
                                                width={100}
                                                height={100}
                                                unoptimized
                                            />
                                        ) : (
                                            <User className="h-5 w-5" />
                                        )}
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
                                <Button variant="ghost" size="icon" onClick={handleSignInClick}>
                                    <LogIn className="h-5 w-5" />
                                </Button>
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* 🔍 Search Popup (Positioned Below Navbar) */}
            {isSearchOpen && (
                <div className="absolute left-0 right-0 top-16 bg-white shadow-md border-t p-4 flex items-center z-40">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search articles..."
                            className="w-full rounded-full bg-background pl-8"
                            autoFocus
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            )}

            {/* Mobile Menu (Shows when toggled) */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md border-b p-4 flex flex-col space-y-3 md:hidden z-50">
                    {/* Playground (Moved to Mobile Menu) */}
                    <Link href="/playground" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <Code className="w-5 h-5 text-blue-500" />
                        <span className="text-lg font-semibold text-gray-700">Playground</span>
                    </Link>

                    {/* Write Article (Moved to Mobile Menu) */}
                    <Link href="/write" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <Edit className="h-5 w-5" />
                        <span>Write Article</span>
                    </Link>

                    {/* Notifications */}
                    <Link href="/notifications" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <Bell className="h-5 w-5" />
                        <span>Notifications</span>
                    </Link>

                    {/* Profile */}
                    <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                    </Link>
                </div>
            )}

            <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} initialView={authDialogView} />
        </>
    )
}
