import type { ReactNode } from "react";
import Sidebar, { SidebarItem } from "@/components/sidebar";
import { FileClock, FolderTree, HelpCircle, LayoutDashboard, Settings, UserCog, UserPen, Users } from "lucide-react";
import { CreateOptionsCarousel } from "@/components/school/create-rescource";

export default async function SchoolDashboardPage({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ slug: string; }>;
}) {
    const { slug } = await params;
    
    return (
        <div className="max-w-7xl mx-auto flex flex-col">
            <div>
                <CreateOptionsCarousel />
            </div>
           
        </div> 
    );
}
