"use client"

import CountryList from "@/country-list.json"
import { cn } from "@/lib/utils"
import { TonboardingSchema } from "@/lib/validators/school"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "../ui/input"

const AddressInfoForm = () => {
    const [openCountry, setOpenCountry] = useState(false)
    const [openState, setOpenState] = useState(false)

    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<TonboardingSchema>()

    // Watch values to reactively show states
    const selectedCountry = watch("country")
    const selectedState = watch("state")

    const countries = CountryList.data
    const states =
        countries.find((c) => c.name === selectedCountry)?.states || []

    return (
        <div>
            <div className="grid gap-6">
                {/* COUNTRY SELECT */}
                <div className="grid gap-2 py-2">
                    <Label htmlFor="country">Select Country</Label>
                    <Popover open={openCountry} onOpenChange={setOpenCountry}>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCountry}
                                className={cn(
                                    "w-full justify-between border-input bg-background px-3 font-normal outline-offset-0 outline-none hover:bg-background focus-visible:outline-[3px] cursor-pointer",
                                    errors.country && "border-red-500"
                                )}
                            >
                                {selectedCountry || "Select country"}
                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0">
                            <Command>
                                <CommandInput placeholder="Search country..." />
                                <CommandList>
                                    <CommandEmpty>No country found.</CommandEmpty>
                                    <CommandGroup>
                                        {countries.map((country) => (
                                            <CommandItem
                                                key={country.iso3}
                                                value={country.name}
                                                onSelect={(value) => {
                                                    // Update form value
                                                    setValue("country", value, { shouldValidate: true })
                                                    // Reset state when new country selected
                                                    setValue("state", "", { shouldValidate: true })
                                                    setOpenCountry(false)
                                                }}
                                            >
                                                {country.name}
                                                {selectedCountry === country.name && (
                                                    <CheckIcon className="ml-auto h-4 w-4" />
                                                )}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {errors.country && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.country.message}
                        </p>
                    )}
                </div>

                {/* STATE SELECT */}
                <div className="grid gap-2 py-2">
                    <Label htmlFor="state">Select State</Label>
                    <Popover open={openState} onOpenChange={setOpenState}>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                role="combobox"
                                aria-expanded={openState}
                                disabled={!selectedCountry}
                                className={cn(
                                    "w-full justify-between border-input bg-background px-3 font-normal outline-offset-0 outline-none hover:bg-background focus-visible:outline-[3px] cursor-pointer",
                                    errors.state && "border-red-500"
                                )}
                            >
                                {selectedState || "Select state"}
                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0">
                            <Command>
                                <CommandInput placeholder="Search state..." />
                                <CommandList>
                                    <CommandEmpty>No state found.</CommandEmpty>
                                    <CommandGroup>
                                        {states.map((state) => (
                                            <CommandItem
                                                key={state.state_code}
                                                value={state.name}
                                                onSelect={(value) => {
                                                    setValue("state", value, { shouldValidate: true })
                                                    setOpenState(false)
                                                }}
                                            >
                                                {state.name}
                                                {selectedState === state.name && (
                                                    <CheckIcon className="ml-auto h-4 w-4" />
                                                )}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {errors.state && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.state.message}
                        </p>
                    )}
                </div>



                <div className="grid gap-2 py-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                        {...register("city")}
                        className={cn({
                            "focus-visible:ring-red-500": errors.city,
                        })}
                        placeholder="City"
                    />
                    {errors.city && (
                        <p className="text-sm text-red-500">{errors.city.message}</p>
                    )}
                </div>
                <div className="grid gap-2 py-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        {...register("address")}
                        className={cn({
                            "focus-visible:ring-red-500": errors.address,
                        })}
                        placeholder="Address"
                    />
                    {errors.address && (
                        <p className="text-sm text-red-500">{errors.address.message}</p>
                    )}
                </div>
                <div className="grid gap-2 py-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                        {...register("zipCode")}
                        className={cn({
                            "focus-visible:ring-red-500": errors.zipCode,
                        })}
                        placeholder="Enter zip code"
                    />
                    {errors.zipCode && (
                        <p className="text-sm text-red-500">{errors.zipCode.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddressInfoForm
