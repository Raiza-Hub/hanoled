import CreateClassDialog from "@/components/class/class-dialog";
import ClassLists from "@/components/class/class-lists";
import CreateClassForm from "@/components/school/resources/create-class";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisIcon, FileSpreadsheet, FolderPen, Plus, Trash } from "lucide-react";

const ClassesPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col px-6">
            <div className="flex items-center justify-between mb-4 py-4">
                <div className="space-y-0.5">
                    <h1 className="text-2xl font-bold">Class Management</h1>
                    <p className="text-zinc-600 text-[15px]">Organize and monitor all your classes in one place.</p>
                </div>
            </div>

            <CreateClassDialog slug={slug} />


            <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-semibold">All classes</h2>
            </div>


            <ClassLists slug={slug} />
        </div>
    );
}

export default ClassesPage;