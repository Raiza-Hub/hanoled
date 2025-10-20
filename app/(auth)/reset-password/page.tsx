"use client"

import { Button } from "@/components/ui/button"
import { CheckIcon, EyeIcon, EyeOffIcon, Loader2, RectangleEllipsis, XIcon } from "lucide-react"


import { useForgetPasswordEmail } from "@/app/stores/forget-password-store"
import { Slot } from "@/components/slot"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { resetPassword, TresetPassword } from "@/lib/validators/auth"
import { ForgotPassword } from "@/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { OTPInput } from "input-otp"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"


const ResetPasswordPage = () => {
    const router = useRouter();

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const forgetPasswordEmail = useForgetPasswordEmail();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<TresetPassword>({
        resolver: zodResolver(resetPassword),
    });

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    // Password strength checker
    const checkStrength = (pass: string) => {
        const requirements = [
            { regex: /.{8,}/, text: "At least 8 characters" },
            { regex: /[0-9]/, text: "At least 1 number" },
            { regex: /[a-z]/, text: "At least 1 lowercase letter" },
            { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
        ];
        return requirements.map((req) => ({
            met: req.regex.test(pass),
            text: req.text,
        }));
    };

    const password = watch("newPassword", "");
    const strength = checkStrength(password);
    const showStrengthMeter = isPasswordFocused || password.length > 0;

    const strengthScore = useMemo(() => {
        return strength.filter((req) => req.met).length;
    }, [strength]);

    const getStrengthColor = (score: number) => {
        if (score === 0) return "bg-border";
        if (score <= 1) return "bg-red-500";
        if (score <= 2) return "bg-orange-500";
        if (score === 3) return "bg-amber-500";
        return "bg-emerald-500";
    };

    const getStrengthText = (score: number) => {
        if (score === 0) return "Enter a password";
        if (score <= 2) return "Weak password";
        if (score === 3) return "Medium password";
        return "Strong password";
    };


    useEffect(() => {
        if (forgetPasswordEmail) {
            setValue("email", forgetPasswordEmail);
        }
    }, [forgetPasswordEmail, setValue]);

    const { mutate, isPending, error, reset } = useMutation({
        mutationFn: async (userData: TresetPassword): Promise<ForgotPassword> => {
            const res = await fetch("/api/reset-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            const data: ForgotPassword = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            return data;
        },
        onSuccess: () => {
            router.replace("/sign-in");
        },
    });

    const onSubmit = async (data: TresetPassword) => {
        mutate(data);
    };


    return (
        <div className=" flex items-center justify-center p-4 pt-20">
            <div className="w-full max-w-sm bg-white">
                <div className="text-center space-y-6">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <RectangleEllipsis className="w-8 h-8" />
                        <h1 className="text-xl font-bold text-gray-900">Set new password</h1>
                    </div>
                    <div className="max-w-prose text-sm space-y-1">
                        <p className="text-zinc-500">
                            No worries, we&apos;ll send you reset instructions.
                        </p>
                        {/* <p className="text-zinc-500">
                            Please enter it below to continue.
                        </p> */}
                    </div>
                    <div className="grid gap-6">
                        <form className="w-full space-y-1.5">
                            <div className="grid gap-2 py-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email")}
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.email,
                                    })}
                                    defaultValue={forgetPasswordEmail}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="text-sm text-start text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="grid gap-2 py-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        {...register("newPassword")}
                                        id="password"
                                        type={isVisible ? "text" : "password"}
                                        placeholder="Password"
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.newPassword,
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleVisibility}
                                        className="absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground hover:text-foreground focus:outline-none"
                                    >
                                        {isVisible ? (
                                            <EyeOffIcon size={16} aria-hidden="true" />
                                        ) : (
                                            <EyeIcon size={16} aria-hidden="true" />
                                        )}
                                    </button>
                                </div>

                                {/* Strength Bar */}
                                {showStrengthMeter && (
                                    <>
                                        {/* Strength Bar */}
                                        <div
                                            className="mt-2 mb-1 h-1 w-full overflow-hidden rounded-full bg-border"
                                            role="progressbar"
                                            aria-valuenow={strengthScore}
                                            aria-valuemin={0}
                                            aria-valuemax={4}
                                        >
                                            <div
                                                className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                                                style={{ width: `${(strengthScore / 4) * 100}%` }}
                                            />
                                        </div>

                                        {/* Strength text + rules */}
                                        <p className="text-sm text-start font-medium text-foreground">
                                            {getStrengthText(strengthScore)}. Must contain:
                                        </p>
                                        <ul className="space-y-1.5" aria-label="Password requirements">
                                            {strength.map((req, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    {req.met ? (
                                                        <CheckIcon size={14} className="text-emerald-500" />
                                                    ) : (
                                                        <XIcon size={14} className="text-muted-foreground/80" />
                                                    )}
                                                    <span
                                                        className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
                                                    >
                                                        {req.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}


                                {errors.newPassword && (
                                    <p className="text-sm text-start text-red-500">{errors.newPassword.message}</p>
                                )}
                            </div>

                            <div className="grid gap-2 py-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    {...register("confirmPassword")}
                                    type="password"
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.confirmPassword,
                                    })}
                                    placeholder="Password"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-start text-red-500">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2 py-2">
                                <Label htmlFor="verification_code">Verification Code</Label>
                                <OTPInput
                                    {...register("otp")}
                                    id="verification_code"
                                    containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                                    onChange={() => {
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
                                {errors.otp && (
                                    <p className="text-sm text-start text-red-500">{errors.otp.message}</p>
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

export default ResetPasswordPage;