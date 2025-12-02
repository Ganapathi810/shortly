import { getSystemDetails } from "@/lib/db/getters"
import { SystemDetailsType } from "@/types/types"
import RealtimeUptime from "../../components/realtime-uptime"

export default async function HealthCheckPage() {
    const systemDetails: SystemDetailsType = (await getSystemDetails()).data

    return (
        <div className="p-2 sm:mx-auto md:p-auto sm:max-w-[90vw] md:max-w-[80vw]">
            <h1 className="text-black text-2xl md:text-3xl font-bold">Health check</h1>
            
            <div className="bg-white rounded border border-black/30 p-3 mt-4">
                <h2 className="text-xl font-semibold">System details</h2>
                <div className="space-y-3 mt-2">
                    <p className="flex gap-x-4">
                        <span className="inline-block w-34 font-semibold text-black">Application name:</span> 
                        <span className="">{systemDetails.name}</span> 
                    </p>
                    <p className="flex gap-x-4">
                        <span className="inline-block w-34 font-semibold text-black">Version:</span> 
                        <span>{systemDetails.version}</span> 
                    </p>
                </div>
            </div>

            <div className="bg-white rounded border border-black/30 p-3 mt-4">
                <h2 className="text-xl font-semibold">Database details</h2>
                <div className="space-y-3 mt-2">
                    <p className="flex gap-x-4">
                        <span className="inline-block w-34 font-semibold text-black">Name:</span> 
                        <span>{systemDetails.database.name}</span> 
                    </p>
                    <p className="flex gap-x-4">
                        <span className="inline-block w-34 font-semibold text-black">Provided by:</span> 
                        <span>{systemDetails.database.providedBy}</span> 
                    </p>
                    <p className="flex gap-x-4">
                        <span className="inline-block w-34 font-semibold text-black">Status:</span>
                        {systemDetails.database.status === "connected" ? (
                            <span className="rounded-full bg-green-500/20 border border-green-500 px-3 text-green-500 py-0.5">connected</span>
                        ): (
                            <span className="rounded-full bg-red-500/20 border border-red-500/20 text-red-500 px-3 py-0.5">disconnected</span>
                        )}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded border border-black/30 p-3 mt-4">
                <h2 className="text-xl font-semibold">Uptime details</h2>
                <p className="text-sm text-slate-800">Uptime is the total duration when the system is up and running.</p>
                <div className="space-y-3 mt-2">
                    <p className="flex gap-x-4">
                        <span className="inline-block w-34 font-semibold text-black">Uptime:</span> 
                        <RealtimeUptime uptimeInSeconds={systemDetails.uptime} />
                    </p>
                </div>
            </div>
        </div>
    )
}