"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Stepper,
    StepperItem,
    StepperSeparator,
    StepperIndicator,
    StepperTrigger,
    StepperTitle,
    StepperDescription,
} from "@/components/ui/stepper"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { onboardingSchema, TonboardingSchema } from "@/lib/validators/school"
import { zodResolver } from "@hookform/resolvers/zod"

// Step components (with logging)
function BasicInfoStep() {
    const { register, formState: { errors } } = useFormContext<TonboardingSchema>()
    return (
        <div className="space-y-4">
            <input
                {...register("firstName")}
                placeholder="First Name"
                className="border p-2 w-full"
            />
            {errors.firstName && (
                <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                </p>
            )}
        </div>
    )
}

function AddressStep() {
    const { register, formState: { errors } } = useFormContext<TonboardingSchema>()
    return (
        <div className="space-y-4">
            <input {...register("city")} placeholder="City" className="border p-2 w-full" />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}

            <input {...register("state")} placeholder="State" className="border p-2 w-full" />
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
        </div>
    )
}

// function MetaDataStep() {
//     const { register, formState: { errors } } = useFormContext<TonboardingSchema>()
//     return (
//         <div className="space-y-4">
//             <input
//                 {...register("metadata.website")}
//                 placeholder="Website"
//                 className="border p-2 w-full"
//             />
//             {errors?.metadata?.website && (
//                 <p className="text-red-500 text-sm">{errors.metadata.website?.message}</p>
//             )}
//         </div>
//     )
// }


const steps = [
    { id: 1, title: "Basic Info", description: "Enter your basic details", Component: BasicInfoStep, fields: ["firstName"] },
    { id: 2, title: "Address", description: "Provide your address details", Component: AddressStep, fields: ["city", "state"] },
]
export default function OnboardingContainer() {
    const [currentStep, setCurrentStep] = useState(1)

    const methods = useForm<TonboardingSchema>({
        resolver: zodResolver(onboardingSchema),
        mode: "onChange",
    })

    const { handleSubmit, trigger } = methods
    const CurrentStepComponent = steps[currentStep - 1].Component

    const onSubmit = (data: TonboardingSchema) => {
        console.log("✅ Final Submitted Data (onSubmit):", data)
        alert("🎉 Form submitted successfully!")
    }

    const onNext = async () => {
        const stepFields = steps[currentStep - 1].fields as (keyof TonboardingSchema)[]
        const isStepValid = await trigger(stepFields)

        if (!isStepValid) {
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
            <Stepper value={currentStep} onValueChange={setCurrentStep}>
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

            <FormProvider {...methods}>
                <form className="space-y-6">
                    <CurrentStepComponent />

                    <div className="flex justify-center space-x-4">
                        <Button
                            variant="outline"
                            className="w-32 bg-transparent"
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

                        <Button className="w-32" type="button" onClick={onNext}>
                            {currentStep === steps.length ? "Finish" : "Next step"}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
