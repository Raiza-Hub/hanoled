
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomToast } from "../custom-toast";
import { ApiResponse, ClassItem } from "@/type";

interface ClassDeleteButtonProps {
    slug: string;
    selectedClass: ClassItem | null;
}

const ClassActionMenu = ({ slug, selectedClass }: ClassDeleteButtonProps) => {
    const queryClient = useQueryClient();

    console.log(selectedClass, "selectedClass");

    const { mutate } = useMutation({
        mutationFn: async (className: string) => {
            const res = await fetch(`/api/admin/${slug}/delete-class`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ className }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            return data;
        },
        onMutate: async (classNameToDelete) => {
            await queryClient.cancelQueries({ queryKey: ["get-classes", slug] });
            const previousClasses = queryClient.getQueryData(["get-classes", slug]);

            queryClient.setQueryData(["get-classes", slug], (old: ApiResponse<ClassItem> | undefined) => ({
                ...old,
                message: (old?.message || []).filter(
                    (c: ClassItem) => c.class !== classNameToDelete
                )
            }));

            return { previousClasses };
        },
        onError: (error, className, context) => {
            queryClient.setQueryData(["get-classes", slug], context?.previousClasses);
            CustomToast({ variant: "error", message: error.message });
        },
        onSuccess: (data) => {
            CustomToast({ message: data.message });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["get-classes", slug] });
        },
    });


    return (
        <div className="bg-white not-hover:shadow-xs border rounded-md">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-sm shadow-none "
                        aria-label="Open edit menu"
                    >
                        <IconDotsVertical className="h-4 w-4" aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="-translate-x-10">
                    {/* <DropdownMenuItem>
                        <IconPencil className="h-4 w-4" />
                        Rename
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                        className="text-red-600 hover:text-red-600/80 focus:text-red-600/80"
                        onClick={() => {
                            if (!selectedClass) return;
                            mutate(selectedClass.class); // pass the class name here
                        }}
                    >
                        <IconTrash className="h-4 w-4 text-red-600 hover:text-red-600/80 focus:text-red-600/80" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default ClassActionMenu;