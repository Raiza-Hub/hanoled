"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
    title: string;
    message?: string | ReactNode;
    className?: string;
}

export const ErrorState = ({ title, message, className }: ErrorStateProps) => {
    return (
        <div
            role="alert"
            className={cn(
                "flex flex-col items-center justify-center py-10 px-6 border rounded-md bg-accent",
                className
            )}
        >
            <span className="sr-only">An error occurred…</span>
            <h2 className="font-medium text-foreground mb-2">{title}</h2>
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
    );
};
