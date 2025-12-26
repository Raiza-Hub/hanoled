"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import CreateClassForm from "../school/resources/create-class";

interface CreateSubjectDialogProps {
    slug: string;
}

const CreateClassDialog = ({ slug }: CreateSubjectDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false); // close dialog when form succeeds
    };

    return (
        <div className="w-full flex items-center justify-end gap-4 md:mb-0">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        size="sm">
                        <IconPlus className="h-4 w-4" />
                        New class
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md ">
                    <DialogHeader>
                        <DialogTitle className="text-foreground mb-2 py-2">New class</DialogTitle>
                    </DialogHeader>
                    <CreateClassForm slug={slug} onSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateClassDialog;
