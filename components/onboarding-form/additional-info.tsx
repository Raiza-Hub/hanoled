"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { SOCIALS, TonboardingSchema } from "@/lib/validators/school"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

import PhoneNumberInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { CountrySelect, FlagComponent, PhoneInput } from "../comp-46"


export const CATEGORY = [
    { label: "Primary School", value: "primary" },
    { label: "Secondary School", value: "secondary" },
    { label: "Tertiary Institution", value: "tertiary" },
] as const

export const SCHOOLTYPE = [
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
    { label: "Federal", value: "federal" },
    { label: "State", value: "state" },
] as const




const AdditionalInfoForm = () => {
    const [openCategory, setOpenCategory] = useState(false)
    const [openSchoolType, setOpenSchoolType] = useState(false)

    const {
        register,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useFormContext<TonboardingSchema>()

    const selectedCategory = watch("category")
    const selectedSchoolType = watch("schoolType")


    return (
        <div>
            <div className="grid gap-6">
                <div className="grid gap-2 py-2">
                    <Label htmlFor="category">Category</Label>

                    <Select
                        value={selectedCategory || ""}
                        onValueChange={(val) =>
                            setValue("category", val as TonboardingSchema["category"], {
                                shouldValidate: true,
                            })
                        }
                        open={openCategory}
                        onOpenChange={setOpenCategory}
                    >
                        <SelectTrigger
                            className={cn(
                                "w-full min-w-[var(--radix-popper-anchor-width)] border rounded-md px-3 py-2 cursor-pointer",
                                errors.category
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : "border-input"
                            )}
                            aria-expanded={openCategory}
                        >
                            <SelectValue placeholder="Select category" />

                        </SelectTrigger>

                        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                            {CATEGORY.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.category && (
                        <p className="text-sm text-red-500">{errors.category.message}</p>
                    )}
                </div>

                <div className="grid gap-2 py-2">
                    <Label htmlFor="schoolType">School Type</Label>

                    <Select
                        value={selectedSchoolType || ""}
                        onValueChange={(val) =>
                            setValue("schoolType", val as TonboardingSchema["schoolType"], {
                                shouldValidate: true,
                            })
                        }
                        open={openSchoolType}
                        onOpenChange={setOpenSchoolType}
                    >
                        <SelectTrigger
                            className={cn(
                                "w-full min-w-[var(--radix-popper-anchor-width)] border rounded-md px-3 py-2 cursor-pointer",
                                errors.schoolType
                                    ? "border-red-500 focus-visible:ring-red-500 shadow-sm shadow-red-200"
                                    : "border-input"
                            )}
                            aria-expanded={openSchoolType}
                        >
                            <SelectValue placeholder="Select education level" />
                        </SelectTrigger>

                        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                            {SCHOOLTYPE.map((sch) => (
                                <SelectItem key={sch.value} value={sch.value}>
                                    {sch.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.schoolType && (
                        <p className="text-sm text-red-500">{errors.schoolType.message}</p>
                    )}
                </div>

                <div className="grid gap-2 py-2">
                    <Label htmlFor="phone number">Phone number</Label>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <PhoneNumberInput
                                international
                                flagComponent={FlagComponent}
                                countrySelectComponent={CountrySelect}
                                inputComponent={PhoneInput}
                                placeholder="Enter phone number"
                                value={field.value}
                                onChange={(val) => field.onChange(val || "")}
                                className={cn(
                                    "flex rounded-md shadow-xs",
                                    errors.phone && "border-red-500 focus-visible:ring-red-500"
                                )}
                            />
                        )}
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                </div>
                <div className="grid gap-2 py-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                        {...register("website")}
                        className={cn({
                            "focus-visible:ring-red-500": errors.website,
                        })}
                        placeholder="Enter website url"
                    />
                    {errors.website && (
                        <p className="text-sm text-red-500">{errors.website.message}</p>
                    )}
                </div>

                <div className="space-y-4">
                    {SOCIALS.map((social, i) => (
                        <div key={social} className="grid gap-2 py-2">
                            {/* ensure required type is submitted */}
                            <input type="hidden" value={social} {...register(`socialLinks.${i}.type` as const)} />
                            <Label htmlFor={`social-${social}`}>
                                {social.charAt(0).toUpperCase() + social.slice(1)}
                            </Label>
                            <Controller
                                name={`socialLinks.${i}.url`}
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id={`social-${social}`}
                                        {...field}
                                        placeholder={`Enter ${social} url`}
                                        className={cn(
                                            "w-full border rounded-md px-2 py-1",
                                            errors.socialLinks?.[i]?.url && "border-red-500 focus-visible:ring-red-500"
                                        )}
                                    />
                                )}
                            />
                            {errors.socialLinks?.[i]?.url && (
                                <p className="text-sm text-red-500">
                                    {errors.socialLinks?.[i]?.url?.message}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdditionalInfoForm;
