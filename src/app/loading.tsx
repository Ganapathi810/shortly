import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <span className="flex gap-2 items-center justify-center">
        <LoaderCircle className="size-8 animate-spin text-cyan-600" />  
        loading...
      </span>
    </div>
  ) 
}
