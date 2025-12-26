"use client";

import { useCurrentSchoolActions } from "@/app/stores/school-store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { School, UniqueSchool } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";


export function TeamSwitcher({ currentSchool }: { currentSchool: UniqueSchool }) {
    const router = useRouter()
    const { isMobile } = useSidebar();
    const setCurrentSchool = useCurrentSchoolActions();

    const { data: schools } = useQuery({
        queryKey: ['all-schools'],
        queryFn: async (): Promise<School> => {
            const res = await fetch("/api/school/all-schools", {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            return res.json();
        },
    })

    if (!schools) return null;
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="w-fit data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent hover:text-inherit focus-visible:ring-0"
                        >
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-60 rounded-lg mb-4"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Schools
                        </DropdownMenuLabel>

                        {schools.message.map((school) => {
                            const isCurrent = school.id === currentSchool?.message.id;
                            return (
                                <DropdownMenuItem
                                    key={school.id}
                                    onClick={() => {
                                        setCurrentSchool(school)
                                        router.push(`/dashboard/school/${school.slug}`)
                                    }}
                                    className={`gap-2 p-2 flex items-center ${isCurrent ? "bg-muted/50" : ""
                                        }`}
                                >
                                    <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted">
                                        {school?.logo && school.logo.trim() !== "" ? (
                                            <Image
                                                src={school.logo}
                                                alt={school.name || "School logo"}
                                                width={32}
                                                height={32}
                                                className="h-full w-full object-cover" // object-cover handles the "cropping"
                                                unoptimized={school.logo.startsWith('data:')} // Add this if using base64 strings
                                            />
                                        ) : (
                                            /* This displays if the URL is invalid or missing */
                                            <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-[10px] font-bold text-zinc-500">
                                                {school?.name?.charAt(0).toUpperCase() || "S"}
                                            </div>
                                        )}
                                    </div>

                                    <span className="flex-1">{school.name}</span>

                                    {/* ✅ Show check mark for current school */}
                                    {isCurrent && (
                                        <Check className="size-4 text-muted-foreground" />
                                    )}
                                </DropdownMenuItem>
                            );
                        })}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link
                                href="/onboarding"
                                className="flex w-full items-center gap-2 p-2 cursor-pointer"
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Plus className="size-4" />
                                </div>
                                <div className="font-medium text-muted-foreground">Add School</div>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
