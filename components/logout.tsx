"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export function Logout() {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/sign-in");
                },
            },
        });
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start h-5 font-normal -ml-2"
            onClick={handleLogout}
        >
            <LogOut />
            Log out
        </Button>
    );
}
