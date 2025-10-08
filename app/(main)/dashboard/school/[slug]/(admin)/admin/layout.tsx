import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { AppSidebar } from "./app-sidebar";
import { Button } from "@/components/ui/button";
import { Bell, MoreVertical } from "lucide-react";

export default async function AuthLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ slug: string; }>;
}>) {
    const { slug } = await params;

    return (
        <SidebarProvider>
            <AppSidebar slug={slug} />
            <SidebarInset>
                <header className="flex shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10 bg-white border-b-slate-200">
                    <SidebarTrigger className="-ml-1" />
                    {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                    <div className="w-full p-2">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-semibold">
                                school name
                            </h1>
                            <div className="flex items-center ml-auto">
                                <Button variant="ghost" size="icon">
                                    <Bell />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical />
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 py-20 px-6">
                    <div className="min-h-[100vh] flex-1  md:min-h-min">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}