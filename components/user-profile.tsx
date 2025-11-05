"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { Logout } from "./logout"


export function SidebarUser() {
    const { data: user, error } = useQuery({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const res = await fetch(`/api/auth/user-profile`, {
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
    
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    className="w-full h-12 px-3"
                    asChild
                >
                    <div className="flex items-center justify-between gap-3 flex-1 min-w-0">
                        <Avatar className="h-8 w-8 rounded-full">
                            <AvatarImage src={user?.user.image} alt={user?.user.name} />
                            <AvatarFallback className="rounded-full">
                                {user?.user.name.charAt(0).toUpperCase() || <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left min-w-0">
                            <div className="text-sm font-medium truncate">{user?.user.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{user?.user.email}</div>
                        </div>

                        <Logout />
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
