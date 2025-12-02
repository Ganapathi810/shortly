"use server"

import { generateShortCode } from "@/lib/generateShortCode";
import { cookies } from "next/headers";

export const createShortUrl = async (_: any, formData: FormData) => {
    const destinationUrl = formData.get("destinationUrl") as string;

    let shortCode = formData.get("shortCode") as string;
    shortCode = shortCode || generateShortCode()

    const cookieHeader = (await cookies()).toString()

    const FRONTEND_URL = process.env.FRONTEND_URL

    const response = await fetch(`${FRONTEND_URL}/api/links`, {
        method: "POST",
        headers: {
            "Cookie": cookieHeader
        },
        body: JSON.stringify({
            originalUrl: destinationUrl,
            shortCode
        })
    })

    if(!response.ok) {
        const errorResponse = await response.json()
        
        return errorResponse
    } 

    const data = await response.json()

    return data
}