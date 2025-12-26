"use client"

import { IconCategoryMinus, IconFileTypeXls } from "@tabler/icons-react";
import ClassActionMenu from "./class-action-menu";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ClassItem } from "@/type";
import { ErrorState } from "../error-state";
import ClassListLoading from "./class-list-loading";
import { EmptyState } from "../empty-state";
import { useState } from "react";



const ClassLists = ({ slug }: { slug: string }) => {

    const { data: classes, isLoading, isError, error } = useQuery<ApiResponse<ClassItem>>({
        queryKey: ["get-classes", slug],
        queryFn: async () => {
            const res = await fetch(`/api/admin/${slug}/get-classes`, {
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

    if (isError) {
        return (
            <ErrorState
                title="We couldn't load classes"
                message={error?.message ?? 'Please try again later.'}
            />
        );
    }

    if (isLoading) return <ClassListLoading />;

    if (!classes?.message.length) {
        return (
            <EmptyState
                icon={
                    <IconCategoryMinus className="text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg" />
                }
                title="No Classes Yet"
                description="You haven&apos;t created any classes yet. Get started by creating your first class."
            />
        );
    }



    return (
        <div className="space-y-4">
            {classes?.message?.map((item) => (
                <div
                    key={item.id}
                    className="w-full rounded-sm border bg-white p-4 flex items-center justify-between hover:bg-zinc-50"
                >
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1.5">
                            <h2 className="text-base font-medium text-zinc-900">
                                {item.class}
                            </h2>
                            <span className="text-xs bg-zinc-100 text-black px-2 py-1 rounded-sm">
                                {item.member.user.name}
                            </span>
                        </div>

                        <div className="text-zinc-600 text-sm mb-1.5">
                            <div className="flex">
                                <p className="text-muted-foreground">Class limit |</p>
                                <div className="border-zinc-300 pl-2">{item.limit}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-zinc-500 text-sm">
                            <IconFileTypeXls className="h-4 w-4" />
                            <span>18 spreadsheets</span>
                        </div>
                    </div>

                    <ClassActionMenu
                        slug={slug}
                        selectedClass={item}
                    />
                </div>
            ))}
        </div>

    );
}

export default ClassLists;