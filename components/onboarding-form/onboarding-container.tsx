"use client"

import { Button } from "@/components/ui/button"
import {
    Stepper,
    StepperDescription,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/ui/stepper"
import { onboardingSchema, TonboardingSchema } from "@/lib/validators/school"
import { CreateSchoolSuccess } from "@/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import AdditionalInfoForm from "./additional-info"
import AddressInfoForm from "./address-info"
import BasicInfoForm from "./basic-info"


const steps = [
    { id: 1, title: "Basic Info", description: "Enter your basic details", Component: BasicInfoForm, fields: ["logo", "name", "email", "slug"] },
    { id: 2, title: "Address", description: "Provide your address details", Component: AddressInfoForm, fields: ["city", "state", "country", "address", "zipCode"] },
    { id: 3, title: "Additional", description: "Please provide additional details.", Component: AdditionalInfoForm, fields: ["category", "website", "schoolType", "metadata", "socialLinks"] }
]
export default function OnboardingContainer() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState<number>(1)
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const methods = useForm<TonboardingSchema>({
        resolver: zodResolver(onboardingSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            slug: "",
            logo: undefined,
            email: "",
            country: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            category: undefined,
            schoolType: undefined,
            website: "",
            socialLinks: [
                { type: "facebook", url: "" },
                { type: "instagram", url: "" },
                { type: "twitter", url: "" },
                { type: "linkedin", url: "" },
            ],
            metadata: ""
        }
    })

    const { handleSubmit, trigger } = methods
    const CurrentStepComponent = steps[currentStep - 1].Component

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (formData: TonboardingSchema): Promise<CreateSchoolSuccess> => {
            const res = await fetch("/api/create-school", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message);
            }

            const data: CreateSchoolSuccess = await res.json();
            return data;
        },
        onSuccess: () => {
            router.push("/verify-email");
        },
        // onError: (error: Error) => {
        //     toast.error(error.message || "Something went wrong");
        // },
    });

    const onSubmit = async (data: TonboardingSchema) => {
        let publicUrl: string | undefined = undefined;

        const logoFile = data.logo;

        if (logoFile && logoFile instanceof File) {
            try {
                setIsUploading(true);
                const formData = new FormData();
                formData.append("file", logoFile);

                const res = await fetch("/api/upload/school-logo", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) {
                    toast.error("Image upload failed");
                    setIsUploading(false);
                    return;
                }

                const uploadResult = await res.json();
                publicUrl = uploadResult.secure_url;

                if (!publicUrl) {
                    toast.error("Upload succeeded but no URL was returned.");
                    setIsUploading(false);
                    return;
                }

            } catch (error) {
                console.error("Upload error:", error);
                toast.error("An error occurred during the image upload.");
                setIsUploading(false);
                return;
            } finally {
                setIsUploading(false);
            }
        }

        const { logo, ...otherData } = data;

        const dataToSave = {
            ...otherData,
            logo: publicUrl,
        };

        mutate(dataToSave);
    }

    const onNext = async () => {
        const stepFields = steps[currentStep - 1].fields as (keyof TonboardingSchema)[]
        const isStepValid = await trigger(stepFields)

        if (!isStepValid) {
            console.log(methods.formState.errors);
            return
        }

        if (currentStep < steps.length) {
            setCurrentStep(prev => prev + 1)
        } else {
            await handleSubmit(onSubmit)()
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 text-center">
            <Stepper
                value={currentStep}
                onValueChange={async (next) => {
                    if (next === currentStep) return
                    const ok = await methods.trigger(
                        steps[currentStep - 1].fields as (keyof TonboardingSchema)[]
                    )
                    if (ok) setCurrentStep(next)
                }}
            >
                {steps.map(({ id, title, description }) => (
                    <StepperItem
                        key={id}
                        step={id}
                        className="relative flex-1 flex-col!"
                    >
                        <StepperTrigger className="flex-col gap-3 rounded">
                            <StepperIndicator />
                            <div className="space-y-0.5 px-2">
                                <StepperTitle>{title}</StepperTitle>
                                <StepperDescription className="max-sm:hidden">
                                    {description}
                                </StepperDescription>
                            </div>
                        </StepperTrigger>
                        {id < steps.length && (
                            <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                        )}
                    </StepperItem>
                ))}
            </Stepper>

            <FormProvider  {...methods}>
                <form
                    className="space-y-8"
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await onNext()
                    }}
                >
                    <div className="max-w-lg mx-auto mt-10 text-start">
                        <CurrentStepComponent />
                    </div>

                    {error && (
                        <p className="px-1 inline-flex justify-center text-sm text-red-500">
                            {error.message}
                        </p>
                    )}

                    <div className="flex justify-center space-x-4 mb-8">
                        <Button
                            variant="outline"
                            className="w-32 bg-transparent cursor-pointer"
                            type="button"
                            onClick={() => {
                                if (currentStep > 1) {
                                    setCurrentStep((prev) => prev - 1)
                                    console.log("Moved back to step:", currentStep - 1)
                                }
                            }}
                            disabled={currentStep === 1}
                        >
                            Prev step
                        </Button>

                        <Button className="w-32 cursor-pointer" type="submit" disabled={isPending || isUploading}>
                            {currentStep === steps.length ? "Finish" : "Next step"}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
