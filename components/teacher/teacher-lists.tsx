"use client"

import { ApiResponse, ClassItem, MemberResponse } from "@/type";
import { IconBriefcase, IconCategoryPlus, IconMail, IconUserOff } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import TeacherActionMenu from "./teacher-actions-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EllipsisIcon, FolderPen, Loader2, Trash } from "lucide-react";
import TeacherListSkeleton from "./teacher-list-skeleton";
import { ErrorState } from "../error-state";
import { EmptyState } from "../empty-state";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";


const TeacherLists = ({ slug }: { slug: string }) => {

    const { data: members, isLoading: members_isLoading, isError: members_isError, error: members_error } = useQuery<MemberResponse>({
        queryKey: ["get-members", slug],
        queryFn: async () => {
            const res = await fetch(`/api/admin/${slug}/get-members`, {
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

    const { data: classes, isLoading: classes_isLoading, isError: classes_isError, error: classes_error } = useQuery<ApiResponse<ClassItem>>({
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

    if (members_isLoading || classes_isLoading) {
        return <TeacherListSkeleton />;
    }



    if (members_isError || classes_isError) {
        return (
            <ErrorState
                title="We couldn't fetch the data"
                message={(members_error?.message || classes_error?.message) ?? 'Please try again later.'}
            />
        );
    }

    if (!members?.message.length) {
        return (
            <EmptyState
                icon={
                    <IconUserOff className="text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg" />
                }
                title="No Members Yet"
                description="You haven&apos;t invited any members yet. Get started by sending your first invite."
            />
        );
    }




    console.log(classes);

    return (
        <div className="">
            <div className="flex flex-col justify-center">

                {/* Wrap headers and rows in a horizontal scroll container */}
                <div className="overflow-x-auto">
                    {/* Table headers */}
                    <div className="min-w-[600px] grid grid-cols-[3fr_1fr_1fr_1fr_1fr] text-sm font-medium text-zinc-600 bg-zinc-100 rounded-sm p-2 mb-4">
                        <div>User name</div>
                        <div>Role</div>
                        <div>Class</div>
                        <div>Date added</div>
                        <div className="text-right">Actions</div>
                    </div>

                    {/* Table rows */}
                    <div className="space-y-2">
                        {members?.message.map((member) => (
                            <div
                                key={member.id}
                                className="min-w-[600px] grid grid-cols-[3fr_1fr_1fr_1fr_1fr] items-center p-2 border-b hover:bg-zinc-50 transition-colors duration-150 relative"
                                role="listitem"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={member?.user.image ?? ""} alt={member.user.name} />
                                        <AvatarFallback>{member.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm">
                                        <p className="font-medium text-zinc-900">{member.user.name}</p>
                                        <p className="text-zinc-500 w-40 md:w-full truncate">{member.user.email}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs bg-zinc-200 text-black px-2 py-1 rounded-sm">
                                        {member.role}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1 transition-colors text-sm font-medium">
                                    {members && classes?.message?.some(
                                        (c) => c.member?.user?.id === member.user.id
                                    ) ? (
                                        classes.message
                                            .filter((c) => c.member?.user?.id === member.user.id)
                                            .map((c) => (
                                                <span key={c.id}>{c.class}</span>
                                            ))
                                    ) : (
                                        <span className="text-muted-foreground italic">No class assigned</span>
                                    )}
                                </div>

                                <div className="text-sm text-zinc-600">
                                    {new Date(member.createdAt).toLocaleDateString()}
                                </div>

                                <div className="ml-auto hover:shadow-xs border rounded-md bg-white">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost" className="rounded-sm shadow-none" aria-label="Open edit menu">
                                                <EllipsisIcon className="h-4 w-4" aria-hidden="true" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="-translate-x-8">
                                            <DropdownMenuItem>
                                                <FolderPen className="h-4 w-4" />
                                                Rename
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600 hover:text-red-600/80 focus:text-red-600/80">
                                                <Trash className="h-4 w-4 text-red-600 hover:text-red-600/80 focus:text-red-600/80" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default TeacherLists;
