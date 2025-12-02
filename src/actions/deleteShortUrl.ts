"use server"

import { revalidatePath } from "next/cache"

const FRONTEND_URL = process.env.FRONTEND_URL

export const deleteShortUrl = async (shortCode: string) => {

    const response = await fetch(`${FRONTEND_URL}/api/links/${shortCode}`, {
        method: "DELETE",
    })

    revalidatePath("/")

    if(!response.ok) {
        const errorResponse = await response.json()
        
        return errorResponse
    } 

    const data = await response.json()

    return data
}