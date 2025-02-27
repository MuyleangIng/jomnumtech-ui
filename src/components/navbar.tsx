"use client"

import Link from "next/link"
import {Bell, Edit, Search, User, Webhook} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  // const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center space-x-2">
            {/*<BookOpen className="h-6 w-6" />*/}
            <Webhook  className="h-6 w-6"/>
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
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

