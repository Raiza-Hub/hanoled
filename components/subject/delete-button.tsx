"use client";

import { Button } from "@/components/ui/button";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubjectsResponse } from "@/type";
import { CustomToast } from "../custom-toast";

interface SubjectDeleteButtonProps {
    slug: string;
    selectedSubjects: string[];
    setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>;
    disabled?: boolean;
}

export const SubjectDeleteButton = ({
    slug,
    selectedSubjects,
    setSelectedSubjects,
}: SubjectDeleteButtonProps) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (subjects: string[]) => {
            const res = await fetch(`/api/admin/${slug}/delete-subject`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ subjects }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            return data;
        },
        onMutate: async (subjectsToDelete) => {
            await queryClient.cancelQueries({ queryKey: ["get-subjects", slug] });
            const previousSubjects = queryClient.getQueryData(["get-subjects", slug]);

            queryClient.setQueryData(["get-subjects", slug], (old: SubjectsResponse | undefined) => ({
                ...old,
                message: (old?.message || []).filter(
                    (s: string) => !subjectsToDelete.includes(s)
                )
            }));

            // Clear selection immediately so button swaps back to "New subject"
            setSelectedSubjects([]);

            return { previousSubjects };
        },
        onError: (error, subjectsToDelete, context) => {
            queryClient.setQueryData(["get-subjects", slug], context?.previousSubjects);
            CustomToast({ variant: "error", message: error.message });
        },
        onSuccess: (data) => {
            CustomToast({ message: data.message });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["get-subjects", slug] });
        },
    });

    if (selectedSubjects.length === 0) return null;


    const handleDelete = async () => {
        mutate(selectedSubjects);
    }

    return (
        <div className="flex justify-end">
            <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={isPending}
                className="flex items-center gap-2 cursor-pointer"
            >

                <div className="flex items-center gap-1">
                    <IconTrash className="size-4 text-red-500" />
                    Delete ({selectedSubjects.length})
                </div>
            </Button>
        </div>
    );
};
