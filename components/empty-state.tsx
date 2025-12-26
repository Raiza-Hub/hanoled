import { ReactNode } from "react";
import { IconBuildings } from "@tabler/icons-react"; // Adjust the import as needed

interface NoContentProps {
    icon: ReactNode;
    title: string;
    description: string;
    actionText?: string;
    actionLink?: string;
}

export function EmptyState({
    icon,
    title,
    description,
    actionText,
    actionLink,
}: NoContentProps) {
    return (
        <div className="flex min-w-0 h-screen flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12">
            <div className="flex max-w-sm flex-col items-center gap-2 text-center">
                <div className="flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0">
                    {icon}
                </div>
                <div className="text-lg font-medium tracking-tight">{title}</div>
                <div className="text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4">
                    <span>{description}</span>
                    <a href={actionLink} className="text-primary">
                        {actionText}
                    </a>
                </div>
            </div>
        </div>
    );
}
