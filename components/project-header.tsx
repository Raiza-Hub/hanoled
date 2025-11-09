"use client"

import { Badge } from "@/components/ui/badge"
import { UniqueSchool } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

function HeaderSkeleton() {
    return (
        <header className="border-b px-6 py-12">
            <div className="flex flex-col md:items-center md:flex-row md:justify-between space-y-10 md:space-y-0">
                {/* Left section - Project title and badge */}
                <div className="flex items-center gap-4">
                    <div className="animate-pulse bg-muted w-48 h-6 rounded-md"></div> {/* Placeholder for title */}
                    <div className="animate-pulse bg-muted w-24 h-6 rounded-sm"></div> {/* Placeholder for badge */}
                </div>

                
            </div>
        </header>
    );
}


export function ProjectHeader({ slug }: { slug: string }) {

    const { data: school, isLoading } = useQuery<UniqueSchool, Error>({
        queryKey: ["get-school", slug],
        queryFn: async () => {
            const res = await fetch(`/api/school/get-school/${slug}`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            return res.json();
        },
    });

    if (isLoading) {
        return <HeaderSkeleton />
    }


    if (!school?.success) {
        redirect("/sign-in");
    }
    

    return (
        <header className="border-b px-6 py-12">
            <div className="flex flex-col md:items-center md:flex-row md:justify-between space-y-10 md:space-y-0">
                {/* Left section - Project title and badge */}
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="lg:max-w-sm xl:max-w-2xl text-xl sm:text-3xl font-semibold truncate">{school.message.name}</h1>
                    </div>
                    <Badge variant="outline" className="border py-0.5 bg-background rounded-sm">
                        {school.message.category}
                    </Badge>
                </div>

                {/* Right section - Stats and status */}
                <div className="flex items-center gap-12">
                    {/* Stats group */}
                    <div className="flex gap-12">
                        {/* Tables */}
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Teachers</p>
                            <p className="text-lg font-medium mt-1">{school.message.teacherNo}</p>
                        </div>

                        {/* Functions */}
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Parents</p>
                            <p className="text-lg font-semibold mt-1">{school.message.parentNo}</p>
                        </div>

                        {/* Replicas */}
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Students</p>
                            <p className="text-lg font-semibold mt-1">{school.message.studentNo}</p>
                        </div>
                    </div>

                    {/* Status indicator */}
                    {/* <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-md">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-sm text-neutral-300">Project Status</span>
                    </div> */}
                </div>
            </div>
        </header>
    )
}
