"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, XIcon } from "lucide-react";

interface CustomToastProps {
    message: string;
    variant?: "error" | "success" | "info";
}

export const CustomToast = ({ message, variant = "success" }: CustomToastProps) => {
    toast.custom((t) => {
        let Icon = CircleCheckIcon;
        let colorClass = "text-green-500";

        switch (variant) {
            case "error":
                Icon = CircleAlertIcon;
                colorClass = "text-red-500";
                break;
            case "success":
                Icon = CircleCheckIcon;
                colorClass = "text-green-500";
                break;
            case "info":
                Icon = InfoIcon;
                colorClass = "text-blue-500";
                break;
        }

        return (
            <div className="z-50 max-w-[400px] rounded-md border bg-background p-4 shadow-lg">
                <div className="flex gap-2">
                    <div className="flex grow gap-3">
                        <Icon
                            className={`mt-0.5 shrink-0 ${colorClass}`}
                            size={20}
                            aria-hidden="true"
                        />
                        <div className="flex grow flex-col gap-3">
                            <p className="text-sm font-medium">{message}</p>
                        </div>
                        <Button
                            variant="ghost"
                            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent cursor-pointer"
                            aria-label="Close notification"
                            onClick={() => toast.dismiss(t)}
                        >
                            <XIcon
                                size={20}
                                className="opacity-60 transition-opacity group-hover:opacity-100"
                                aria-hidden="true"
                            />
                        </Button>
                    </div>
                </div>
            </div>
        );
    });
};
