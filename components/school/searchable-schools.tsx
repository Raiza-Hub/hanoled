"use client";

import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SchoolsLists from "./school-lists";
import { useQuery } from "@tanstack/react-query";
import SchoolsSkeleton from "./school-skeleton";
import { SchoolsResponse } from "@/type";
import { NoResultsFound } from "../no-result";
import { getAllSchools } from "@/lib/api";


// Make the URL show what inside the searchbox and maybe add a badge icon to show the country

export default function SearchableSchools() {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: schools, isLoading, isError, error } = useQuery({
        queryKey: ['schools'],
        queryFn: getAllSchools
    })

    // Filter organizations based on search query
    const filteredOrganizations = useMemo(() => {
        const allSchools = schools?.message ?? [];

        if (!searchQuery.trim()) {
            return allSchools; // ✅ always array
        }

        const query = searchQuery.toLowerCase();
        return allSchools.filter((school) =>
            school.name.toLowerCase().includes(query)
        );
    }, [schools, searchQuery]);

    if (isLoading) {
        return <SchoolsSkeleton />;
    }

    if (isError) {
        return (
            <div role="alert" className="flex flex-col items-center justify-center py-10 px-6 border rounded-md bg-accent">
                <h2 className="font-medium text-foreground mb-2">We couldn’t load schools</h2>
                <p className="text-sm text-muted-foreground">{error?.message ?? 'Please try again later.'}</p>
            </div>
        );
    }


    return (
        <>
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="w-full flex flex-col-reverse md:flex-row items-center gap-2">
                    {/* Search Input */}
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
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-fit bg-card border-border px-2 cursor-pointer"
                            aria-label="Open filters"
                        >
                            {/* TODO: add a dropdown for filtering */}
                            <Filter className="h-4 w-4" />
                            <span>Filter</span>
                        </Button>
                        <div className="flex items-center">

                            <Link
                                href="/dashboard/create"
                                className={buttonVariants({ size: "sm" })}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                New school
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {schools?.message?.length === 0 ? (
                // No schools at all from fetch
                <div className="flex flex-col items-center justify-center py-10 px-6 border rounded-md bg-accent">
                    <h2 className="font-medium text-foreground mb-2">No schools found</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        You haven’t created any schools yet.
                    </p>
                    <Link href="/dashboard/create" className={buttonVariants({ size: "sm" })}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create new school
                    </Link>
                </div>
            ) : filteredOrganizations?.length === 0 && searchQuery.trim() ? (
                // Schools exist, but search gave no match
                <NoResultsFound searchQuery={searchQuery} />
            ) : (
                // Show list of schools
                <SchoolsLists schools={filteredOrganizations} />
            )}
        </>
    );
}
