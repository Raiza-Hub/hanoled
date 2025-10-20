"use client"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import * as Icons from "lucide-react"
import { ComponentPropsWithoutRef } from "react"
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible"
import { ChevronRight, LucideIcon } from "lucide-react"

type NavItem = {
    title: string
    url: string
    icon?: LucideIcon;
    items?: { title: string; url: string; icon: LucideIcon }[]
}

export function SideNavFooter({
    items,
    ...props
}: {
    items: NavItem[]
} & ComponentPropsWithoutRef<typeof SidebarGroup>) {
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {

                        return (
                            <SidebarMenuItem key={item.title}>
                                {item.items ? (
                                    // Collapsible parent
                                    <Collapsible defaultOpen={false} className="group/collapsible">
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={item.title}>
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((sub) => (
                                                    <SidebarMenuSubItem key={sub.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <a href={sub.url} className="flex items-center gap-2">
                                                                {sub.icon && <sub.icon className="w-4 h-4" />}
                                                                <span>{sub.title}</span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ) : (
                                    // Regular item
                                        <SidebarMenuButton asChild tooltip={item.title}>
                                        <a href={item.url}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
