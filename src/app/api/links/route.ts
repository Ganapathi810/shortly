import { NextRequest, NextResponse } from "next/server"

import { isValidShortCode } from "@/lib/isValidShortCode"
import { isValidUrl } from "@/lib/isValidUrl"
import { prisma } from "@/lib/prisma-client"
import { stackServerApp } from "@/stack/server"
import { revalidatePath } from "next/cache"

export const GET = async () => {
    try {
        const data = await prisma.shortLink.findMany();

        return NextResponse.json({
            success: true,
            data
        })
    } catch (error) {
        if(error instanceof Error) {
            console.error(error.message)
            return NextResponse.json(
                { success: false, error: "Failed to fetch all short links" },
                { status: 500 }
            )
        }
    }
}

export const POST = async (request: NextRequest) => {
    const { originalUrl, shortCode } = await request.json()

    const user = await stackServerApp.getUser({
        or: "return-null",
        tokenStore: request
    })

    if(!user) {
        return NextResponse.json(
            { success: false, error: "User is Unauthorized" },
            { status: 401 }
        )
    }

    if(!isValidUrl) {
        return NextResponse.json(
            { success: false, error: "Invalid url" },
            { status: 400 }
        )
    }

    if(!isValidShortCode) {
        return NextResponse.json(
            { success: false, error: "Short code must be 6-8 alphanumeric characters" },
            { status: 400 }
        )
    }

    try {
        const data = await prisma.shortLink.findUnique({
            where: { shortCode }
        })

        if(data) {
            return NextResponse.json(
                { success: false, error: "Shortcode already exists, try another one" },
                { status: 409 }
            )
        }

        await prisma.shortLink.create({
            data: {
                userId: user.id, 
                originalUrl,
                shortCode,
            }
        })

        revalidatePath("/")

        return NextResponse.json(
            { success: true, message: "Short link has been created successfully!" },
            { status: 201 }
        )

    } catch(error) {
        if(error instanceof Error) {
            console.error(error.message)
        }
        return NextResponse.json(
            { success: false, error: "Failed to create short link, please try again" },
            { status: 500 }
        )
    }

}


