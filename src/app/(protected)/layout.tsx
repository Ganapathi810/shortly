import { redirect } from "next/navigation";

import { stackServerApp } from "@/stack/server";
import { Toaster } from "@/components/ui/sonner"
import NavBar from "../components/nav-bar";
import { TopLoader } from "../components/top-loader";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await stackServerApp.getUser({
    or: 'redirect'
  })

  if(!user) {
    redirect('/signin')
  }

  return (
    <div className="h-full w-screen">
      <TopLoader />
      <NavBar />
      <Toaster />
      <main className="my-20">
        {children}
      </main>
    </div>
  );
}
