import { stackServerApp } from "@/stack/server";
import { SignIn } from "@stackframe/stack";
import { redirect } from "next/navigation";

export default async function SigninPage() {
    const user = await stackServerApp.getUser()

    if(user) {
        redirect("/")
    }
    
    return (
        <div className="min-h-screen w-screen flex justify-center items-center">
            <SignIn />
        </div>
    )
}