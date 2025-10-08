"use client";

import { getSchool } from "@/lib/api";
import { SchoolResponse } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export function mapRoleToPath(role: string) {
    switch (role) {
        case "owner":
        case "admin":
            return "admin";
        case "member":
            return "teacher";
        case "parent":
            return "parent";
        default:
            return "unauthorized";
    }
}

interface DashboardClientProps {
    slug: string;
    children: React.ReactNode;
}



export default function DashboardClient({
    slug,
    children,
}: DashboardClientProps) {
    const router = useRouter();

    const { data: school, isLoading, isError } = useQuery({
        queryKey: ['get-school', slug],
        queryFn: () => getSchool(slug)
    })

    const redirectTarget = useMemo(() => {
        if (!school?.roles) return null;

        if (school.roles.length === 0) {
            return "/unauthorized";
        }

        if (school.roles.length === 1) {
            return `/dashboard/school/${slug}/${mapRoleToPath(school.roles[0])}`;
        }
        if (school.roles.length > 1) {
            return `/dashboard/school/${slug}/choose-role`;
        }

        return null;
    }, [school?.roles, slug]);

    useEffect(() => {
        if (!redirectTarget) return;
        router.replace(redirectTarget);
    }, [redirectTarget, router]);


    if (redirectTarget || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen" role="status" aria-live="polite">
                <LoaderCircle className="animate-spin h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Loading…</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                    <p className="text-gray-600">
                        Please refresh the page and try again.
                    </p>
                </div>
            </div>
        );
    }
    
    return <>{children}</>;
}
