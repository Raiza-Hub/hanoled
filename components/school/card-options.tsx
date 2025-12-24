"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Icon } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { CreateDialog } from "../create-dialog";
import CreateClassForm from "./resources/create-class";
import CreateParentForm from "./resources/create-parent";
import CreateSpreadsheetForm from "./resources/create-spreadsheet";
import CreateStudentForm from "./resources/create-student";
import CreateSubjectForm from "./resources/create-subject";
import CreateTeacherForm from "./resources/create-teacher";

type CreateOptionCardProps = {
    icon: Icon;
    label: string;
    mutation: string;
};

export function CreateOptionCard({ icon: Icon, label, mutation }: CreateOptionCardProps) {
    const { slug } = useParams<{ slug: string }>();

    const [open, setOpen] = useState(false);
    const handleSuccess = () => setOpen(false);



    const renderForm = () => {
        switch (mutation) {
            case "createSubject":
                return <CreateSubjectForm onSuccess={handleSuccess} slug={slug} />;
            case "createClass":
                return <CreateClassForm onSuccess={handleSuccess} slug={slug} />;
            case "createTeacher":
                return <CreateTeacherForm onSuccess={handleSuccess} slug={slug} />;
            case "createSpreadsheet":
                return <CreateSpreadsheetForm onSuccess={handleSuccess} slug={slug} />;
            case "createStudent":
                return <CreateStudentForm onSuccess={handleSuccess} slug={slug} />;
            case "createParent":
                return <CreateParentForm onSuccess={handleSuccess} slug={slug} />;
            default:
                return <div>Form not found</div>;
        }
    };

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="relative p-4 cursor-pointer"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-md bg-black text-white`}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <Plus className="absolute top-2 right-2 text-gray-500 h-4 w-4" />
                </div>
                <h3 className="font-medium text-foreground">
                    {label}
                </h3>
            </div>
            <CreateDialog open={open} onOpenChange={setOpen} title={label}>
                {renderForm()}
            </CreateDialog>
        </>
    );
}
