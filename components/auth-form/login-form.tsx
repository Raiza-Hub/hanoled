"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Icons } from "../icons";
import { TSignIn, SignIn } from "@/lib/validators/auth";
import { useState } from "react";

const LoginForm = () => {
    const [isPending, setIsPending] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignIn>({
        resolver: zodResolver(SignIn),
    });

    const handleSignInWithGoogle = async () => {
        // sign-up using gmail
    };

    const handleSignInWithMicrosoft = async () => {
        // sign-up using microsoft
    };

    const onSubmit = ({ email, password }: TSignIn) => {
        // sign-up using form fields
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
                        {errors?.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid gap-1 py-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="text-sm text-secondary-foreground/80">
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
                        {errors?.password && (
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
