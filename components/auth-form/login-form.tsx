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
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignIn>({
        resolver: zodResolver(SignIn),
    });

    const handleSignInWithGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };

    const handleSignInWithMicrosoft = async () => {
        await authClient.signIn.social({
            provider: "microsoft",
            callbackURL: "/dashboard",
        });
    };

    const onSubmit = async ({ email, password }: TSignIn) => {
        setIsLoading(true);

        try {
            const { data: success, error } = await authClient.signIn.email({
                email,
                password,
            });

            // Handle success
            if (success) {
                router.push("/dashboard");
            } else {
                toast.error(error.message || "Login failed");
                console.log("Login error:", error);
            }

        } catch (err) {
            // The auth client will throw structured errors
            toast.error('Something went wrong.');
            console.error('Sign-in error:', err);
        } finally {
            setIsLoading(false);
        }
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
                            disabled={isLoading}
                            onClick={handleSignInWithGoogle}
                        >
                            <Icons.google className="h-5 w-5" />
                            Continue with Google
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                            disabled={isLoading}
                            onClick={handleSignInWithMicrosoft}

                        >
                            <Icons.microsoft className="h-5 w-5" />
                            Continue with Microsoft
                        </Button>
                    </div>

                    <Button className="cursor-pointer" disabled={isLoading}>
                        {isLoading ? (
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
