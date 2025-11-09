"use client";

import { Skeleton } from "@/components/ui/skeleton";

const UserProfileLoading = () => {
    return (
        <div className="flex flex-col gap-2 space-y-6">
            {/* Avatar upload skeleton */}
            <div className="inline-flex items-center gap-4 align-top">
                <Skeleton className="size-20 rounded-full border" />

                <div className="relative inline-block space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <div className="space-x-2">
                        <Skeleton className="inline-block h-5 w-28 rounded-md" />
                        <Skeleton className="inline-block h-5 w-20 rounded-md" />
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-2 py-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full rounded-md" />
                </div>


                <div className="grid gap-2 py-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full rounded-md" />
                </div>

                <div className="grid gap-2 py-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full rounded-md" />
                </div>
            </div>

            {/* Danger Zone (Delete account) */}
            <div className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-80" />
                <Skeleton className="h-4 w-28 rounded-md" />
            </div>
        </div>
    );
};

export default UserProfileLoading;
