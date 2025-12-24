"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UniqueSchool } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { EllipsisIcon, FolderPen, Trash } from "lucide-react";
import MemberListsLoading from "./member-lists-loading";

const MemberLists = ({ slug }: { slug: string }) => {
    const { data: school, isLoading, error } = useQuery<UniqueSchool, Error>({
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

    if (isLoading) return <MemberListsLoading />;


    return (
        <div className="mt-6">
            <div className="flex flex-col justify-center">

                <div className="grid grid-cols-[3fr_1fr_1fr_1fr] text-sm font-medium text-zinc-600 bg-zinc-100 rounded-sm p-2 mb-4">
                    <div className="">User name</div>
                    <div>Role</div>
                    <div>Date added</div>
                </div>


                <div className="space-y-">
                    {school?.message.members.map((member) => (
                        <div
                            key={member.id}
                            className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center p-2 border-b hover:bg-zinc-50 transition-colors duration-150 relative"
                            role="listitem"
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src={member?.user.image ?? ""}
                                        alt={member.user.name}
                                    />
                                    <AvatarFallback>
                                        {member.user.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <p className="font-medium text-zinc-900">{member.user.name}</p>
                                    <p className="text-zinc-500">{member.user.email}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-zinc-200 text-black px-2 py-1 rounded-sm">
                                    {member.role}
                                </span>
                            </div>

                            <div className="text-sm text-zinc-600">
                                {new Date(member.createdAt).toLocaleDateString()}
                            </div>
                            
                            {/* Create a reusable component for this */}
                            <div className="ml-auto hover:shadow-xs border rounded-md bg-white">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="rounded-sm shadow-none "
                                            aria-label="Open edit menu"
                                        >
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
    );
}

export default MemberLists;