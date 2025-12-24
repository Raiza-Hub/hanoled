"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandEmpty,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
    type FieldError,
    UseFormSetValue,
    FieldValues,
    Path,
    PathValue,
} from "react-hook-form";
import { ApiResponse } from "@/type";

type SelectOptionProps<
    T extends FieldValues,
    ItemType
> = {
    label: string;
    placeholder?: string;
    queryKey: string;
    fetchUrl: string;
    fieldName: Path<T>;
    searchWord: string;
    emptyField: string;
    selectedValue: string;
    setValue: UseFormSetValue<T>;
    error?: FieldError;
    slug: string;
    displayKey?: ItemType extends object ? keyof ItemType : never;
};

export function SelectOption<
    T extends FieldValues,
    ItemType extends string | object
>({
    label,
    placeholder,
    queryKey,
    fetchUrl,
    fieldName,
    searchWord,
    emptyField,
    selectedValue,
    setValue,
    error,
    slug,
    displayKey,
}: SelectOptionProps<T, ItemType>) {
    const [open, setOpen] = useState(false);

    const { data, isLoading, error: fetchError } = useQuery<ApiResponse<ItemType>>({
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

    console.log(data);



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
                        {selectedValue || placeholder}
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
                                    {data?.message?.length ? (
                                        <CommandGroup>
                                            {data.message.map((item) => {
                                                const displayValue =
                                                    typeof item === "object" && displayKey
                                                        ? String(item[displayKey])
                                                        : String(item);

                                                const key =
                                                    typeof item === "object" && "id" in item
                                                        ? String((item as { id: string }).id)
                                                        : displayValue;

                                                return (
                                                    <CommandItem
                                                        key={key}
                                                        value={displayValue}
                                                        onSelect={(value) => {
                                                            setValue(
                                                                fieldName,
                                                                value as PathValue<T, typeof fieldName>,
                                                                { shouldValidate: true }
                                                            );
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <span className="truncate">{displayValue}</span>
                                                        {selectedValue === displayValue && (
                                                            <CheckIcon className="ml-auto h-4 w-4" />
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

            {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
        </div>
    );
}
