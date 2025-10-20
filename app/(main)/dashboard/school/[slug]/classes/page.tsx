import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisIcon, FileSpreadsheet, FolderPen, Plus, Trash } from "lucide-react";

const ClassesPage = () => {
    return (
        <div className="max-w-7xl mx-auto flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold">Classes</h1>
                    <p className="text-zinc-600 text-[15px]">Configure times when you are available for bookings.</p>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                new class
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader></DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="w-full rounded-sm border bg-white p-4 flex items-center justify-between hover:bg-zinc-50">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <h2 className="text-base font-medium text-gray-900">SS1 White</h2>
                        <span className="text-xs bg-zinc-200 text-black px-2 py-1 rounded-sm">
                            Adebola wisdom
                        </span>
                    </div>

                    <div className="text-zinc-600 text-sm mb-1.5">
                        <div className="flex">
                            <p className='text-muted-foreground'>
                                {"Class limit"}
                            </p>

                            <div className="ml-2 border-l text-muted-foreground border-zinc-300 pl-2">
                                {"10"}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-zinc-500 text-sm">
                        <FileSpreadsheet className="h-4 w-4" />
                        <span>18 spreadsheet</span>
                    </div>
                </div>

                <div className="bg-white not-hover:shadow-xs border rounded-md">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-sm shadow-none "
                                aria-label="Open edit menu"
                            >
                                <EllipsisIcon className="h-4 w-4" aria-hidden="true" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="-translate-x-10">
                            <DropdownMenuItem>
                                <FolderPen className="h-4 w-4" />
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 hover:text-red-600/80 focus:text-red-600/80">
                                <Trash className="h-4 w-4 text-red-600 hover:text-red-600/80 focus:text-red-600/80" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
              </div>
            </div>
        </div>
    );
}

export default ClassesPage;