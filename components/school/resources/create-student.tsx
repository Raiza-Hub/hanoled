"use client";

import { CountrySelect, FlagComponent, PhoneInput } from "@/components/comp-46";
import { CustomToast } from "@/components/custom-toast";
import { SelectOption } from "@/components/select-option";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { studentSchema, TstudentSchema } from "@/lib/validators/resource";
import { ClassItem, StudentResponse } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import * as RPNInput from "react-phone-number-input";
import z from "zod";

// Example classLevels (replace with data from your backend)
const classLevels = [
    { id: "1", name: "SS1" },
    { id: "2", name: "SS2" },
    { id: "3", name: "SS3" },
];

type CreateStudentFormProps = {
    slug: string
    onSuccess: () => void;
};

const CreateStudentForm = ({ slug, onSuccess }: CreateStudentFormProps) => {
    const id = useId();
    const queryClient = useQueryClient();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<TstudentSchema>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            middleName: "",
            gender: undefined,
            dateOfBirth: undefined,
            guardianFullName: "",
            guardianPhone: "",
            guardianEmail: "",
            address: "",
            className: "",
            admissionDate: undefined,
        },
    });

    const selectedClass = form.watch("className")

    const { mutate, isPending } = useMutation({
        mutationFn: async (userData: TstudentSchema) => {
            const res = await fetch(`/api/member/${slug}/create-student`, {
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
        onMutate: async (newStudent) => {
            await queryClient.cancelQueries({ queryKey: ["get-students", slug] });
            const previousStudents = queryClient.getQueryData(["get-students", slug]);

            // Create a temporary optimistic student object
            const optimisticStudent = {
                id: `temp-${Date.now()}`,
                firstName: newStudent.firstName,
                lastName: newStudent.lastName,
                middleName: newStudent.middleName || "",
                gender: newStudent.gender,
                dateOfBirth: newStudent.dateOfBirth?.toISOString() || "",
                admissionDate: newStudent.admissionDate?.toISOString() || "",
                classLevel: newStudent.className,
                address: newStudent.address || "",
                guardianFullName: newStudent.guardianFullName || "",
                guardianEmail: newStudent.guardianEmail || "",
                guardianPhone: newStudent.guardianPhone || "",
                image: null,
                organizationId: "",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                parent: [],
            };

            queryClient.setQueryData(["get-students", slug], (old: StudentResponse | undefined) => ({
                ...old,
                message: [...(old?.message || []), optimisticStudent]
            }));

            // Close dialog immediately after optimistic update
            if (onSuccess) onSuccess();

            return { previousStudents };
        },
        onError: (err, newStudent, context) => {
            queryClient.setQueryData(["get-students", slug], context?.previousStudents);
            CustomToast({
                message: err.message || "Something went wrong",
                variant: "error"
            });
        },
        onSuccess: () => {
            CustomToast({ message: "Student created successfully." });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["get-students", slug] });
        },
    });


    async function onSubmit(data: TstudentSchema) {
        console.log(data);
        mutate(data)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* First Name */}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Last Name */}
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Middle Name */}
                    <FormField
                        control={form.control}
                        name="middleName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Middle Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter middle name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange, onBlur, name, ref } }) => (
                            <FormItem>
                                <FormLabel>Profile Picture</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        name={name}
                                        ref={ref}
                                        onBlur={onBlur}
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            onChange(file); // ✅ store the actual File object in form state
                                        }}
                                        className=" pe-3 file:me-3 file:border-e file:border-e-background"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Gender */}
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Date of Birth */}
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                        onChange={(e) => field.onChange(new Date(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Guardian Full Name */}
                    <FormField
                        control={form.control}
                        name="guardianFullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Guardian Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter guardian's full name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Guardian Phone */}
                    <FormField
                        control={form.control}
                        name="guardianPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={id}>Phone Number</FormLabel>
                                <FormControl>
                                    <RPNInput.default
                                        className="flex rounded-md shadow-xs"
                                        international
                                        flagComponent={FlagComponent}
                                        countrySelectComponent={CountrySelect}
                                        inputComponent={PhoneInput}
                                        id={id}
                                        placeholder="Enter phone number"
                                        value={field.value} // use the value from the field
                                        onChange={(newValue) => field.onChange(newValue ?? "")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Guardian Email */}
                    <FormField
                        control={form.control}
                        name="guardianEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Guardian Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="guardian@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Class Level */}
                    <FormField
                        control={form.control}
                        name="className"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <SelectOption<TstudentSchema, ClassItem>
                                        label="Class"
                                        displayKey="class"
                                        placeholder="Select Class"
                                        fetchUrl={`/api/admin/${slug}/get-classes`}
                                        fieldName="className"
                                        selectedValue={selectedClass}
                                        setValue={form.setValue}
                                        error={form.formState.errors?.className}
                                        queryKey="get-all-classes"
                                        searchWord="Search classes..."
                                        emptyField="No class found."
                                        slug={slug}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Admission Date */}
                    <FormField
                        control={form.control}
                        name="admissionDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Admission Date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                        onChange={(e) => field.onChange(new Date(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        className="w-full py-4 font-extrabold text-white transition-all duration-500"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                                Submitting...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateStudentForm;