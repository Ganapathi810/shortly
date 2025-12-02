import { NextResponse } from "next/server"
import packageJson from "../../../../package.json"

export const GET = () => {

    const systemDetails = {
        ok: true,
        name: packageJson.name,
        version: packageJson.version,
        uptime: Math.floor(process.uptime()),
        serverTime: new Date().toISOString(),
        database: {
            name: "PostgreSQL",
            providedBy: "Neon",
            status: "connected"
        }
    }

    return NextResponse.json(
        { success: true, data: systemDetails },
        { status: 200 }
    )
}