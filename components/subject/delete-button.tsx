"use client";

import { Button } from "@/components/ui/button";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    disabled,
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
        onSuccess: (data) => {
            setSelectedSubjects([]);
            CustomToast({
                message: data.message,
            });
            queryClient.invalidateQueries({ queryKey: ["get-all-classes", slug] });
        },
        onError: (error) => {
            CustomToast({
                variant: "error",
                message: error.message,
            });
        },
    });

    if (selectedSubjects.length === 0) return null;


    const handleDelete = async () => {
        mutate(selectedSubjects);
    }

    return (
        <div className="flex justify-end mb-4">
            <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={isPending}
                className="flex items-center gap-2 cursor-pointer"
            >

                {isPending ? (
                    <>
                        <IconLoader2 className="w-4 h-4 animate-spin mr-2" />
                        Deleting...
                    </>
                ) : (
                    <div className="flex items-center gap-1">

                        <IconTrash className="size-4 text-red-500" />
                        Delete ({selectedSubjects.length})
                    </div>
                )}
            </Button>
        </div>
    );
};
