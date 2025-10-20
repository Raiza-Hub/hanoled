"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { act, ReactNode } from "react";

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    active?: boolean;
    url: string
}

export default function Sidebar({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <aside className={cn("h-screen", className)}>
            <nav className="h-full flex flex-col bg-white border-r">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Image
                        src="/hanoled_logo.jpg"
                        alt={""}
                        width={120}
                        height={120}
                    />

                    {/* <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        add icon that perform some action
                    </button> */}

                </div>
                <ul className="flex-1 px-3 my-3">{children}</ul>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, url }: SidebarItemProps) {
    const pathname = usePathname();
    const isActive =
        pathname === url || pathname === `${url}/`;
    return (

        <Link
            href={url}
            className={cn(
                "relative flex items-center py-1.5 px-3 my-1 text-sm font-medium rounded-sm cursor-pointer transition-colors",
                isActive ? "bg-zinc-100" : "hover:bg-zinc-100"
            )}
        >
            <li
                className={cn(
                    "flex items-center w-full transition-colors",
                    isActive ? "text-zinc-800" : "text-zinc-600 hover:text-zinc-800"
                )}
            >
                {icon}
                <span className="ml-2">{text}</span>
            </li>

        </Link>
    );
}