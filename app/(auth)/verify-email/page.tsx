"use client"

import { Button } from "@/components/ui/button"
import { CircleAlertIcon, CircleCheckIcon, Loader2, Mail, XIcon } from "lucide-react"

import { OTPInput } from "input-otp"

import { Slot } from "@/components/slot"
import { otpSchema } from "@/lib/validators/auth"
import { GetNewOtpError, GetNewOtpSuccess, OtpResponse } from "@/type"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import z from "zod"

const VerifyEmailPage = () => {
    const router = useRouter();
    const [otp, setOtp] = useState<string>("")
    const [zoderr, setZoderr] = useState<string>("")

    const { mutate, isPending, error, reset } = useMutation({
        mutationFn: async (otp: string): Promise<OtpResponse> => {
            const res = await fetch("/api/verify-email", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ otp }),
            });

            const data: OtpResponse = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }



            return data;
        },
        onSuccess: () => {
            router.push("/dashboard");
        },
    });

    const handleVerify = (otp: string) => {
        try {
            otpSchema.parse(otp)
            mutate(otp)
        } catch (err) {
            if (err instanceof z.ZodError) {
                setZoderr(err.issues[0].message)
            }
        }
    }

    const { mutate: resend, isPending: isResending } = useMutation({
        mutationFn: async (): Promise<GetNewOtpSuccess> => {
            const res = await fetch("/api/resend-otp", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!res.ok) {
                const errData: GetNewOtpError = await res.json();

                toast.custom((t) => (
                    <div className="z-50 max-w-[400px] rounded-md border bg-background p-4 shadow-lg">
                        <div className="flex gap-2">
                            <div className="flex grow gap-3">
                                <CircleAlertIcon
                                    className="mt-0.5 shrink-0 text-red-500"
                                    size={20}
                                    aria-hidden="true"
                                />
                                <div className="flex grow flex-col gap-3">
                                    <p className="text-sm font-medium">
                                        {errData.message}
                                    </p>

                                </div>
                                <Button
                                    variant="ghost"
                                    className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent cursor-pointer"
                                    aria-label="Close notification"
                                    onClick={() => toast.dismiss(t)}
                                >
                                    <XIcon
                                        size={20}
                                        className="opacity-60 transition-opacity group-hover:opacity-100"
                                        aria-hidden="true"
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                ));
            }
            const data: GetNewOtpSuccess = await res.json();
            return data;
        },

        onSuccess: (data) => {
            toast.custom((t) => (
                <div className="z-50 max-w-[400px] rounded-md border bg-background p-4 shadow-lg">
                    <div className="flex gap-2">
                        <div className="flex grow gap-3">
                            <CircleCheckIcon
                                className="mt-0.5 shrink-0 text-red-500"
                                size={20}
                                aria-hidden="true"
                            />
                            <div className="flex grow flex-col gap-3">
                                <p className="text-sm font-medium">
                                    {data.message}
                                </p>

                            </div>
                            <Button
                                variant="ghost"
                                className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent cursor-pointer"
                                aria-label="Close notification"
                                onClick={() => toast.dismiss(t)}
                            >
                                <XIcon
                                    size={16}
                                    className="opacity-60 transition-opacity group-hover:opacity-100"
                                    aria-hidden="true"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            ));
        },
    });

    return (
        <div className=" flex items-center justify-center p-4 pt-20">
            <div className="w-full max-w-sm bg-white">
                <div className="text-center space-y-6">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <Mail className="w-8 h-8" />
                        <h1 className="text-xl font-bold text-gray-900">Check your inbox</h1>
                    </div>
                    <div className="max-w-prose text-sm space-y-1">
                        <p className="text-zinc-500">
                            We&apos;ve sent a 7-digit verification code to your email
                        </p>
                        <p className="text-zinc-500">
                            Please enter it below to continue.
                        </p>
                    </div>
                    <div className="flex justify-center gap-3 md:gap-4">
                        <OTPInput
                            containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                            value={otp}
                            onChange={(value) => {
                                setOtp(value);
                                if (zoderr) setZoderr("");
                                if (error) reset();
                            }}
                            maxLength={7}
                            render={({ slots }) => (
                                <div className="flex gap-2">
                                    {slots.map((slot, idx) => (
                                        <Slot key={idx} {...slot} />
                                    ))}
                                </div>
                            )}
                        />
                    </div>

                    {error ? (
                        <p className="px-1 inline-flex font-medium justify-center text-sm text-red-500">
                            {error.message}
                        </p>
                    ) : zoderr ? (
                        <p className="px-1 inline-flex font-medium  justify-center text-sm text-red-500">
                            {zoderr}
                        </p>
                    ) : null}
                    <Button
                        disabled={isPending}
                        className="w-full cursor-pointer"
                        onClick={() => {
                            if (zoderr.length > 1) {
                                setZoderr("")
                            }
                            handleVerify(otp)
                        }}
                    >
                        {isPending ? (
                            <div className="inline-flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                verifying...
                            </div>
                        ) : "Verify email"}
                    </Button>

                    <div className="flex items-center justify-center text-sm text-zinc-600">
                        Didn't receive the code?
                        <Button
                            variant="link"
                            size="sm"
                            onClick={() => resend()}
                            disabled={isPending || isResending}
                            className="text-zinc-900 underline hover:text-zinc-700 transition-colors -ml-2 cursor-pointer"
                        >
                            {isResending ? (
                                <div className="inline-flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    Resending...
                                </div>
                            ) : (
                                "Resend code"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmailPage;