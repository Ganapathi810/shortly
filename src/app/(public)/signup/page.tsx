import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";
import { redirect } from "next/navigation";

export default async function SignupPage() {
    const user = await stackServerApp.getUser()

    if(user) {
        redirect("/")
    }
    
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <SignUp />
        </div>
    )
}