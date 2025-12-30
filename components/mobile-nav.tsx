"use client";

import { cn } from "@/lib/utils";
import { type SidebarItem, type SidebarParentItem, sidebarItems } from "@/lib/sidebar-config";
import { UniqueSchool } from "@/type";
import { IconChevronRight, IconMenu2, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";


import { AnimatePresence, motion } from "framer-motion";

function CollapsibleMenuItem({
    item,
    userRoles,
    onSubItemClick,
    pathname,
    slug
}: {
    item: SidebarParentItem,
    userRoles: string[],
    onSubItemClick: (subItem: { id: string; route?: string }) => void,
    pathname: string,
    slug: string
}) {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = item.icon;

    return (
        <div className="space-y-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    isOpen && "text-primary font-medium"
                )}
            >
                <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <IconChevronRight className="h-4 w-4" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="ml-4 border-l pl-4 space-y-1 py-1">
                            {item.subItems
                                .filter(sub => sub.allowed?.some(r => userRoles.includes(r)))
                                .map(sub => {
                                    const subRoute = sub.route ? `/dashboard/school/${slug}/${sub.route}` : "";
                                    const isActive = pathname === subRoute || (sub.route === "/" && pathname.endsWith(slug));

                                    return (
                                        <button
                                            key={sub.id}
                                            onClick={() => onSubItemClick(sub)}
                                            className={cn(
                                                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground text-left cursor-pointer",
                                                isActive && "bg-accent text-accent-foreground font-medium"
                                            )}
                                        >
                                            <span>{sub.label}</span>
                                        </button>
                                    )
                                })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function MobileNav({ slug }: { slug: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const { data: school, isLoading } = useQuery<UniqueSchool, Error>({
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

    if (isLoading || !school?.success) return null;

    const userRoles = school.role || [];

    const filteredSidebarItems = sidebarItems.filter((item) =>
        item.allowed?.some((role) => userRoles.includes(role))
    );

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleItemClick = (item: SidebarItem) => {
        setIsOpen(false);
        if (item.hasSubItems) return;
        router.push(`/dashboard/school/${slug}/${item.route}`);
    };

    const handleSubItemClick = (subItem: { id: string; route?: string }) => {
        setIsOpen(false);
        if (subItem.route) {
            router.push(`/dashboard/school/${slug}/${subItem.route}`);
        }
    };

    // Bottom bar items: First 3 + More
    const bottomItems = filteredSidebarItems.slice(0, 3);

    return (
        <>
            {/* Bottom Bar - Visible on Mobile only */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background px-4 lg:hidden">
                {bottomItems.map((item) => {
                    const Icon = item.icon;
                    // Check if active (simple check)
                    const route = item.hasSubItems ? "" : item.route;
                    const isActive = route && (pathname.includes(route) && route !== "/" || (route === "/" && pathname.endsWith(slug)));

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground cursor-pointer",
                                isActive && "text-primary font-medium"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}

                {/* More Button */}
                <button
                    onClick={toggleOpen}
                    className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground cursor-pointer"
                >
                    <IconMenu2 className="h-5 w-5" />
                    <span>More</span>
                </button>
            </div>

            {/* Overlay Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex flex-col bg-background animate-in slide-in-from-bottom-10 lg:hidden">
                    {/* Header */}
                    <div className="flex h-16 items-center justify-between border-b px-4">
                        <div className="flex items-center gap-2">
                            <div className="flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background">
                                <div className="relative size-full">
                                    <Image
                                        src={school.message.logo}
                                        alt={school.message.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <span className="font-semibold">{school.message.name}</span>
                        </div>
                        <button onClick={toggleOpen} className="p-2">
                            <IconX className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <nav className="space-y-2">
                            {filteredSidebarItems.map((item) => {
                                if (item.hasSubItems) {
                                    return (
                                        <CollapsibleMenuItem
                                            key={item.id}
                                            item={item}
                                            userRoles={userRoles}
                                            onSubItemClick={handleSubItemClick}
                                            pathname={pathname}
                                            slug={slug}
                                        />
                                    );
                                }
                                const Icon = item.icon;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleItemClick(item)}
                                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </button>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
