// ✅ Change prop typing
import { useCurrentSchoolActions } from "@/app/stores/school-store";
import { SchoolMessage } from "@/type";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { ChevronRight } from "lucide-react";

export default function SchoolsLists({ schools }: { schools: SchoolMessage[] }) {
    const { setCurrentSchool } = useCurrentSchoolActions();
    const router = useRouter();

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {schools.map((school) => (
                <Card
                    key={school.id}
                    onClick={() => {
                        setCurrentSchool(school);
                        router.push(`/dashboard/school/${school.slug}`);
                    }}
                    className="group h-40 cursor-pointer border-border bg-card p-4 transition-colors hover:bg-accent rounded-md shadow-none"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="font-medium text-card-foreground mb-1 line-clamp-2">
                                {school.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Created at |{" "}
                                {new Date(school.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                </Card>
            ))}
        </div>
    );
}
