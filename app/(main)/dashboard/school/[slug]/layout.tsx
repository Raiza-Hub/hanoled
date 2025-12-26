import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";


interface LayoutProps {
    children: ReactNode;
    params: Promise<{ slug: string }>;
}


const Layout = async ({ children, params }: LayoutProps) => {
    const { slug } = await params;

    return (
        <SidebarProvider>
            <div className="w-full flex h-screen">
                <div className="hidden lg:flex">
                    <AppSidebar slug={slug} />
                </div>

                <main className="flex-1 flex flex-col overflow-y-auto">
                    {children}
                </main>
            </div>

        </SidebarProvider>
    );
};

export default Layout;

