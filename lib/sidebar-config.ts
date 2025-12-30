import {
    IconBellRinging,
    IconBuildings,
    IconCategoryPlus,
    IconChartBar,
    IconCreditCard,
    IconFiles,
    IconHome,
    IconSchool,
    IconSettings,
    IconUser,
    IconUserScan,
    IconUsers,
} from "@tabler/icons-react";
import type React from "react";

interface SidebarBaseItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    allowed?: string[]
}

export interface SidebarParentItem extends SidebarBaseItem {
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


export const sidebarItems: SidebarItem[] = [
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
