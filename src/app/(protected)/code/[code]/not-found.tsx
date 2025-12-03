import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center p-5 md:p-auto">
        <h1 className="text-2xl font-bold">404 - Not Found</h1>
        <p className="text-gray-500 text-sm sm:text-base">The short link stats you are looking for does not exist.</p>
        <Link href="/" className="text-cyan-500 hover:text-cyan-600">Go back to the home page</Link>
      </div>
    </div>
  )
}