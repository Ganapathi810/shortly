"use client"

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createShortUrl } from "@/actions/createShortUrl";  
import { isValidShortCode } from "@/lib/isValidShortCode";
import { isValidUrl } from "@/lib/isValidUrl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface ErrorType {
    destinationUrl?: string,
    shortCode?: string
}

export const CreateShortLinkForm = () => {
    const [destinationUrl,setDestinationUrl] = useState<string>("");
    const [shortCode,setShortCode] = useState<string>("")
    const router = useRouter()

    const [error, setError] = useState<ErrorType>({})

    const [state, formAction, isPending] = useActionState(createShortUrl, null)

    useEffect(() => {
        if(!state) return;
        
        if(state.success === true) {
            toast.success(state.message)
            setTimeout(() => router.push("/"), 700)
        } 

        if(state.success === false) {
            toast.error(state.error)
        }

    },[state])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        const newErrors: ErrorType = {}
        
        if(!destinationUrl) newErrors.destinationUrl = "Url is required"

        if(destinationUrl && !isValidUrl(destinationUrl)) newErrors.destinationUrl = "Enter a valid url"

        if(shortCode && !isValidShortCode(shortCode)) {
            newErrors.shortCode = "Short code must be 6-8 characters alphanumeric"
        }
        setError(newErrors)

        if(Object.keys(newErrors).length) {
            e.preventDefault()
            setError(newErrors)
            return
        }

    }

    return (
        <div className="flex justify-center w-screen px-2 md:px-7">
            <div className="max-w-2xl w-full">
                <h1 className="text-black text-2xl md:text-3xl font-bold">
                    Create a new link
                </h1> 

                <form action={formAction} onSubmit={handleSubmit} className="bg-white p-4 mt-3 rounded">
                    <p className="text-[21px] text-black font-bold">Link details</p> 

                    <div className="flex flex-col mt-2">

                        <div className="flex flex-col gap-y-1.5 h-28">
                            <label htmlFor="destinationUrl" className="font-semibold">
                                Destination URL
                            </label>
                            <Input 
                                id="destinationUrl" 
                                name="destinationUrl" 
                                onChange={(e) => {
                                    setDestinationUrl(e.target.value)
                                    setError((prev) => ({
                                        ...prev,
                                        destinationUrl: ""
                                    }))
                                }}
                                className={`
                                    ${error.destinationUrl
                                        ? 'border-red-500'
                                        : 'border-slate-300 focus:border-cyan-500 hover:not-focus:border-slate-500/70'
                                    }
                                `}
                            />
                            {error.destinationUrl && (
                                <p className="text-red-500 text-sm mt-1">{error.destinationUrl}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-y-1.5 h-28">
                            <label htmlFor="shortCode" className="font-semibold">
                                Short code 
                                <span className="text-slate-700 tracking-tight ml-1">(optional)</span>
                            </label>
                            <Input 
                                id="shortCode" 
                                name="shortCode" 
                                placeholder="Short code must be between 6 to 8 characters length of alphanumeric"
                                onChange={(e) => {
                                    setShortCode(e.target.value)
                                    setError((prev) => ({
                                        ...prev,
                                        shortCode: ""
                                    }))
                                }}
                                className={`
                                    ${error.shortCode
                                        ? 'border-red-500'
                                        : 'border-slate-300 focus:border-cyan-500 hover:not-focus:border-slate-500/70'
                                    }
                                `}
                            />
                            {error.shortCode && (
                                <p className="text-red-500 text-sm mt-1">{error.shortCode}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between mt-2">
                        <Link 
                            href={'/'}
                            className="font-semibold cursor-pointer px-4 border border-cyan-500/20 py-1.5  hover:bg-cyan-300/20 rounded" 
                        >
                            Cancel
                        </Link>
                        <Button 
                            disabled={isPending}
                            type="submit" 
                            className="font-semibold rounded cursor-pointer"
                        >
                            {isPending && <LoaderCircle className="animate-spin size-5" />}
                            {isPending ? 'Creating link...' : 'Create your link'}
                        </Button>
                    </div>
                </form>  
            </div>
        </div>
    );
}