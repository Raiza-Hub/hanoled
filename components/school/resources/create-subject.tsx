"use client"

import { CustomToast } from "@/components/custom-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { subjectSchema, TsubjectSchema } from "@/lib/validators/resource";
import { CreateSubjectResponse, SubjectsResponse } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";


type CreateSubjectFormProps = {
    slug: string
    onSuccess: () => void;
};

const CreateSubjectForm = ({ slug, onSuccess }: CreateSubjectFormProps) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TsubjectSchema>({
        resolver: zodResolver(subjectSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (userData: TsubjectSchema): Promise<CreateSubjectResponse> => {
            const res = await fetch(`/api/admin/${slug}/create-subject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Something went wrong");
            }

            const data = await res.json();
            return data;
        },
        onMutate: async (newSubject) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['get-subjects', slug] });

            // Snapshot the previous value
            const previousSubjects = queryClient.getQueryData(['get-subjects', slug]);

            // Optimistically update to the new value
            queryClient.setQueryData(['get-subjects', slug], (old: SubjectsResponse | undefined) => ({
                ...old,
                message: [...(old?.message || []), newSubject.subjectName]
            }));

            // Close dialog immediately after optimistic update
            if (onSuccess) onSuccess();

            // Return context with the snapshotted value
            return { previousSubjects };
        },
        onError: (err, newSubject, context) => {
            // Roll back to the previous value on error
            queryClient.setQueryData(['get-subjects', slug], context?.previousSubjects);
            CustomToast({
                message: err.message || "Something went wrong",
                variant: "error"
            });
        },
        onSuccess: () => {
            CustomToast({ message: "Subject created successfully." });
        },
        onSettled: () => {
            // Always refetch after error or success to ensure cache is in sync
            queryClient.invalidateQueries({ queryKey: ['get-subjects', slug] });
        },
    });

    const onSubmit = async (data: TsubjectSchema) => {
        mutate(data);
    };


    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-2 py-2">
                        <Label htmlFor="subjectName">Subject name</Label>
                        <Input
                            {...register("subjectName")}
                            id="subjectName"
                            className={cn({
                                "focus-visible:ring-red-500": errors.subjectName,
                            })}
                            placeholder="Enter subject name"
                        />
                        {errors.subjectName && (
                            <p className="text-sm text-red-500">{errors.subjectName.message}</p>
                        )}
                    </div>

                    <Button className="cursor-pointer" disabled={isPending}>
                        {isPending ? (
                            <div className="inline-flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                Creating...
                            </div>
                        ) : "Create Subject"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateSubjectForm;