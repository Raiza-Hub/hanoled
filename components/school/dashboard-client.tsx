"use client";

import { SchoolResponse } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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


export async function getSchool(slug: string): Promise<SchoolResponse> {
    const res = await fetch(`/api/school/${slug}`);

    if (!res.ok) {
        throw new Error("Failed to fetch schools");
    }

    const data = await res.json();
    console.log(data);
    

    return {
        ...data,
        message: data.message
            ? (() => {
                try {
                    return {
                        ...data.message,
                        metadata: data.message.metadata
                            ? JSON.parse(data.message.metadata)
                            : {},
                    };
                } catch {
                    console.warn(
                        `Invalid JSON in organization metadata for slug: ${slug}`,
                    );
                    return { ...data.message, metadata: {} };
                }
            })() : {}
    };
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

    useEffect(() => {
        if (!school?.roles) return;

        if (school?.roles.length === 0) {
            router.replace("/unauthorized");
            return;
        }

        // Single role → redirect to correct dashboard path
        if (school?.roles.length === 1) {
            const targetPath = mapRoleToPath(school?.roles[0]);
            router.replace(`/dashboard/school/${slug}/${targetPath}`);
            return;
        }

        // Multiple roles → choose role page
        if ((school?.roles?.length ?? 0) > 1) {
            router.replace(`/dashboard/school/${slug}/choose-role`);
            return;
        }
    }, [
        school, slug,
    ]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoaderCircle className="animate-spin h-6 w-6" />
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
