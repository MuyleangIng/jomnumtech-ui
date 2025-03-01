"use client"

import { useEffect, useRef } from "react"
import sdk from "@stackblitz/sdk"

export default function PlaygroundPage() {
    const embedRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (embedRef.current) {
            sdk.embedProjectId(embedRef.current, "react-ts", {
                forceEmbedLayout: true,
                openFile: "src/App.tsx",
                hideExplorer: false,
                hideNavigation: false,
                height: "100%",
            })
        }
    }, [])

    return (
        <div className="flex flex-col h-[calc(100vh-64px)]">
            <div ref={embedRef} className="flex-1 w-full border border-gray-300" />
        </div>
    )
}

