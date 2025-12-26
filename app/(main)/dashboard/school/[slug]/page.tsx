import { ProjectHeader } from "@/components/project-header";
import { CreateOptionsCarousel } from "@/components/school/create-rescource";
import SpreadsheetList from "@/components/spreadsheet-list";
import type { ReactNode } from "react";

export default async function SchoolDashboardPage({
    params,
}: {
    children: ReactNode;
    params: Promise<{ slug: string; }>;
}) {
    const { slug } = await params;

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col">
            <div className="">
                <ProjectHeader slug={slug} />
            </div>
            <div className="max-w-dvw px-6 mt-20">
                <CreateOptionsCarousel />
            </div>

            {/* <div className="mt-20 mb-10">
                <SpreadsheetList />
            </div> */}

        </div>


    );
}
