"use client"

import { useState } from "react";

import { AvatarDropdown } from "@/app/components/avatar-dropdown";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function NavLinksWithAvatar() {
    const pathname = usePathname()
    const [open, setOpen] = useState<boolean>(false)

    const links = [
        { href: "/", label: "Dashboard"},
        { href: "/healthcheck", label: "Health check"}
    ]
    
    return (
        <>
            <div className="hidden md:flex md:gap-3 md:items-center">
                <nav className="flex gap-4 items-center mr-4">
                    {links.map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href}
                            className={`font-semibold px-3 py-2.5 rounded ${
                                pathname === link.href 
                                    ? 'bg-cyan-600 ring-1 text-white ring-cyan-500/40' 
                                    : 'hover:bg-cyan-300/20'
                            } `}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <AvatarDropdown />
            </div>

            <div className="flex md:hidden items-center gap-2">
                <AvatarDropdown /> 
                <Button
                    variant={"ghost"}
                    className="hover:bg-cyan-400/20 cursor-pointer"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {open ? <X className="size-5" /> : <Menu className="size-5" /> }
                </Button>  
            </div>

            {open && (
                <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-white md:hidden">
                    <nav className="flex flex-col gap-2 p-4">
                        {links.map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={`font-semibold px-3 py-2.5 rounded ${
                                    pathname === link.href 
                                        ? 'bg-cyan-600 ring-1 text-white ring-cyan-500/40' 
                                        : 'hover:bg-cyan-300/20'
                                } `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
            
        </>
    )
}