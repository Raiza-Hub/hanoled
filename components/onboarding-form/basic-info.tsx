"use client"

import { useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { TonboardingSchema } from "@/lib/validators/school";
import { CircleUserRoundIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


const BasicInfoForm = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(null);

    const {
        register,
        setValue,
        watch,
        getValues,
        formState: { errors },
    } = useFormContext<TonboardingSchema>();

    const [
        { files, isDragging },
        {
            removeFile,
            openFileDialog,
            getInputProps,
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            addFiles,
        },
    ] = useFileUpload({
        accept: "image/*",
    })

    const logoFile = watch("logo")

    const rehydratedRef = useRef(false);
    // track previously applied file id so we don't repeatedly set the same value
    const prevFileIdRef = useRef<string | null>(null);

    // -----------------------
    // 1) Rehydrate uploader from form value (run once)
    // -----------------------
    useEffect(() => {
        // if we've already rehydrated, skip
        if (rehydratedRef.current) return;

        // nothing to rehydrate
        if (!logoFile) return;

        // if uploader already has files, mark rehydrated and stop
        if (files.length > 0) {
            rehydratedRef.current = true;
            return;
        }

        // If RHF holds a real File, pass it as plain File[] to addFiles
        if (logoFile instanceof File) {
            try {
                addFiles([logoFile]); // <-- correct shape: File[]
            } catch (err) {
                console.error("addFiles rehydrate error:", err);
            }
            rehydratedRef.current = true;
            return;
        }

        // If RHF stores a URL (editing existing entity), show preview (no addFiles)
        if (typeof logoFile === "string") {
            setPreviewUrl(logoFile);
            rehydratedRef.current = true;
            return;
        }

        // otherwise nothing to do
    }, [logoFile, files.length, addFiles]);

    // -----------------------
    // 2) Sync uploader -> form (only when file actually changed)
    // -----------------------
    useEffect(() => {
        const currentId = files[0]?.id ?? null;

        // if nothing changed, skip
        if (prevFileIdRef.current === currentId) {
            return;
        }

        prevFileIdRef.current = currentId;

        if (files.length > 0) {
            const fw = files[0];
            const currentFile = fw.file;

            // If uploader has a real File, set it into the form if different
            if (currentFile instanceof File) {
                const existing = getValues("logo");
                const isSame =
                    existing instanceof File &&
                    existing.name === currentFile.name &&
                    existing.size === currentFile.size &&
                    // lastModified might not always be present, but check if available
                    (existing as File).lastModified === (currentFile as File).lastModified;

                if (!isSame) {
                    setValue("logo", currentFile, { shouldValidate: true });
                }
            } else {
                // file is metadata (e.g. server-provided), do not set a File value
                // but ensure preview is shown
            }

            setPreviewUrl(fw.preview ?? null);
        } else {
            // no files in uploader -> clear form value only if it currently has one
            const existing = getValues("logo");
            if (existing) {
                setValue("logo", undefined, { shouldValidate: true });
            }
            setPreviewUrl(null);
        }
    }, [files, setValue, getValues]);

    // cleanup any blob preview we created locally (defensive)
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // remove handler that clears both uploader and the form
    const handleRemove = () => {
        if (files[0]) {
            removeFile(files[0].id);
        }
        // reset flags so user can rehydrate again if needed
        rehydratedRef.current = false;
        prevFileIdRef.current = null;

        setValue("logo", undefined, { shouldValidate: true });
        setPreviewUrl(null);
    };

    const hasImage = !!previewUrl;


    return (
        <div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative inline-flex">
                    {/* Drop area */}
                    <button
                        type="button"
                        className="relative flex size-24 items-center justify-center overflow-hidden rounded-full border border-dashed border-input transition-colors outline-none hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[dragging=true]:bg-accent/50"
                        onClick={openFileDialog}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        data-dragging={isDragging || undefined}
                        aria-label={hasImage ? "Change image" : "Upload image"}
                    >
                        {previewUrl ? (
                            <Image
                                className="size-full object-cover"
                                src={previewUrl}
                                alt="Uploaded image"
                                width={64}
                                height={64}
                            />
                        ) : (
                            <div aria-hidden="true">
                                <CircleUserRoundIcon className="size-4 opacity-60" />
                            </div>
                        )}
                    </button>

                    {previewUrl && (
                        <Button
                            type="button"
                            onClick={handleRemove}
                            size="icon"
                            className="absolute -top-1 -right-1 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
                            aria-label="Remove image"
                        >
                            <XIcon className="size-3.5" />
                        </Button>
                    )}

                    <input {...getInputProps()} className="sr-only" aria-label="Upload image file" tabIndex={-1} />
                </div>

                {errors.logo && (
                    <p className="text-xs text-red-500 mt-1">{errors.logo.message}</p>
                )}
            </div>
            <div>
                <div className="grid gap-6">
                    <div className="grid gap-2 py-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            {...register("name")}
                            className={cn({
                                "focus-visible:ring-red-500": errors.name,
                            })}
                            placeholder="school name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2 py-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            {...register("email")}
                            className={cn({
                                "focus-visible:ring-red-500": errors.email,
                            })}
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2 py-2">
                        <Label htmlFor="slug">School Slug</Label>
                        <Input
                            {...register("slug")}
                            className={cn({
                                "focus-visible:ring-red-500": errors.slug,
                            })}
                            placeholder="slug-name"
                        />
                        {errors.slug && (
                            <p className="text-sm text-red-500">{errors.slug.message}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicInfoForm;