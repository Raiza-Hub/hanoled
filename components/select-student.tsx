"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { StudentResponse } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import {
    type FieldError,
    FieldValues,
    Merge,
    Path,
    PathValue,
    UseFormSetValue,
} from "react-hook-form";

type SelectStudentProps<T extends FieldValues> = {
    label: string;
    placeholder?: string;
    queryKey: string;
    fetchUrl: string;
    fieldName: Path<T>;
    searchWord: string;
    emptyField: string;
    selectedValue: string[];
    setValue: UseFormSetValue<T>;
    error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
    slug: string;
};

export function SelectStudent<T extends FieldValues>({
    label,
    placeholder = "Select students",
    queryKey,
    fetchUrl,
    fieldName,
    searchWord,
    emptyField,
    selectedValue,
    setValue,
    error,
    slug,
}: SelectStudentProps<T>) {
    const [open, setOpen] = useState(false);

    const { data, isLoading, error: fetchError } = useQuery<StudentResponse>({
        queryKey: [queryKey, slug],
        queryFn: async () => {
            const res = await fetch(fetchUrl, {
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

    const handleToggle = (id: string) => {
        const newSelection = selectedValue.includes(id)
            ? selectedValue.filter((v) => v !== id)
            : [...selectedValue, id];

        setValue(fieldName, newSelection as PathValue<T, typeof fieldName>, {
            shouldValidate: true,
        });
    };

    const selectedCount = selectedValue.length;

    return (
        <div className="grid gap-2 py-2">
            <Label htmlFor={String(fieldName)}>{label}</Label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger id={String(fieldName)} asChild>
                    <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between border-input bg-background px-3 font-normal outline-offset-0 outline-none hover:bg-background focus-visible:outline-[3px] cursor-pointer",
                            error && "border-red-500"
                        )}
                    >
                        {selectedCount === 0
                            ? placeholder
                            : `${selectedCount} student${selectedCount > 1 ? "s" : ""} selected`}
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0">
                    <Command>
                        <CommandInput placeholder={searchWord} />
                        <CommandList>
                            {isLoading && (
                                <div className="flex items-center justify-center py-4 text-sm text-muted-foreground">
                                    <span>Loading...</span>
                                </div>
                            )}

                            {fetchError && !isLoading && (
                                <div className="flex items-center justify-center py-4 text-sm text-red-500">
                                    <span>{(fetchError as Error).message}</span>
                                </div>
                            )}

                            {!isLoading && !fetchError && (
                                <>
                                    {data?.message.length ? (
                                        <CommandGroup>
                                            {data.message.map((s) => {
                                                const isSelected = selectedValue.includes(s.id);
                                                return (
                                                    <CommandItem
                                                        key={s.id}
                                                        value={s.id}
                                                        onSelect={() => handleToggle(s.id)}
                                                        className={cn(
                                                            "flex items-center gap-2 px-2 py-1.5 cursor-pointer !bg-transparent hover:!bg-accent/40 focus:!bg-accent/40"
                                                        )}
                                                    >
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage
                                                                src={s.image || ""}
                                                                alt={`${s.firstName} ${s.lastName}`}
                                                            />
                                                            <AvatarFallback>
                                                                {s.firstName.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="truncate">{`${s.firstName} ${s.lastName} ${s.middleName}`}</span>
                                                        {isSelected && (
                                                            <CheckIcon className="ml-auto h-4 w-4 text-primary" />
                                                        )}
                                                    </CommandItem>
                                                );
                                            })}
                                        </CommandGroup>
                                    ) : (
                                        <CommandEmpty>{emptyField}</CommandEmpty>
                                    )}
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {error && (
                <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
        </div>
    );
}
