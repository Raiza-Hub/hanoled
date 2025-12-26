"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SignIn, TSignIn } from "@/lib/validators/auth";
import { SignInResponse } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Icons } from "../icons";


const LoginForm = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignIn>({
        resolver: zodResolver(SignIn),
    });

    const handleSignInWithGoogle = async () => {

    };

    const handleSignInWithMicrosoft = async () => {

    };

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (userData: TSignIn): Promise<SignInResponse> => {
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            const data: SignInResponse = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            return data;
        },
        onSuccess: () => {
            router.push("/dashboard");
        },
        // onError: (error: any) => {
        //     toast.error(error.message || "Something went wrong");
        // },
    });

    const onSubmit = async (data: TSignIn) => {

        mutate(data);
    };

    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1 py-2">
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

                    <div className="grid gap-1 py-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="/forget-password" className="text-sm text-secondary-foreground/80">
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            {...register("password")}
                            type="password"
                            className={cn({
                                "focus-visible:ring-red-500": errors.password,
                            })}
                            placeholder="Password"
                        />
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

                    {error && (
                        <p className="px-1 inline-flex justify-center text-sm text-red-500">
                            {error.message}
                        </p>
                    )}
                    
                    <Button className="cursor-pointer" disabled={isPending}>
                        {isPending ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
