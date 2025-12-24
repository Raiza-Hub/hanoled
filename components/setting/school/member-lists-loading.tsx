"use client";

import { Skeleton } from "@/components/ui/skeleton";

const MemberListsLoading = () => {
    const rows = Array.from({ length: 2 });

    return (
        <div className="mt-6">
            {/* Table header */}
            <div className="grid grid-cols-[3fr_1fr_1fr_1fr] text-sm font-medium text-zinc-600 bg-zinc-100 rounded-sm p-2 mb-4">
                <div>User name</div>
                <div>Role</div>
                <div>Date added</div>
            </div>

            {/* Skeleton rows */}
            <div className="space-y-2">
                {rows.map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center p-2 border-b rounded-sm"
                    >
                        {/* Avatar + name */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="flex flex-col space-y-1">
                                <Skeleton className="h-3 w-32 rounded" />
                                <Skeleton className="h-3 w-24 rounded" />
                            </div>
                        </div>

                        {/* Role */}
                        <Skeleton className="h-4 w-14 rounded" />

                        {/* Date */}
                        <Skeleton className="h-3 w-20 rounded" />

                        {/* Menu button placeholder */}
                        <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberListsLoading;
