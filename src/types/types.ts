export type SystemDetailsType = {
    name: string,
    version: string,
    uptime: number,
    serverTime: string,
    database: {
        name: string,
        providedBy: string,
        status: "connected" | "disconnected"
    }
}

export type ShortLinkType = {
    id: string,
    shortCode: string,
    originalUrl: string,    
    userId: string,
    createdAt: Date,
    lastClickedAt: Date | null,
    clickCount: number,
    locations: {
        city: string,
        region: string,
        country: string
    }[]      
}