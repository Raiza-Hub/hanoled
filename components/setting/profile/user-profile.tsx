"use client";

import { useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { TUpdateAccount, updateAccount } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import { useSubmitHandler } from "../submit-handle";
import DeleteAccount from "./delete-account";
import UserProfileLoading from "./user-profile-loading";

const UserProfile = () => {
    // const [supportAccess, setSupportAccess] = useState(false);
    const { mutate, isPending } = useSubmitHandler<FormData>({
        url: "/api/auth/update-profile",
        queryKeyValue: "user-profile",

    });

    const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
        accept: "image/*",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TUpdateAccount>({
        resolver: zodResolver(updateAccount),
    });

    const { data: user, error, isLoading } = useQuery({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const res = await fetch(`/api/auth/user-profile`, {
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

    const previewUrl = files[0]?.preview || null;
    const fileName = files[0]?.file.name || null;

    const onSubmit = async (data: TUpdateAccount) => {
        const formData = new FormData();

        // Add the file if it exists (field name must match multer config on backend)
        if (files[0]?.file instanceof File) {
            formData.append("file", files[0].file);
        }

        // Add other form fields
        if (data.name) {
            formData.append("name", data.name);
        }
        if (data.email) {
            formData.append("email", data.email);
        }

        mutate(formData);
    };

    if (isLoading) return <UserProfileLoading />;

    return (
        <div className="flex flex-col gap-2 space-y-6">
            {/* Avatar upload */}
            <div className="inline-flex items-center gap-4 align-top">
                <div
                    className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-input"
                    aria-label={
                        previewUrl ? "Preview of uploaded image" : "Default user avatar"
                    }
                >
                    {previewUrl ? (
                        <img
                            className="size-full object-cover"
                            src={previewUrl}
                            alt="Preview of uploaded image"
                            width={32}
                            height={32}
                        />
                    ) : (
                        <div
                            className="bg-muted flex size-full items-center justify-center rounded-full"
                            aria-hidden="true"
                        >
                            {user?.user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="relative inline-block space-y-2">
                    <h3 className="font-medium text-sm">Profile Picture</h3>
                    <div className="space-x-2">
                        <Button
                            onClick={openFileDialog}
                            size="sm"
                            variant="outline"
                            aria-haspopup="dialog"
                            className="cursor-pointer"
                        >
                            {fileName ? "Change image" : "Upload avatar"}
                        </Button>
                        {(fileName || user?.user.logo) && (
                            <Button
                                onClick={() => removeFile(files[0]?.id)}
                                className="cursor-pointer hover:bg-red-50 text-red-700 hover:text-red-700"
                                size="sm"
                                variant="outline"
                                aria-label={`Remove ${fileName}`}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                    <input
                        {...getInputProps()}
                        className="sr-only"
                        aria-label="Upload image file"
                        tabIndex={-1}
                    />
                </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="grid gap-2 py-2">
                    <Label htmlFor="Name">Name</Label>
                    <Input
                        {...register("name")}
                        id="Name"
                        className={cn({
                            "focus-visible:ring-red-500": errors.name,
                        })}
                        defaultValue={user?.user.name}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div className="grid gap-2 py-2">
                    <Label htmlFor="Email">Email</Label>
                    <Input
                        {...register("email")}
                        id="Email"
                        type="email"
                        className={cn({
                            "focus-visible:ring-red-500": errors.email,
                        })}
                        defaultValue={user?.user.email}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* 
                <div className="w-full flex items-center">
                    <div className="max-w-xl space-y-1">
                        <div id="switch" className="font-medium">
                            Support access
                        </div>
                        <p className="text-sm">
                            Grant Hanoled support temporary access to your account so we can
                            troubleshoot problems or recover content on your behalf. You can
                            revoke access at any time.
                        </p>
                    </div>
                    <div className="ml-auto">
                        <Switch
                            id="switch"
                            checked={supportAccess}
                            onCheckedChange={setSupportAccess}
                            className="h-5 w-8 [&_span]:size-4 data-[state=checked]:[&_span]:translate-x-3 data-[state=checked]:[&_span]:rtl:-translate-x-3"
                        />
                    </div>
                </div> */}

                {error && (
                    <p className="px-1 inline-flex justify-center text-sm text-red-500">
                        {error.message}
                    </p>
                )}

                <Button
                    type="submit"
                    className="w-fit ml-auto cursor-pointer"
                    size="sm"
                    disabled={isPending}
                >
                    {isPending ? (
                        <IconLoader2 className="size-4 animate-spin" />
                    ) : (
                        "Update"
                    )}
                </Button>
            </form>


            <DeleteAccount email={user?.user.email} />
        </div>
    );
};

export default UserProfile;
