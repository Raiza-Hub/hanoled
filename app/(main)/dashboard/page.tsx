

import DashboardSearchBar from "@/components/dashboard-search-bar";
import SchoolsLists from "@/components/school/school-lists";
import { buttonVariants } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";


export default function DashboardPage() {

    return (
        <div className="w-full mx-auto max-w-7xl bg-background p-6 mt-10">
            <h1 className="text-2xl font-semibold mb-12">Schools</h1>
            <div className="">
                <DashboardSearchBar />
            </div>
            {/* <div className="w-full flex items-center justify-end gap-4 mb-3 md:mb-0">
                <div className="flex items-center">

                    <Link
                        href="/onboarding"
                        className={buttonVariants({ size: "sm" })}
                    >
                        <IconPlus className="h-4 w-4" />
                        New school
                    </Link>
                </div>
            </div> */}
            <SchoolsLists />
        </div>
    );
}
