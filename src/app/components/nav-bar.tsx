import Link from "next/link";
import Image from "next/image";
import { Roboto_Slab } from "next/font/google";

import Logo from "../favicon.ico"
import NavLinksWithAvatar from "@/components/nav-links-with-avatar";

const RobotoSlab = Roboto_Slab({
    variable: "--font-roboto-slab",
    subsets: ["latin"],
})

export default function NavBar() {

    return (
        <header className="fixed z-10 top-0 left-0 w-full h-16 bg-white border-b border-cyan-400/20 shadow-sm flex justify-between items-center px-5 lg:px-10">
            <Link 
                href={"/"}
                className="flex gap-3 items-center text-2xl md:text-3xl font-bold text-cyan-600 cursor-pointer"
            >
                <Image src={Logo} alt="logo" height={35} width={35} className="size-8 md:size-9" />
                    <span className={RobotoSlab.className}>Shortly</span>
            </Link>
            <NavLinksWithAvatar />
        </header>
    );
}