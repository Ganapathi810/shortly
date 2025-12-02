"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export const CopyLink = ({ link }: { link: string }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy link:", err)
        }
    }


    return (
        <button 
            onClick={handleCopy}
            className="p-1 flex items-center justify-center hover:bg-cyan-500/10 rounded cursor-pointer">
            {copied ? (
                <Check className="size-4 sm:size-5 text-cyan-500" />
            ) : (
                <Copy className="size-4 sm:size-5 text-cyan-500" />
            )}
        </button>
    )
}