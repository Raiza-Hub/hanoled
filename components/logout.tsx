"use client";

import { useclearCurrentSchoolActions } from "@/app/stores/school-store";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function Logout() {
    const router = useRouter();
    const setclearCurrentSchool = useclearCurrentSchoolActions();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/auth/logout", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!res.ok) {
                const errData = await res.json();

            
            }
            const data = await res.json();
            return data;
        },

        onSuccess: () => {
            setclearCurrentSchool()
            router.replace("/sign-in")
            
        },
    });

    return (
        <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 shrink-0 cursor-pointer"
            onClick={() => logout()}
            disabled={isPending}
            title="logout"
        >
            <LogOut className="text-red-500" />
        </Button>
    );
}
