"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { UniqueSchool } from "@/type";
import {
    IconActivityHeartbeat,
    IconArchive,
    IconArrowLeft,
    IconBackground,
    IconBellRinging,
    IconBrandGoogle,
    IconBrandMeta,
    IconBrandNpm,
    IconBrandOpenai,
    IconBug,
    IconBuildings,
    IconCategoryPlus,
    IconChalkboard,
    IconChartBar,
    IconChevronRight,
    IconCloud,
    IconCreditCard,
    IconDatabase,
    IconFiles,
    IconFileText,
    IconFolder,
    IconFolders,
    IconGitCommit,
    IconGitMerge,
    IconGitPullRequest,
    IconHome,
    IconKey,
    IconLockExclamation,
    IconLockPassword,
    IconNorthStar,
    IconPackageExport,
    IconPackages,
    IconPasswordFingerprint,
    IconPlayerPlay,
    IconScanEye,
    IconSchool,
    IconSettings,
    IconShieldLock,
    IconStar,
    IconTarget,
    IconTerminal2,
    IconUser,
    IconUserPlus,
    IconUsers,
    IconUserScan,
    IconUsersGroup,
    IconWebhook
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import LoadingSidebar from "./sidebar-loading";
import { TeamSwitcher } from "./team-switcher";
import { SidebarUser } from "./user-profile";


interface SidebarBaseItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    allowed?: string[]
}

interface SidebarParentItem extends SidebarBaseItem {
    hasSubItems: true;
    subItems: {
        id: string;
        label: string;
        icon: React.ComponentType<{ className?: string }>;
        route: string;
        allowed?: string[];
    }[];
}

interface SidebarLeafItem extends SidebarBaseItem {
    hasSubItems?: false;
    route: string;
}

export type SidebarItem = SidebarParentItem | SidebarLeafItem;


const sidebarItems: SidebarItem[] = [
    {
        id: "overview",
        label: "Overview",
        icon: IconHome,
        hasSubItems: false,
        route: "/",
        allowed: ["owner", "admin", "member"],
    },
    {
        id: "staff-directory",
        label: "Staff Directory",
        icon: IconUsers,
        hasSubItems: false,
        route: "/teachers",
        allowed: ["owner", "admin", "member"],
    },
    {
        id: "parent",
        label: "Parents Directory",
        icon: IconUserScan,
        hasSubItems: false,
        route: "/parents",
        allowed: ["owner", "admin", "member"],
    },
    {
        id: "student",
        label: "Student Records",
        icon: IconSchool,
        hasSubItems: false,
        route: "/students",
        allowed: ["owner", "admin", "member"],
    },
    {
        id: "class",
        label: "Class Management",
        icon: IconCategoryPlus,
        hasSubItems: false,
        route: "/classes",
        allowed: ["owner", "admin", "member"],
    },
    {
        id: "subject",
        label: "Subject Management",
        icon: IconFiles,
        hasSubItems: false,
        route: "/subjects",
        allowed: ["owner", "admin", "member"],
    },
    {
        id: "report",
        label: "Performance Reports",
        icon: IconChartBar,
        hasSubItems: false,
        route: "/reports",
        allowed: ["owner", "admin", "member", "parent"],
    },
    {
        id: "settings",
        label: "Settings",
        icon: IconSettings,
        hasSubItems: true,
        allowed: ["owner", "admin", "member", "parent"],
        subItems: [
            {
                id: "profile",
                label: "Profile",
                icon: IconUser,
                route: "/settings/profile",
                allowed: ["owner", "admin", "member", "parent"],
            },
            {
                id: "school",
                label: "Schools",
                icon: IconBuildings,
                route: "/settings/schools",
                allowed: ["owner", "admin"],
            },
            {
                id: "notifications",
                label: "Notifications",
                icon: IconBellRinging,
                route: "/settings/notifications",
                allowed: ["owner", "admin", "member", "parent"],
            },
            {
                id: "billing",
                label: "Billing",
                icon: IconCreditCard,
                route: "/settings/webhooks",
                allowed: ["owner", "admin"],
            },
        ],
    },
];

