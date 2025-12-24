"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { inviteSchema, TinviteSchema } from "@/lib/validators/resource"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { CustomToast } from "@/components/custom-toast"
import { ParamValue } from "next/dist/server/request/params"

type CreateSubjectFormProps = {
    slug: string | ParamValue
    onSuccess: () => void;
};

const CreateTeacherForm = ({ slug, onSuccess }: CreateSubjectFormProps) => {
    const queryClient = useQueryClient();
    const [openRole, setOpenRole] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm<TinviteSchema>({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            emails: [
                { value: "" },
            ],
            role: ""
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "emails",
    })

    const selectedRole = watch("role")



    const { mutate, isPending } = useMutation({
        mutationFn: async (userData: TinviteSchema) => {
            const res = await fetch(`/api/admin/${slug}/invite-member`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            if (!res.ok) {
                const errData = await res.json();
                CustomToast({
                    message: errData.message,
                    variant: "error"
                });
            }

            const data = await res.json();
            return data;
        },
        onSuccess: () => {
            CustomToast({ message: "Invite(s) sent successfully." });
            if (onSuccess) onSuccess();
            queryClient.invalidateQueries({ queryKey: ["get-members", slug] });
            // Also invalidate unassigned member dropdown used in class creation
            queryClient.invalidateQueries({ queryKey: ["get-unassigned-member", slug] });
        },
    });

    const onSubmit = async (data: TinviteSchema) => {
        mutate(data)
    }

    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
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
                                        "focus-visible:ring-red-500 border-red-500": errors.emails?.[index]?.value,
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


                <div className="*:not-first:mt-2">
                    <Label htmlFor="role">Select Role</Label>
                    <Select
                        value={selectedRole || ""}
                        onValueChange={(val) =>
                            setValue("role", val as TinviteSchema["role"], {
                                shouldValidate: true,
                            })
                        }
                        open={openRole}
                        onOpenChange={setOpenRole}
                    >
                        <SelectTrigger id="role" className={cn(
                            "w-full **:data-desc:hidden cursor-pointer",
                            errors.role
                                ? "border-red-500 focus-visible:ring-red-500 shadow-sm shadow-red-200"
                                : "border-input"
                        )}>
                            <SelectValue placeholder="Choose a plan" />
                        </SelectTrigger>
                        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                            <SelectItem value="admin" className="cursor-pointer">
                                Admin
                                <span
                                    className="mt-1 block text-xs text-muted-foreground"
                                    data-desc
                                >
                                    Full access to manage users, settings, and data.
                                </span>
                            </SelectItem>
                            <SelectItem value="member" className="cursor-pointer">
                                Member
                                <span
                                    className="mt-1 block text-xs text-muted-foreground"
                                    data-desc
                                >
                                    Limited access to assigned tasks and shared resources.
                                </span>
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {errors.role && (
                        <p className="text-sm text-red-500">{errors.role.message}</p>
                    )}
                </div>

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

export default CreateTeacherForm
