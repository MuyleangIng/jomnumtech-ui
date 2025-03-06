"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { InstantSearch, SearchBox, Hits, Configure, Highlight } from "react-instantsearch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { format } from "date-fns"
import { algoliasearch } from "algoliasearch"

const searchClient = algoliasearch("0CBCMO4DEL", "f34a1ccf323bdc468ab0463e677c8e01")

type HitProps = {
    hit: {
        objectID: string
        title: string
        content: string
        created_at: string
        slug: string
    }
}

const Hit = ({ hit }: HitProps) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/article/${hit.slug}`)
    }

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground p-4 rounded-lg transition duration-150 ease-in-out"
        >
            <h3 className="text-lg font-semibold mb-2">
                <Highlight attribute="title" hit={hit} />
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{format(new Date(hit.created_at), "MMMM d, yyyy")}</p>
        </div>
    )
}

export function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const openModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                openModal()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [openModal])

    return (
        <>
            <div className="hidden md:block">
                <Button variant="outline" onClick={openModal} className="w-full justify-start text-muted-foreground">
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search...</span>
                    <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="h-5 w-5" />
            </Button>

            <Dialog
                open={isOpen || isSearchOpen}
                onOpenChange={(open) => {
                    setIsOpen(open)
                    setIsSearchOpen(open)
                }}
            >
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Search Articles</DialogTitle>
                    </DialogHeader>
                    <InstantSearch searchClient={searchClient} indexName="articles">
                        <Configure hitsPerPage={5} />
                        <SearchBox
                            placeholder="Search articles..."
                            classNames={{
                                root: "mb-4",
                                form: "relative",
                                input: "w-full",
                                submit: "absolute right-2 top-1/2 transform -translate-y-1/2",
                                submitIcon: "w-4 h-4 fill-current text-gray-400",
                                reset: "hidden",
                            }}
                            render={({ refine }) => (
                                <div className="relative">
                                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                    <Input placeholder="Search articles..." onChange={(e) => refine(e.target.value)} className="pl-8" />
                                </div>
                            )}
                        />
                        <ScrollArea className="h-[300px]">
                            <Hits
                                hitComponent={Hit}
                                classNames={{
                                    list: "space-y-4",
                                }}
                            />
                        </ScrollArea>
                    </InstantSearch>
                </DialogContent>
            </Dialog>
        </>
    )
}