export function AppSidebar({ slug }: { slug: string }) {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

    const { data: school, isLoading, error } = useQuery<UniqueSchool, Error>({
        queryKey: ["get-school", slug],
        queryFn: async () => {
            const res = await fetch(`/api/school/get-school/${slug}`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            return res.json();
        },
    });

    if (isLoading) {
        return <LoadingSidebar />
    }


    if (!school?.success) {
        redirect("/sign-in");
    }

    const userRoles = school.role || []

    const filteredSidebarItems = sidebarItems.filter((item) =>
        item.allowed?.some((role) => userRoles.includes(role))
    );

    const filteredSubItems = (item: SidebarParentItem) => {
        return item.subItems.filter((subItem) =>
            subItem.allowed?.some((role) => userRoles.includes(role))
        );
    };

    const activeItemData = sidebarItems.find((item) => item.id === activeItem);

    const handleItemClick = (item: SidebarItem) => {
        if (item.hasSubItems) {
            setActiveItem(item.id);
            setSelectedSubItem(null);
        } else {
            console.log(`[v0] Navigating to: ${item.route}`);
            router.push(`/dashboard/school/${slug}/${item.route}`);
        }
    };

    const handleSubItemClick = (subItem: { id: string; route?: string }) => {
        setSelectedSubItem(selectedSubItem === subItem.id ? null : subItem.id);
        if (subItem.route) {
            console.log(`[v0] Navigating to: ${subItem.route}`);
            router.push(`/dashboard/school/${slug}/${subItem.route}`);
        }
    };

    const handleBackToMain = () => {
        setActiveItem(null);
        setSelectedSubItem(null);
    };



    return (
        <div className="flex h-screen bg-background">
            <Sidebar
                side="left"
                variant="sidebar"
                collapsible="none"
                className="w-64 border-r pt-2"
            >
                {!activeItem ? (
                    <>
                        <SidebarHeader className="relative flex">
                            <div className="flex items-center gap-2"> {/* Main container centers items vertically */}
                                <div className="flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background">
                                    {/* The container below defines the crop area */}
                                    <div className="relative size-full">
                                        <Image
                                            src={school.message.logo}
                                            alt={school.message.name}
                                            fill // Use fill to let the parent container define the size
                                            className="object-cover" // This "crops" the image to fill the space
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center leading-tight">
                                    <span className="w-42 truncate font-semibold">
                                        {school.message.name}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {school.message.paymentStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <TeamSwitcher currentSchool={school} />
                            </div>
                        </SidebarHeader>

                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {filteredSidebarItems.map((item) => {
                                            const Icon = item.icon;
                                            const chevronIndicator = (
                                                <IconChevronRight className="h-4 w-4 transition-transform shrink-0" />
                                            );

                                            return (
                                                <SidebarMenuItem key={item.id}>
                                                    <SidebarMenuButton
                                                        className="w-full h-10 px-3"
                                                        onClick={() => handleItemClick(item)}
                                                        title={item.label}
                                                    >
                                                        <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
                                                            <Icon className="h-4 w-4 shrink-0" />
                                                            <span className="truncate">{item.label}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 shrink-0 ml-auto min-w-fit">
                                                            {(item.badge || item.hasSubItems) &&
                                                                (item.badge ? (
                                                                    <SidebarMenuBadge
                                                                        className={cn(
                                                                            "min-w-fit",
                                                                            item.hasSubItems && "gap-x-3"
                                                                        )}
                                                                    >
                                                                        {item.badge}
                                                                        {item.hasSubItems && chevronIndicator}
                                                                    </SidebarMenuBadge>
                                                                ) : (
                                                                    chevronIndicator
                                                                ))}
                                                        </div>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>

                        <SidebarFooter>
                            <SidebarUser />
                        </SidebarFooter>
                    </>
                ) : (
                    activeItemData && activeItemData.hasSubItems && (
                        <>
                            <SidebarHeader className="flex flex-row items-center justify-between border-b px-4">
                                <button
                                    onClick={handleBackToMain}
                                    className="h-8 w-8 p-0 rounded-md hover:bg-sidebar-accent flex items-center justify-center"
                                >
                                    <IconArrowLeft className="h-4 w-4" />
                                </button>
                                <h3 className="font-medium flex-1 text-center">{activeItemData.label}</h3>
                                <div className="w-8" />
                            </SidebarHeader>

                            <SidebarContent>
                                <SidebarGroup>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {filteredSubItems(activeItemData).map((subItem) => {
                                                const SubIcon = subItem.icon;
                                                const isSelected = selectedSubItem === subItem.id;

                                                return (
                                                    <SidebarMenuItem key={subItem.id}>
                                                        <SidebarMenuButton
                                                            isActive={isSelected}
                                                            className="w-full h-10 px-3"
                                                            onClick={() => handleSubItemClick(subItem)}
                                                            title={subItem.label}
                                                        >
                                                            <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
                                                                <SubIcon className="h-4 w-4 shrink-0" />
                                                                <span className="truncate">{subItem.label}</span>
                                                            </div>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                );
                                            })}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            </SidebarContent>
                        </>
                    )
                )}
            </Sidebar>
        </div>
    );
}