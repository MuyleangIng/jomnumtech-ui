"use client"

import * as React from "react"
import { Check, ChevronsUpDown, FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const templates = [
  { value: "blog-post", label: "Blog Post" },
  { value: "tutorial", label: "Tutorial" },
  { value: "news-article", label: "News Article" },
  { value: "product-review", label: "Product Review" },
  { value: "opinion-piece", label: "Opinion Piece" },
]

export function TemplateDropdown({ onSelect }: { onSelect: (template: string) => void }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[160px] justify-between">
          <FileText className="mr-2 h-4 w-4" />
          {value ? templates.find((template) => template.value === value)?.label : "Templates"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search template..." />
          <CommandList>
            <CommandEmpty>No template found.</CommandEmpty>
            <CommandGroup>
              {templates.map((template) => (
                <CommandItem
                  key={template.value}
                  onSelect={() => {
                    setValue(template.value)
                    setOpen(false)
                    onSelect(template.value)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === template.value ? "opacity-100" : "opacity-0")} />
                  {template.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

