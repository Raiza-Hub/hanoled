"use client";

import { useState } from "react";
import CreateSubjectDialog from "@/components/subject/subject-dialog";
import SubjectLists from "@/components/subject/subject-lists";
import { SubjectDeleteButton } from "@/components/subject/delete-button";

interface SubjectPageClientProps {
    slug: string;
}

const SubjectPageClient = ({ slug }: SubjectPageClientProps) => {
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

    return (
        <>
            {/* Swap between Create and Delete button based on selection */}
            {selectedSubjects.length > 0 ? (
                <div className="w-full flex items-center justify-end gap-4 md:mb-0">
                    <SubjectDeleteButton
                        slug={slug}
                        selectedSubjects={selectedSubjects}
                        setSelectedSubjects={setSelectedSubjects}
                    />
                </div>
            ) : (
                <CreateSubjectDialog slug={slug} />
            )}

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-semibold">All subjects</h2>
            </div>

            <div className="flex flex-col justify-center">
                <SubjectLists
                    slug={slug}
                    selectedSubjects={selectedSubjects}
                    setSelectedSubjects={setSelectedSubjects}
                />
            </div>
        </>
    );
};

export default SubjectPageClient;
