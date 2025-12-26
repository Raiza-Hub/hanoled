"use client";

import { IconFiles, IconFilesOff } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "../empty-state";
import { ErrorState } from "../error-state";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface SubjectListsProps {
    slug: string;
    selectedSubjects: string[];
    setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>;
}

const SubjectLists = ({ slug, selectedSubjects, setSelectedSubjects }: SubjectListsProps) => {

    const { data: subjects, isLoading, isError, error } = useQuery({
        queryKey: ["get-subjects", slug],
        queryFn: async () => {
            const res = await fetch(`/api/member/${slug}/get-subjects`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            return res.json();
        },
    });

    if (isError) {
        return (
            <ErrorState
                title="We couldn't load subjects"
                message={error?.message ?? 'Please try again later.'}
            />
        );
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="flex w-full items-start gap-2 rounded-md border p-4 shadow-xs animate-pulse"
                    >
                        <div className="size-6 rounded bg-muted" />
                        <div className="flex grow flex-col gap-2">
                            <div className="h-4 w-3/4 rounded bg-muted" />
                            <div className="h-3 w-1/2 rounded bg-muted/70" />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (!subjects?.message.length) {
        return (
            <EmptyState
                icon={
                    <IconFilesOff className="text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg" />
                }
                title="No Subjects Yet"
                description="You haven&apos;t created any subjects yet. Get started by creating your first subject."
            />
        );
    }

    const handleSelect = (subject: string, checked: boolean) => {
        setSelectedSubjects((prev) =>
            checked ? [...prev, subject] : prev.filter((s) => s !== subject)
        );
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.message.map((subject: string, index: number) => {
                    const isChecked = selectedSubjects.includes(subject);

                    return (
                        <div
                            key={`${index}-subject`}
                            className={`relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs transition-all ${isChecked
                                ? "border-destructive/50 bg-destructive/5"
                                : "border-input"
                                }`}
                        >
                            <Checkbox
                                id={`${index}-subject`}
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                    handleSelect(subject, Boolean(checked))
                                }
                                className="order-1 after:absolute after:inset-0"
                                aria-describedby={`${index}-description`}
                            />
                            <div className="flex grow items-center gap-3">
                                <IconFiles className="size-6" />
                                <div className="grid gap-2">
                                    <Label htmlFor={`${index}-subject`} className="truncate">
                                        {subject}
                                    </Label>
                                    <p
                                        id={`${index}-description`}
                                        className="text-xs text-muted-foreground"
                                    >
                                        Select this subject to delete it.
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SubjectLists;
