"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TSignUp, SignUp } from "@/lib/validators/auth";
import { Icons } from "../icons";

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignUp>({
        resolver: zodResolver(SignUp),
    });


    const handleSignInWithGoogle = async () => {
        // sign-up using gmail
    };

    const handleSignInWithMicrosoft = async () => {
        // sign-up using microsoft
    };

    const onSubmit = ({ name, email, password }: TSignUp) => {
        // sign-up using form fields
    };

    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1 py-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            {...register("name")}
                            className={cn({
                                "focus-visible:ring-red-500": errors.name,
                            })}
                            placeholder="Name"
                        />
                        {errors?.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

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
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                className={cn({
                                    "focus-visible:ring-red-500": errors.password,
                                })}
                                placeholder="Password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <Eye className="h-4 w-4 text-gray-500" />
                                )}
                            </Button>
                        </div>
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
                            onClick={handleSignInWithGoogle}
                        >
                            <Icons.microsoft className="h-5 w-5" />
                            Continue with Microsoft
                        </Button>
                    </div>

                    <Button className="cursor-pointer" disabled={isPending}>
                        {isPending ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            "Sign up"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
