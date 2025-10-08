"use client";

import { useCurrentSchoolActions } from "@/app/stores/school-store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { getAllSchools, getSchool } from "@/lib/api";
import { SchoolMessage } from "@/type";
import { useQueries } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { mapRoleToPath } from "./dashboard-client";


const SchoolSwitcher: FC<{ slug: string }> = ({ slug }) => {
    const { isMobile } = useSidebar();
    const router = useRouter();
    const { setCurrentSchool } = useCurrentSchoolActions();

    const results = useQueries({
        queries: [
            {
                queryKey: ["schools"],
                queryFn: getAllSchools,
            },
            {
                queryKey: ["get-school", slug],
                queryFn: () => getSchool(slug),
                enabled: !!slug,
            },
        ],
    });

    const [allSchools, activeSchool] = results;

    const { data: schools } = allSchools;
    const { data: currentSchool } = activeSchool;


    if (allSchools.isLoading || activeSchool.isLoading) {
        return <div>Loading...</div>;
    }

    if (allSchools.isError || activeSchool.isError) {
        return <div>Error loading data</div>;
    }


    // Switch organization
    const handleChangeOrganization = async (schoolObj: SchoolMessage) => {
        if (!schoolObj) return;

        try {
            const school = await getSchool(schoolObj.slug);

            setCurrentSchool(school.message);

            if (school.roles.length === 1) {
                const targetPath = mapRoleToPath(school.roles[0]);
                router.push(`/dashboard/school/${school.message.slug}/${targetPath}`);
            } else if (school.roles.length > 1) {
                router.push(`/dashboard/school/${school.message.slug}/choose-role`);
            } else {
                router.push("/unauthorized");
            }

            toast.success(`Switched to ${school.message.name} successfully`);
        } catch (error) {
            console.error("Failed to switch school:", error);
            toast.error("Failed to switch school");
        }
    };

    if (!currentSchool) return null;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                <Avatar className="rounded-md">
                                    <AvatarImage
                                        src={
                                            currentSchool.message.logo ||
                                            "https://github.com/evilrabbit.png"
                                        }
                                    />
                                    <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                                        {currentSchool.message.name
                                            ?.split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()
                                            .slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {currentSchool.message.name}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-muted-foreground text-xs">
                            All organisation
                        </DropdownMenuLabel>

                        {schools?.message?.map((sch) => (
                            <DropdownMenuItem
                                key={sch.id}
                                onClick={() => handleChangeOrganization(sch)}
                                className="gap-2 p-2"
                            >
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Avatar className="rounded-md">
                                        <AvatarImage
                                            src={sch.logo || "https://github.com/evilrabbit.png"}
                                        />
                                        <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                                            {sch.name
                                                ? sch.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .toUpperCase()
                                                    .slice(0, 2)
                                                : null}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <span className="flex-1 truncate">{sch.name}</span>
                                {currentSchool?.message.slug === sch.slug && (
                                    <Check className="size-4 text-gray-500 ml-auto" />
                                )}
                            </DropdownMenuItem>
                        ))}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Plus className="size-4" />
                            </div>
                            <div className="text-muted-foreground font-medium">
                                New organisation
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default SchoolSwitcher;
