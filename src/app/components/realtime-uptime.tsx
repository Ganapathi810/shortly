"use client"

import { formatUptime } from "@/lib/format-uptime"
import { useEffect, useState } from "react"

export default function RealtimeUptime({ uptimeInSeconds }: { uptimeInSeconds: number }) {
    const [seconds,setSeconds] = useState<number>(uptimeInSeconds)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1)
        },1000)

        return () => clearInterval(interval)
    },[]) 

    return <span>{formatUptime(seconds)}</span>
}
