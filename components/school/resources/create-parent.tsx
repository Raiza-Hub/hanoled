"use client"

import { CustomToast } from "@/components/custom-toast"
import { SelectStudent } from "@/components/select-student"
// import { SelectUser } from "@/components/select-teacher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { parentSchema, TparentSchema } from "@/lib/validators/resource"
import { Student } from "@/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { LoaderCircle, Trash2 } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"


type CreateParentFormProps = {
    slug: string
    onSuccess: () => void;
};


const CreateParentForm = ({ slug, onSuccess }: CreateParentFormProps) => {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm<TparentSchema>({
        resolver: zodResolver(parentSchema),
        defaultValues: {
            emails: [{ value: "" }],
            studentIds: [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "emails",
    })

    const selectedStudents = watch("studentIds")


    const { mutate, isPending } = useMutation({
        mutationFn: async (userData: TparentSchema) => {
            const res = await fetch(`/api/admin/${slug}/invite-parent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            if (!res.ok) {
                const errData = await res.json();
                CustomToast({
                    message: errData.message || "Something went wrong",
                    variant: "error"
                });
            }

            const data = await res.json();
            return data;
        },
        onSuccess: () => {
            CustomToast({ message: "Invite(s) sent successfully." });
            if (onSuccess) onSuccess();
        },
    });


    const onSubmit = (data: TparentSchema) => {
        console.log(data);
        mutate(data)
    }

    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <Label htmlFor="emails">Invite via email</Label>
                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                                <Input
                                    type="email"
                                    id="emails"
                                    placeholder="hi@yourcompany.com"
                                    {...register(`emails.${index}.value`)}
                                    className={cn({
                                        "focus-visible:ring-red-500 border-red-500":
                                            errors.emails?.[index]?.value,
                                    })}
                                />
                                {fields.length > 1 && (
                                    <Button
                                        type="button"
                                        size="icon"
                                        onClick={() => remove(index)}
                                        className="cursor-pointer bg-red-100 hover:bg-red-100/60"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        {Array.isArray(errors.emails) && errors.emails.some((e) => e?.value) && (
                            <p className="text-sm text-red-500">
                                {errors.emails
                                    .map((e) => e?.value?.message)
                                    .filter(Boolean)
                                    .join(", ")}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => append({ value: "" })}
                        className="text-sm underline hover:no-underline cursor-pointer"
                    >
                        + Add another
                    </button>
                </div>

                <SelectStudent<TparentSchema>
                    label="Select Students"
                    placeholder={
                        selectedStudents.length > 0
                            ? `${selectedStudents.length} student(s) selected`
                            : "Select students"
                    }
                    fetchUrl={`/api/admin/${slug}/get-students`}
                    fieldName="studentIds"
                    selectedValue={selectedStudents}
                    setValue={setValue}
                    error={errors?.studentIds}
                    queryKey="get-students"
                    searchWord="Search student..."
                    emptyField="No student found."
                    slug={slug}
                />

                <Button
                    className="w-full py-3 font-bold text-white"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                            Sending Invites...
                        </>
                    ) : (
                        "Send Invites"
                    )}
                </Button>
            </form>
        </div>
    )
}

export default CreateParentForm
