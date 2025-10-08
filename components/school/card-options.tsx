"use client";

import { LucideIcon, Plus } from "lucide-react";
import { useState } from "react";

// Import your actual form components

import { CreateDialog } from "../create-dialog";
import CreateClassForm from "./resources/create-class";
import CreateParentForm from "./resources/create-parent";
import CreateSpreadsheetForm from "./resources/create-spreadsheet";
import CreateStudentForm from "./resources/create-student";
import CreateSubjectForm from "./resources/create-subject";
import CreateTeacherForm from "./resources/create-teacher";

type CreateOptionCardProps = {
    icon: LucideIcon;
    label: string;
    mutation: string;
};

export function CreateOptionCard({ icon: Icon, label, mutation }: CreateOptionCardProps) {
    const [open, setOpen] = useState(false);

    const renderForm = () => {
        switch (mutation) {
            case "createSubject":
                return <CreateSubjectForm />;
            case "createClass":
                return <CreateClassForm />;
            case "createTeacher":
                return <CreateTeacherForm />;
            case "createSpreadsheet":
                return <CreateSpreadsheetForm />;
            case "createStudent":
                return <CreateStudentForm />;
            case "createParent":
                return <CreateParentForm />;
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
            <CreateDialog open={open} onOpenChange={setOpen} title={label} >
                {renderForm()}
            </CreateDialog>
        </>
    );
}
