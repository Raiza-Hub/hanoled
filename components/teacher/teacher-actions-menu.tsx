import { EllipsisIcon, FolderPen, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";

const TeacherActionMenu = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-sm shadow-none cursor-pointer"
                        aria-label="Open edit menu"
                    >
                        <IconDotsVertical className="w-4 h-4" aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                    <DropdownMenuItem>
                        <IconPencil className="h-4 w-4" />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 hover:text-red-600/80 focus:text-red-600/80">
                        <IconTrash className="h-4 w-4 text-red-600 hover:text-red-600/80 focus:text-red-600/80" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default TeacherActionMenu;