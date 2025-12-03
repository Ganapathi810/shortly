import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { revalidateTag } from "next/cache"

import { prisma } from "@/lib/prisma-client"
import { getClientLocationDetails } from "@/lib/getClientLocationDetails"

export const GET = async (_: any, { params }: { params: Promise<{ code: string }> }) => {
    const { code } = await params
    const headersList = await headers()

    const clientIP = headersList.get("x-forwarded-for")?.split(',')[0]

    console.log("ClientIP: ",clientIP)
    
    try {
        const data = await prisma.shortLink.findUnique({
            where: { shortCode: code },
        })

        if(!data) {
            return NextResponse.json({
                success: false,
                message: "Shortlink does not exist"
            },{
                status: 404
            })
        }

        const response = await getClientLocationDetails(clientIP || "no ip address")

        console.log("response from fetch for location : ",response)
        
        await prisma.shortLink.update({
            where: { shortCode: code },
            data: {
                clickCount: data.clickCount + 1,
                lastClickedAt: new Date(),
                locations: response.data ? [response.data] : undefined
            }
        })

        revalidateTag("shortlinks", "max")

        return NextResponse.redirect(data.originalUrl, { status: 302 })

    } catch(error) {
        if(error instanceof Error) {
            console.error(error.message)
        }
        return NextResponse.json(
            { success: false, message: "Failed to redirect, please try again" },
            { status: 500 }
        )
    }
}