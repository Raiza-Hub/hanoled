"use client"

import { Button } from "@/components/ui/button"
import { KeyRound, Loader2 } from "lucide-react"


import { useForgetPasswordEmailActions } from "@/app/stores/forget-password-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { forgetPassword, TForgetPassword } from "@/lib/validators/auth"
import { ForgotPassword } from "@/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"


const ForgetPasswordPage = () => {
    const router = useRouter();
    const setForgetPasswordEmail = useForgetPasswordEmailActions();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TForgetPassword>({
        resolver: zodResolver(forgetPassword),
    });

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (userData: TForgetPassword): Promise<ForgotPassword> => {
            const res = await fetch("/api/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            const data: ForgotPassword = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setForgetPasswordEmail(userData.email)
            return data;
        },
        onSuccess: () => {
            router.push("/reset-password");
        },
    });

    const onSubmit = async (data: TForgetPassword) => {
        mutate(data);
    };


    return (
        <div className=" flex items-center justify-center p-4 pt-20">
            <div className="w-full max-w-sm bg-white">
                <div className="text-center space-y-6">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <KeyRound className="w-8 h-8" />
                        <h1 className="text-xl font-bold text-gray-900">Forget password?</h1>
                    </div>
                    <div className="max-w-prose text-sm space-y-1">
                        <p className="text-zinc-500">
                            No worries, we&apos;ll send you reset instructions.
                        </p>
                        {/* <p className="text-zinc-500">
                            Please enter it below to continue.
                        </p> */}
                    </div>
                    <div className="flex justify-center gap-3 md:gap-4">
                        <form className="w-full">
                            <div className="grid gap-2 py-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email")}
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.email,
                                    })}
                                    placeholder="you@example.com"
                                />
                                {errors?.email && (
                                    <p className="text-sm text-start text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                        </form>
                    </div>

                    {error && (
                        <p className="px-1 inline-flex font-medium justify-center text-sm text-red-500">
                            {error.message}
                        </p>
                    )}
                    <Button
                        disabled={isPending}
                        className="w-full cursor-pointer"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {isPending ? (
                            <div className="inline-flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                sending...
                            </div>
                        ) : "Reset Password"}
                    </Button>

                    {/* <div className="flex items-center justify-center text-sm text-zinc-600">
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
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordPage;