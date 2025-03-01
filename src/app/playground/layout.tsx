import type React from "react"
import { Navbar } from "@/components/navbar"

export default function PlaygroundLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
        </div>
    )
}

