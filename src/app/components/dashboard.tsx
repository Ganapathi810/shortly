"use client"

import { useEffect, useState } from "react";
import { LoaderCircle, Search,Trash2, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTopLoader } from "nextjs-toploader";

import { ShortLinkType } from "@/types/types";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteShortUrl } from "@/actions/deleteShortUrl";
import { formatLastClickedTime } from "@/lib/formatLastClickedTime";


export const Dashboard = ({ tableData }: { tableData: ShortLinkType[] }) => {
    const [deleting, setDeleting] = useState<boolean>(false)
    const [filteredShortLinks, setFilteredShortLinks] = useState<ShortLinkType[]>(tableData)
    const [filter, setFilter] = useState<'Url' | 'Code' | 'All'>("All")
    const [search, setSearch] = useState<string>('')
    const [isClearAllVisible, setIsClearAllVisible] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const topLoader = useTopLoader()

    useEffect(() => {
        topLoader?.done()
    }, [pathname, topLoader])
    
    const handleDelete = async (shortCode: string) => {
        setDeleting(true)

        const response = await deleteShortUrl(shortCode)

        setDeleting(false)

        if(response.success) {
            toast.success(response.message)
        } else {
            toast.error(response.error)
        }
    }

    useEffect(() => {
        let filtered = tableData;

        if (filter === "Code") {
            filtered = filtered.filter((s) =>
                s.shortCode.toLowerCase().includes(search.toLowerCase())
            )
        } else if (filter === "Url") {
            filtered = filtered.filter((s) =>
                s.originalUrl.toLowerCase().includes(search.toLowerCase())
            )
        } else {
            filtered = filtered.filter((s) =>
                s.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
                s.shortCode.toLowerCase().includes(search.toLowerCase())
            )
        }

        if(!filter.includes("All") || search !== "") {
            setIsClearAllVisible(true)
        }
        setFilteredShortLinks(filtered)

    },[filter,search])


    const renderAlertDialogWithDelete = (shortCode: string) => { //shortCode to delete shortlink
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant={'destructive'}
                        className="rounded cursor-pointer w-full md:w-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="flex gap-2 items-center justify-center">
                            <Trash2 className="size-4" />
                            Delete
                        </span>
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader> 
                        <AlertDialogTitle className="font-bold text-xl">{`Delete short link ?`}</AlertDialogTitle>
                        <AlertDialogDescription>
                            Deleting this link will redirect it to the Shortly error page.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer hover:bg-slate-200 ">Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button 
                                disabled={deleting}
                                variant={"destructive"} 
                                className="font-semibold rounded cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(shortCode)
                                }}
                            >
                                {deleting && <LoaderCircle className="animate-spin size-5" />}
                                {deleting ? 'Deleting link...' : 'Delete'}
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }
    
    
    return (
        <div className="p-2 sm:mx-auto md:p-auto sm:max-w-[90vw] md:max-w-[90vw] lg:max-w-[80vw]">
            <div className="flex justify-between items-center">
                <span className="text-black text-2xl md:text-3xl font-bold">
                    Shortly links
                </span>
                <Link 
                    href={"/links/create"}
                    className="font-semibold text-[16px] rounded cursor-pointer bg-cyan-500 px-4 py-2 hover:bg-cyan-600 active:bg-cyan-700 text-white" 
                >
                    Create link
                </Link>
            </div>

            <div className="flex flex-col xl:flex-row gap-5 items-center mt-3">
                <div className="relative border border-gray-500/40  focus-within:border-cyan-700!  hover:border-gray-500/60 max-w-xl xl:w-xl w-full  bg-white rounded">
                    <Input
                        value={search}
                        className="pl-8 border-none" 
                        placeholder="Search links"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute  left-2 top-1/2 -translate-y-1/2 pointer-events-none size-4 font-light"/>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-center">
                        <SlidersHorizontal className="size-4 md:size-5" />
                        <span className="text-lg font-semibold">Filter by:</span>
                    </div>
                    <Select 
                        value={filter} 
                        onValueChange={(value) => setFilter(value as 'Code' | 'Url')}
                    >
                        <SelectTrigger 
                            className="w-40 bg-white rounded border-black/30 cursor-pointer hover:border-gray-500/70 focus:border-cyan-700! data-[state=open]:border-cyan-700"
                        >
                            <SelectValue placeholder="select a filter" className="w-40" />
                        </SelectTrigger>
                        <SelectContent className="rounded border-black/30 shadow-none">
                        <SelectItem value="Url">Url</SelectItem>
                        <SelectItem value="Code">Code</SelectItem>
                        <SelectItem value="All">All</SelectItem>
                        </SelectContent>
                    </Select>
                    {isClearAllVisible && (
                        <Button   
                            onClick={() => {
                                setFilter('All')
                                setSearch("")
                                setIsClearAllVisible(false)
                            }}
                            variant={"ghost"} 
                            className="hover:bg-cyan-300/20 cursor-pointer flex gap-1 items-center"
                        >
                            <X className="size-4" />
                            Clear all
                        </Button>
                    )}
                </div>
            </div>

            {/* Table on more than medium sized screens */}
            <div className="hidden md:block mt-4 lg:mt-9">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-cyan-500/50">
                        <TableHead>Short code</TableHead>
                        <TableHead>Target URL</TableHead>
                        <TableHead>Total clicks</TableHead>
                        <TableHead>Last clicked time</TableHead>
                        <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData.length === 0 ? (
                            <TableRow>
                            <TableCell
                                colSpan={5}
                                className="text-center py-4 text-cyan-800 font-normal bg-white"
                            >
                                No short link exists, create one.
                            </TableCell>
                      </TableRow>
                        ) : filteredShortLinks.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center py-4 text-cyan-800 font-normal bg-white"
                                >
                                    No matching shortlinks found!
                                </TableCell>
                          </TableRow>
                        ) : filteredShortLinks.map((shortLink) => (
                            <TableRow 
                                onClick={() => {
                                    topLoader?.start()
                                    router.push(`/code/${shortLink.shortCode}`)
                                }} 
                                key={shortLink.id} 
                                className="hover:bg-cyan-300/10 hover:cursor-pointer"
                            >
                                <TableCell>
                                    {shortLink.shortCode}
                                </TableCell>
                                <TableCell className="max-w-sm">
                                    <a 
                                        href={shortLink.originalUrl} 
                                        target="_blank" 
                                        className="hover:underline line-clamp-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {shortLink.originalUrl}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    {shortLink.clickCount}
                                </TableCell>
                                <TableCell>
                                    {shortLink.lastClickedAt 
                                        ? formatLastClickedTime(new Date(shortLink.lastClickedAt))
                                        : "Not clicked yet"
                                    }
                                </TableCell>
                                <TableCell
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {renderAlertDialogWithDelete(shortLink.shortCode)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Table data using cards on mobile screen */}
            <div className="space-y-3 md:hidden mt-4">
                {tableData.length === 0 ? (
                    <div className="h-[65vh] flex items-center justify-center text-sm py-4 text-cyan-800 font-normal">
                        No short link exists, create one.
                    </div>
                ) : filteredShortLinks.length === 0 ? (
                    <div className="h-[65vh] flex items-center justify-center text-sm  py-4 text-cyan-800 font-normal">
                        No matching shortlinks found!
                    </div>
                ) : filteredShortLinks.map((shortLink) => (
                    <div
                        key={shortLink.id}
                        className="flex flex-col gap-3 bg-white rounded border border-black/10 p-3 shadow-sm cursor-pointer" 
                        onClick={(e) => {
                            topLoader?.start()
                            router.push(`/code/${shortLink.shortCode}`)
                        }}
                    >
                        <div className="flex gap-2 justify-between items-center">
                            <span className="font-semibold text-lg tracking-tight">Short code</span>
                            <span className="text-cyan-800 tracking-tighter">{shortLink.shortCode}</span>
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <span className="font-semibold text-lg shrink-0 tracking-tight">Targer URL</span>
                            <a 
                                href={shortLink.originalUrl} 
                                onClick={(e) => e.stopPropagation()} 
                                target="_blank" 
                                className="text-cyan-800  line-clamp-1 hover:underline tracking-tighter"
                            >
                                {shortLink.originalUrl}
                            </a>
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <span className="font-semibold text-lg tracking-tight">Total clicks</span>
                            <span className="text-cyan-800">{shortLink.clickCount}</span>
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <span className="font-semibold text-lg tracking-tight">Last clicked time</span>
                            <span className="text-cyan-800 tracking-tighter">{shortLink.lastClickedAt ? <>{shortLink.lastClickedAt}</> : "Not clicked yet"}</span>
                        </div>
                        
                        <div onClick={(e) => e.stopPropagation()}>
                            {renderAlertDialogWithDelete(shortLink.shortCode)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
