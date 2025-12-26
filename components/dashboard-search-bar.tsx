"use client"

import { IconPlus } from "@tabler/icons-react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { buttonVariants } from "./ui/button";
import { Input } from "./ui/input";


const DashboardSearchBar = () => {
    const [searchQuery, setSearchQuery] = useQueryState("search", { defaultValue: "" });


    return (
        <div>
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="w-full flex flex-col-reverse md:flex-row items-center gap-2">

                    <div className="w-full relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for a school"
                            className="w-full md:w-80 pl-9 bg-card border-border"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search schools"
                        />
                    </div>


                    <div className="w-full flex items-center justify-end gap-4 mb-3 md:mb-0">
                        <div className="flex items-center">

                            <Link
                                href="/onboarding"
                                className={buttonVariants({ size: "sm" })}
                            >
                                <IconPlus className="h-4 w-4" />
                                New school
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardSearchBar;