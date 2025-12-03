import { notFound } from "next/navigation"
import { Calendar, Clock, CornerDownRight, MousePointerClick } from "lucide-react"

import { CopyLink } from "@/app/components/copy-link"
import { getShortLinkByCode } from "@/lib/db/getters"
import { formatCreatedAtTime } from "@/lib/formatDateWithTimezone"
import { formatLastClickedTime } from "@/lib/formatLastClickedTime"
import { ShortLinkType } from "@/types/types"

const frontendUrl = process.env.FRONTEND_URL

export default async function CodePage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params

    const response = await getShortLinkByCode(code)

    if(!response.success) {
      notFound()
    }

    const shortLink: ShortLinkType = response.data
    
    console.log("Short link in code:", shortLink)

    return (
      <div className="p-2 sm:mx-auto md:p-auto sm:max-w-[90vw] md:max-w-[80vw]">
        <h1 className="text-black text-2xl md:text-3xl font-bold">Short link information</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-3">

          {/* shortlink details card */}
          <div className="lg:col-span-2 bg-white rounded-md border border-black/30 p-4 md:p-6 mt-5">
            <div className="flex flex-col sm:flex-row gap-1 md:gap-3 items-center">
                <span className="font-semibold text-lg md:text-xl mr-3 tracking-tight sm:tracking-normal">Short Url:</span>
                <div className="flex gap-2 items-center">
                  <a 
                    href={`${frontendUrl}/${shortLink.shortCode}`}
                    target="_blank"
                    className="text-lg md:text-2xl line-clamp-1 text-cyan-800 hover:underline"
                  >
                    {`${frontendUrl}/${shortLink.shortCode}`}
                  </a>
                  <CopyLink  link={`${frontendUrl}/${shortLink.shortCode}`} />
                </div>
            </div>

            <div className="flex gap-3 items-center justify-center sm:justify-start mt-3 md:ml-3">
              <CornerDownRight className="size-4 sm:size-5 shrink-0" />
              <a 
                    href={shortLink.originalUrl}
                    target="_blank"
                    className="text-lg text-cyan-700 hover:underline line-clamp-1"
                  >
                    {shortLink.originalUrl}
                  </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 items-center mt-3">
              <span className="flex gap-1 items-center">
                <Calendar className="size-4 sm:size-5 shrink-0" />
                <span className="font-semibold">Shortlink creation date and time:</span>
              </span>
              <p className="text-cyan-800">
                {formatCreatedAtTime(new Date(shortLink.createdAt))}
              </p>
            </div>
          </div>

          {/* Click details card */}
          <div className="bg-white rounded-md border border-black/30 p-6 mt-5">
            <h2 className="text-lg md:text-xl tracking-tight sm:tracking-normal font-semibold">Click details</h2>

            <div className="flex gap-2 items-center mt-3">
              <span className="flex gap-1 items-center">
                <MousePointerClick className="size-4 sm:size-5" />
                <span className="font-semibold">Total clicks:</span>
              </span>
              <span className="text-cyan-800">
                {shortLink.clickCount}
              </span>
            </div>  

            <div className="flex gap-2 items-center mt-3">
              <span className="flex gap-1 items-center">
                <Clock className="size-4 sm:size-5" />
                <span className="font-semibold">Last clicked time:</span>
              </span>
              <p className="text-cyan-800">
                {shortLink.lastClickedAt ? formatLastClickedTime(new Date(shortLink.lastClickedAt)) : "Not clicked yet"}
              </p>
            </div>
          </div>

          {/* Location details card */}
          <div className="bg-white rounded-md border border-black/30 p-6 mt-5">
            <h2 className="text-lg md:text-xl tracking-tight sm:tracking-normal font-semibold">Last Click Location details</h2>
            <p className="text-gray-500">It shows the location where the last redirect is performed from.</p>

            <div className="space-y-1 mt-3">
              <p className="flex gap-3 items-center">
                <span className="font-semibold">Country:</span>
                <span className="text-cyan-800">{shortLink.lastRedirectLocation?.country_name || "Not redirected yet"}</span>
              </p>
              <p className="flex gap-3 items-center">
                <span className="font-semibold">Region:</span>
                <span className="text-cyan-800">{shortLink.lastRedirectLocation?.region || "Not redirected yet"}</span>
              </p>
              <p className="flex gap-3 items-center">
                <span className="font-semibold">City:</span>
                <span className="text-cyan-800">{shortLink.lastRedirectLocation?.city || "Not redirected yet"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }