"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SignUp, TSignUp } from "@/lib/validators/auth";
import { SignUpError, SignUpSuccess } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon, EyeIcon, EyeOffIcon, Loader2, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Icons } from "../icons";

const SignUpForm = () => {
    const router = useRouter();
    const id = useId();

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);



    // Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<TSignUp>({
        resolver: zodResolver(SignUp),
    });

    // Password visibility toggle
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


    const password = watch("password", "");
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


    // Sign up mutation
    const { mutate, isPending, error } = useMutation({
        mutationFn: async (userData: TSignUp): Promise<SignUpSuccess> => {
            const res = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            if (!res.ok) {
                const errorData: SignUpError = await res.json()
                throw new Error(errorData.message);
            }

            const data: SignUpSuccess = await res.json();
            return data;
        },
        onSuccess: () => {
            router.push("/verify-email");
        },
        // onError: (error: Error) => {
        //     toast.error(error.message || "Something went wrong");
        // },
    });

    const onSubmit = async (data: TSignUp) => {
        mutate(data);
    };

    const handleSignInWithGoogle = () => {
        throw new Error("Function not implemented.");
    }
    const handleSignInWithMicrosoft = () => {
        throw new Error("Function not implemented.");
    }


    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    {/* NAME FIELD */}
                    <div className="grid gap-2 py-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            {...register("name")}
                            className={cn({
                                "focus-visible:ring-red-500": errors.name,
                            })}
                            placeholder="Name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    {/* EMAIL FIELD */}
                    <div className="grid gap-2 py-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            {...register("email")}
                            className={cn({
                                "focus-visible:ring-red-500": errors.email,
                            })}
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    {/* PASSWORD FIELD + STRENGTH METER */}
                    <div className="grid gap-2 py-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                {...register("password")}
                                id={id}
                                type={isVisible ? "text" : "password"}
                                placeholder="Password"
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                className={cn({
                                    "focus-visible:ring-red-500": errors.password,
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
                                <p className="text-sm font-medium text-foreground">
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


                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                            Or continue with
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 py-4">
                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                            disabled={isPending}
                            onClick={handleSignInWithGoogle}
                        >
                            <Icons.google className="h-5 w-5" />
                            Continue with Google
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                            disabled={isPending}
                            onClick={handleSignInWithMicrosoft}

                        >
                            <Icons.microsoft className="h-5 w-5" />
                            Continue with Microsoft
                        </Button>
                    </div>

                    {/* SIGN UP BUTTON */}
                    {error && (
                        <p className="px-1 inline-flex justify-center text-sm text-red-500">
                            {error.message}
                        </p>
                    )}
                    <Button className="cursor-pointer" disabled={isPending}>
                        {isPending ? <Loader2 className="size-4 animate-spin" /> : "Sign up"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
