"use client";

import { CustomToast } from "@/components/custom-toast";
import { SelectOption } from "@/components/select-option";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { spreadSheetSchema, TspreadSheetSchema } from "@/lib/validators/resource";
import { ClassItem, SubjectItem } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronDownIcon, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type CreateSpreadsheetFormProps = {
    slug: string
    onSuccess: () => void;
};

const CreateSpreadsheetForm = ({ slug, onSuccess }: CreateSpreadsheetFormProps) => {

    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<TspreadSheetSchema>({
        resolver: zodResolver(spreadSheetSchema),
        defaultValues: {
            name: "",
            class: "",
            subject: "",
        }
    });

    const selectedClass = watch("class")
    const selectedSubject = watch("subject")


    const { mutate, isPending } = useMutation({
        mutationFn: async (userData: TspreadSheetSchema) => {
            const res = await fetch(`/api/admin/${slug}/spreadsheet`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (!res.ok) {
                const errData = await res.json();
                CustomToast({
                    message: errData.message || "Something went wrong",
                    variant: "error"
                });
            }

            return data;
        },
        onSuccess: () => {
            CustomToast({ message: "Spreadsheet created successfully." });
            if (onSuccess) onSuccess();
        },
    });

    const onSubmit = async (data: TspreadSheetSchema) => {
        mutate(data);
    };
    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-2 py-2">
                        <Label htmlFor="name">Spreadsheet name</Label>
                        <Input
                            {...register("name")}
                            id="name"
                            className={cn({
                                "focus-visible:ring-red-500": errors.name,
                            })}
                            placeholder="you@example.com"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>


                    <SelectOption<TspreadSheetSchema, ClassItem>
                        label="Class"
                        displayKey="class"
                        placeholder="Select Class"
                        fetchUrl={`/api/admin/${slug}/get-classes`}
                        fieldName="class"
                        selectedValue={selectedClass}
                        setValue={setValue}
                        error={errors?.class}
                        queryKey="get-all-classes"
                        searchWord="Search classes..."
                        emptyField="No class found."
                        slug={slug}

                    />

                    <SelectOption<TspreadSheetSchema, SubjectItem>
                        label="Subject"
                        placeholder="Select subject"
                        fetchUrl={`/api/member/${slug}/get-subjects`}
                        fieldName="subject"
                        selectedValue={selectedSubject}
                        setValue={setValue}
                        error={errors?.subject}
                        queryKey="get-all-subjects"
                        searchWord="Search subject..."
                        emptyField="No subject found."
                        slug={slug}
                    />

                    <Button className="cursor-pointer" disabled={isPending}>
                        {isPending ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateSpreadsheetForm;