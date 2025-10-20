// "use client";

// import {
//     BadgeCheck,
//     Bell,
//     ChevronsUpDown,
//     CreditCard,
//     Sparkles,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//     useSidebar,
// } from "@/components/ui/sidebar";
// import { Logout } from "./logout";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";

// export function UserProfile() {
//     const { isMobile } = useSidebar();
//     const router = useRouter();

//     const { data: currentUser } = authClient.useSession();

//     if (!currentUser) return null
    
//     const initials = currentUser.user.name
//         ? currentUser.user.name
//             .split(" ") // split name into parts
//             .map((n) => n[0]) // take first letter of each part
//             .join("") // join them together
//             .substring(0, 2) // take only first two letters
//             .toUpperCase()
//         : "";

//     return (
//         <SidebarMenu>
//             <SidebarMenuItem>
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <SidebarMenuButton
//                             size="lg"
//                             className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//                         >
//                             <Avatar className="h-8 w-8">
//                                 <AvatarImage
//                                     src={
//                                         currentUser.user.image || ""
//                                     }
//                                     alt={currentUser.user.name}
//                                 />
//                                 <AvatarFallback>{initials}</AvatarFallback>
//                             </Avatar>
//                             <div className="grid flex-1 text-left text-sm leading-tight">
//                                 <span className="truncate font-medium">
//                                     {currentUser.user.name}
//                                 </span>
//                                 <span className="truncate text-xs">{currentUser.user.email}</span>
//                             </div>
//                             <ChevronsUpDown className="ml-auto size-4" />
//                         </SidebarMenuButton>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent
//                         className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
//                         side={isMobile ? "bottom" : "right"}
//                         align="end"
//                         sideOffset={4}
//                     >
//                         <DropdownMenuLabel className="p-0 font-normal">
//                             <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                                 <Avatar className="h-8 w-8">
//                                     <AvatarImage
//                                         src={
//                                             currentUser.user.image || ""
//                                         }
//                                         alt={currentUser.user.name}
//                                     />
//                                     <AvatarFallback>{initials}</AvatarFallback>
//                                 </Avatar>
//                                 <div className="grid flex-1 text-left text-sm leading-tight">
//                                     <span className="truncate font-medium">
//                                         {currentUser.user.name}
//                                     </span>
//                                     <span className="truncate text-xs">{currentUser.user.email}</span>
//                                 </div>
//                             </div>
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuGroup>
//                             <DropdownMenuItem>
//                                 <Sparkles />
//                                 Upgrade to Pro
//                             </DropdownMenuItem>
//                         </DropdownMenuGroup>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuGroup>
//                             <DropdownMenuItem>
//                                 <BadgeCheck />
//                                 Account
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                                 <CreditCard />
//                                 Billing
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                                 <Bell />
//                                 Notifications
//                             </DropdownMenuItem>
//                         </DropdownMenuGroup>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem asChild>
//                             <Logout />
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </SidebarMenuItem>
//         </SidebarMenu>
//     );
// }
