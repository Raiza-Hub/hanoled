"use client"

import { useCurrentSchoolActions } from "@/app/stores/school-store";
import { School } from "@/type";
import { IconBuildings, IconChevronRight } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { EmptyState } from "../empty-state";
import { NoResultsFound } from "../no-result";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import SchoolsSkeleton from "./school-skeleton";
import { ErrorState } from "../error-state";
import useDebounce from "@/hooks/use-debounce";

export default function SchoolsLists() {
    const setCurrentSchool = useCurrentSchoolActions();
    const router = useRouter();
    const searchParams = useSearchParams()
    const search = searchParams.get('search')

    const debouncedSearchQuery = useDebounce(search, 500);



    const { data: schools, isLoading, isError, error } = useQuery({
        queryKey: ['schools', debouncedSearchQuery],
        queryFn: async (): Promise<School> => {
            const res = await fetch("/api/school/all-schools", {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            return res.json();
        },
    })

    if (isLoading) {
        return <SchoolsSkeleton />;
    }

    if (isError) {
        return (
            <ErrorState
                title="We couldn't load schools"
                message={error?.message ?? 'Please try again later.'}
            />
        );
    }

    if (schools?.message.length === 0) {

        if (search?.trim()) {
            return <NoResultsFound searchQuery={search} />;
        }

        return (
            <EmptyState
                icon={<IconBuildings className="text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg" />}
                title="No Schools Yet"
                description="You haven&apos;t created any schools yet. Get started by creating your first school."
            />
        );
    }

    console.log(schools);


    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {schools?.message.map((school) => (
                <Card
                    key={school.id}
                    onClick={() => {
                        setCurrentSchool(school);
                        router.push(`/dashboard/school/${school.slug}`);
                    }}
                    className="group h-40 cursor-pointer border-border bg-card p-4 transition-colors hover:bg-accent rounded-md shadow-none"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="font-medium text-card-foreground mb-1 line-clamp-2">
                                {school.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Created at |{" "}
                                {new Date(school.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>

                            <Badge variant="outline" className="px-2 py-1 rounded-sm">
                                {school.country}
                            </Badge>
                        </div>
                        <IconChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                </Card>
            ))}
        </div>
    );
}
