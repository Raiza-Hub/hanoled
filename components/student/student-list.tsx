"use client"

import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EllipsisIcon, FolderPen, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ApiResponse, ClassItem, Student } from "@/type";
import { useRouter } from "next/navigation";



const StudentLists = ({ slug }: { slug: string }) => {
    const router = useRouter();
    
    const { data: students, isLoading: student_isLoading, isError: student_isError, error: student_error } = useQuery<ApiResponse<Student>>({
        queryKey: ["get-students", slug],
        queryFn: async () => {
            const res = await fetch(`/api/admin/${slug}/get-students`, {
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

    // const { data: classes, isLoading: classes_isLoading, isError: classes_isError, error: classes_error } = useQuery<ApiResponse<ClassItem>>({
    //     queryKey: ["get-classes", slug],
    //     queryFn: async () => {
    //         const res = await fetch(`/api/admin/${slug}/get-classes`, {
    //             method: "GET",
    //             credentials: "include",
    //         });
    //         if (!res.ok) {
    //             const errorData = await res.json();
    //             throw new Error(errorData.message);
    //         }
    //         return res.json();
    //     },
    // });

    // if (students_isLoading || classes_isLoading) {
    //     return <TeacherListSkeleton />;
    // }



    // if (students_isError || classes_isError) {
    //     return (
    //         <ErrorState
    //             title="We couldn't fetch the data"
    //             message={(students_error?.message || classes_error?.message) ?? 'Please try again later.'}
    //         />
    //     );
    // }

    // if (!students?.message.length) {
    //     return (
    //         <EmptyState
    //             icon={
    //                 <IconUserOff className="text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg" />
    //             }
    //             title="No students Yet"
    //             description="You haven&apos;t invited any students yet. Get started by sending your first invite."
    //         />
    //     );
    // }

    console.log(students);
    


    return ( 
        <div className="">
            <div className="flex flex-col justify-center">

                {/* Wrap headers and rows in a horizontal scroll container */}
                <div className="overflow-x-auto">
                    {/* Table headers */}
                    <div className="min-w-[600px] grid grid-cols-[3fr_1fr_1fr_1fr] text-sm font-medium text-zinc-600 bg-zinc-100 rounded-sm p-2 mb-4">
                        <div>User name</div>
                        <div>Gender</div>
                        <div>Date added</div>
                        <div className="text-right">Actions</div>
                    </div>

                    {/* Table rows */}
                    <div className="space-y-2">
                        {students?.message.map((student) => (
                            <div
                                key={student.id}
                                className="min-w-[600px] grid grid-cols-[3fr_1fr_1fr_1fr] items-center p-2 border-b hover:bg-zinc-50 transition-colors duration-150 relative cursor-pointer"
                                role="listitem"
                                onClick={() => router.push(`/dashboard/school/${slug}/students/${student.id}`)}
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={student?.image ?? ""} alt={student.firstName} />
                                        <AvatarFallback>{student.firstName?.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm">
                                        <p className="font-medium text-zinc-900">{student.firstName}{" "}{student.lastName}</p>
                                        <p className="text-zinc-500 w-46 md:w-full truncate">{student.guardianEmail}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs bg-zinc-200 text-black px-2 py-1 rounded-sm">
                                        {student.gender}
                                    </span>
                                </div>

                                {/* <div className="flex items-center gap-1 transition-colors text-sm font-medium">
                                    {students && classes?.message?.some(
                                        (c) => c.student?.user?.id === student.user.id
                                    ) ? (
                                        classes.message
                                            .filter((c) => c.student?.user?.id === student.user.id)
                                            .map((c) => (
                                                <span key={c.id}>{c.class}</span>
                                            ))
                                    ) : (
                                        <span className="text-muted-foreground italic">No class assigned</span>
                                    )}
                                </div> */}

                                <div className="text-sm text-zinc-600">
                                    {new Date(student.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
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
 
export default StudentLists;