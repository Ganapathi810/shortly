"use client"

import { useUser } from "@stackframe/stack";
import { stackClientApp } from "@/stack/client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const AvatarDropdown = () => {
    const user = useUser()

    const handleSignOut = async () => {
        await stackClientApp.signOut()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="rounded-full size-8 md:size-10 hover:ring-4 hover:ring-cyan-300/50 cursor-pointer">
                    <AvatarImage src={user?.profileImageUrl || ""} alt="user profile 1"/>
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-8 border border-cyan-900/40 rounded" sideOffset={10}>
                <div className="flex gap-4 justify-between p-2">
                    <Avatar className="rounded-full size-10 md:size-13 border">
                        <AvatarImage src={user?.profileImageUrl || ""} alt="user profile 2"/>
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <p className="text-base text-black w-42 line-clamp-1">
                            {user?.displayName}
                        </p>
                        <p className="text-sm text-slate-600 tracking-tight">
                            {user?.primaryEmail}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSignOut()} variant="destructive" className="cursor-pointer">
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}