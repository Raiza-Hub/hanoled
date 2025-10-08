"use client"

import SchoolSwitcher from "@/components/school/school-switcher";
import { SideNavClasses } from "@/components/sidenav-class";
import { SideNavFooter } from "@/components/sidenav-footer";
import { SideNavMain } from "@/components/sidenav-main";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail
} from "@/components/ui/sidebar";
import { UserProfile } from "@/components/user-profile";
import {
    BookOpen,
    FileClock,
    FolderTree,
    HelpCircle,
    House,
    Mail,
    MessageCircle,
    Settings,
    UserCog,
    UserPen,
    Users
} from "lucide-react";



export function AppSidebar({
    slug,
}: {
    slug: string;
}) {

    const data = {
        navMain: [
            {
                title: "School overview",
                url: "/dashboard",
                isActive: true,
                icon: House
            },
            {
                title: "Teacher management",
                url: "#",
                icon: UserCog
            },
            {
                title: "Student management",
                url: "#",
                icon: UserPen
            },
            {
                title: "Parent management",
                url: "#",
                icon: Users
            },
            {
                title: "Report",
                url: "#",
                icon: FileClock
            },
            {
                title: "All subject",
                url: "#",
                icon: FolderTree
            },
        ],
        navSecondary: [
            {
                title: "Settings",
                url: `/dashboard/school/${slug}/admin/setting`,
                icon: Settings,
            },
            {
                title: "Feedback",
                url: "#",
                icon: MessageCircle,
            },
            {
                title: "Get Help",
                url: "#",
                icon: HelpCircle,
                items: [
                    {
                        title: "Docs",
                        url: "#",
                        icon: BookOpen
                    },
                    {
                        title: "Contact Support",
                        url: "#",
                        icon: Mail
                    },
                ],
            },
        ],
    };
    
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="bg-white">
                <SchoolSwitcher slug={slug} />
            </SidebarHeader>
            <SidebarContent className="bg-white">
                <SideNavMain items={data.navMain} />
                <SideNavClasses />
                <SideNavFooter items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter className="bg-white">
                <UserProfile />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
