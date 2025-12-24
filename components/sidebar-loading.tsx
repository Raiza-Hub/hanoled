"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSidebar() {
    return (
        <div className="flex h-screen bg-background">
            <Sidebar
                side="left"
                variant="sidebar"
                collapsible="none"
                className="w-64 border-r bg-white"
            >
                {/* Header (Team Switcher Placeholder) */}
                <SidebarHeader className="px-4 py-3">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-2 w-16" />
                        </div>
                    </div>
                </SidebarHeader>

                {/* Content (Menu Placeholder) */}
                <SidebarContent className="flex-1 overflow-hidden">
                    <SidebarMenu className="px-2 py-2 space-y-1">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <SidebarMenuItem key={i}>
                                <div className="flex items-center justify-between px-3 py-2 rounded-md">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <Skeleton className="h-5 w-5 rounded" />
                                        <Skeleton className="h-3 w-24 rounded" />
                                    </div>
                                    <Skeleton className="h-3 w-6 rounded-full" />
                                </div>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>

                {/* Footer (User Info Placeholder) */}
                <SidebarFooter className="px-3 py-4 border-t">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-2 w-20" />
                        </div>
                        <Skeleton className="h-4 w-4" />
                    </div>
                </SidebarFooter>
            </Sidebar>
        </div>
    )
}
