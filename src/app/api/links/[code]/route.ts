import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma-client";

export const GET = async (_: any, { params }: { params: Promise<{ code: string }> }) => {
    const { code } = await params;

    console.log("Code: ", code)

    try {
        const data = await prisma.shortLink.findUnique({
            where: { shortCode: code }
        });

        if(!data) {
            return NextResponse.json(
                { success: false, error: "Shortlink does not exists for Stats" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data
        })
    } catch (error) {
        if(error instanceof Error) {
            console.error(error.message)
            return NextResponse.json(
                { success: false, error: "Failed to fetch the short link for stats" },
                { status: 500 }
            )
        }
    }
}   

export const DELETE = async (_: any, { params }: { params: Promise<{ code: string }> }) => {
    const { code } = await params;

    try {
        const data = await prisma.shortLink.findUnique({
            where: { shortCode: code }
        });

        if(!data) {
            return NextResponse.json(
                { success: false, error: "Shortlink does not exist to delete" },
                { status: 404 }
            )
        }

        await prisma.shortLink.delete({
            where: { shortCode: code }
        })

        revalidatePath("/")

        return NextResponse.json({
            success: true,
            message: "Shortlink deleted successfully!"
        })
    } catch (error) {
        if(error instanceof Error) {
            console.error(error.message)
            return NextResponse.json(
                { success: false, error: "Failed to delete the short link" },
                { status: 500 }
            )
        }
    }
}