import DashboardClient from "@/components/school/dashboard-client";
import type { ReactNode } from "react";

export default async function SchoolDashboardPage({
    children,
    params,
}: {
    children: ReactNode;
        params: Promise<{ slug: string; }>;
}) {
    const { slug } = await params;

    return (
        <DashboardClient slug={slug}>
            {children}
        </DashboardClient>
    );
}
