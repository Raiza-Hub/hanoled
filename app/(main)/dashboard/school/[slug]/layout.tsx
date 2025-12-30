import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";


interface LayoutProps {
    children: ReactNode;
    params: Promise<{ slug: string }>;
}


import MobileNav from "@/components/mobile-nav";

const Layout = async ({ children, params }: LayoutProps) => {
    const { slug } = await params;

    return (
        <SidebarProvider>
            <div className="w-full flex h-screen">
                <div className="hidden lg:flex">
                    <AppSidebar slug={slug} />
                </div>

                <div className="lg:hidden">
                    <MobileNav slug={slug} />
                </div>

                <main className="flex-1 flex flex-col overflow-y-auto mb-16 lg:mb-0">
                    {children}
                </main>
            </div>

        </SidebarProvider>
    );
};

export default Layout;

