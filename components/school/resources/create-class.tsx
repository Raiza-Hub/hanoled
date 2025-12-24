"use client";

import { CustomToast } from "@/components/custom-toast";
import { SelectTeacher } from "@/components/select-teacher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { classLevelSchema, TclassLevelSchema } from "@/lib/validators/resource";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, ClassItem } from "@/type";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";


type CreateClassFormProps = {
    slug: string
    onSuccess?: () => void;
};


const CreateClassForm = ({ slug, onSuccess }: CreateClassFormProps) => {
    const queryClient = useQueryClient();

    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<TclassLevelSchema>({
        resolver: zodResolver(classLevelSchema),
        defaultValues: {
            className: "",
            level: "",
            limit: 0,
            memberId: ""
        }
    });

    const selectedMember = watch("memberId")

    const { mutate, isPending } = useMutation({
        mutationFn: async (userData: TclassLevelSchema) => {
            const res = await fetch(`/api/admin/${slug}/create-class`, {
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
        onMutate: async (newClass) => {
            await queryClient.cancelQueries({ queryKey: ["get-classes", slug] });
            const previousClasses = queryClient.getQueryData(["get-classes", slug]);

            // Create a temporary optimistic class object
            const optimisticClass = {
                id: `temp-${Date.now()}`,
                class: newClass.className,
                level: newClass.level,
                limit: newClass.limit,
                memberId: newClass.memberId,
                member: { user: { name: "Assigning...", email: "", id: "", emailVerified: false, image: null, createdAt: "", updatedAt: "" } },
                organizationId: "",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            queryClient.setQueryData(["get-classes", slug], (old: ApiResponse<ClassItem> | undefined) => ({
                ...old,
                message: [...(old?.message || []), optimisticClass]
            }));

            // Close dialog immediately after optimistic update
            if (onSuccess) onSuccess();

            return { previousClasses };
        },
        onError: (err, newClass, context) => {
            queryClient.setQueryData(["get-classes", slug], context?.previousClasses);
            CustomToast({ message: err.message, variant: "error" });
        },
        onSuccess: () => {
            CustomToast({ message: "Class created successfully." });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["get-classes", slug] });
            // Also invalidate dropdown queries that use classes
            queryClient.invalidateQueries({ queryKey: ["get-all-classes", slug] });
            // Refresh unassigned members since a teacher was assigned
            queryClient.invalidateQueries({ queryKey: ["get-unassigned-member", slug] });
        },
    });

    const onSubmit = async (data: TclassLevelSchema) => {
        mutate(data);
    };

    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-2 py-2">
                        <Label htmlFor="className">Class name</Label>
                        <Input
                            {...register("className")}
                            id="className"
                            className={cn({
                                "focus-visible:ring-red-500": errors.className,
                            })}
                            placeholder="SS1 White"
                        />
                        {errors?.className && (
                            <p className="text-sm text-red-500">{errors.className.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2 py-2">
                        <Label htmlFor="level">Grade</Label>
                        <Input
                            {...register("level")}
                            id="level"
                            className={cn({
                                "focus-visible:ring-red-500": errors.level,
                            })}
                            placeholder="SS1"
                        />
                        {errors?.level && (
                            <p className="text-sm text-red-500">{errors.level.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2 py-2">
                        <Label htmlFor="limit">Limit</Label>
                        <Input
                            {...register("limit", { valueAsNumber: true })}
                            id="limit"
                            type="number"
                            className={cn({
                                "focus-visible:ring-red-500": errors.limit,
                            })}
                            placeholder="Enter class limit"
                        />
                        {errors?.limit && (
                            <p className="text-sm text-red-500">{errors.limit.message}</p>
                        )}
                    </div>

                    <SelectTeacher<TclassLevelSchema>
                        label="Class teacher"
                        placeholder="Select class teacher"
                        fetchUrl={`/api/admin/${slug}/unassigned-members`}
                        fieldName="memberId"
                        selectedValue={selectedMember}
                        setValue={setValue}
                        error={errors?.memberId}
                        queryKey="get-unassigned-member"
                        searchWord="Search teacher..."
                        emptyField="No teacher found."
                        slug={slug}
                    />

                    <Button className="cursor-pointer" disabled={isPending}>
                        {isPending ? (
                            <div className="inline-flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                Creating...
                            </div>
                        ) : "Create Class"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateClassForm;