"use client";

import { useState } from "react";
import CreateSubjectForm from "@/components/school/resources/create-subject";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconPlus } from "@tabler/icons-react";

interface CreateSubjectDialogProps {
    slug: string;
}

const CreateSubjectDialog = ({ slug }: CreateSubjectDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false); // close dialog when form succeeds
    };

    return (
        <div className="w-full flex items-center justify-end gap-4 md:mb-0">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="sm">
                        <IconPlus className="h-4 w-4" />
                        New subject
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-foreground mb-2 py-2">New subject</DialogTitle>
                    </DialogHeader>
                    <CreateSubjectForm slug={slug} onSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateSubjectDialog;
