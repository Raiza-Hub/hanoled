"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { EllipsisIcon, FileSpreadsheet, Filter, FolderPen, Globe, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import {
    checkboxesFeature,
    hotkeysCoreFeature,
    selectionFeature,
    syncDataLoaderFeature,
} from "@headless-tree/core"
import { useTree } from "@headless-tree/react"

import { Checkbox } from "@/components/ui/checkbox"
import { Tree, TreeItem, TreeItemLabel } from "@/components/tree"
import Component from "@/components/comp-598";

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    lastActive: string;
    dateAdded: string;
    avatar: string;
    children?: string[];
}

const users: User[] = [
    {
        id: 1,
        name: "Florence Shaw",
        email: "florence@untitledui.com",
        roles: ["Parent"],
        lastActive: "Mar 4, 2024",
        dateAdded: "July 4, 2022",
        avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    },
    {
        id: 2,
        name: "Ipaoluwa Ogunneye",
        email: "amelie@untitledui.com",
        roles: ["Parent"],
        lastActive: "Mar 4, 2024",
        dateAdded: "July 4, 2022",
        avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    },
    {
        id: 3,
        name: "Adebola Wisdom",
        email: "ammar@untitledui.com",
        roles: ["Parent"],
        lastActive: "Mar 2, 2024",
        dateAdded: "July 4, 2022",
        avatar: "https://randomuser.me/api/portraits/men/70.jpg",
    },
    {
        id: 4,
        name: "Caitlyn King",
        email: "caitlyn@untitledui.com",
        roles: ["Member", "Parent"],
        lastActive: "Mar 6, 2024",
        dateAdded: "July 4, 2022",
        avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    },
];



const TeacherPage = () => {



    return (
        <div className="max-w-7xl mx-auto flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold">Parent Management</h1>
                    <p className="text-zinc-600 text-[15px]">Manage your staff members and their account permissions here</p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-medium">All parents <span className="text-muted-foreground">{"44"}</span></h2>

                <div className="flex items-center justify-end gap-4 mb-3 md:mb-0">
                    <div className="w-full relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search"
                            className="w-full md:w-64 pl-9 bg-card border-border"
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search schools"
                        />
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="w-fit bg-card border-border px-2 cursor-pointer"
                        aria-label="Open filters"
                    >

                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                    </Button>
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add parent
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader></DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center">

                {/* <div className="grid grid-cols-[3fr_1fr_1fr_1fr] text-sm font-medium text-zinc-600 bg-zinc-100 rounded-sm p-3 mb-4">
                    <div className="">User name</div>
                    <div>Role</div>
                    <div>Date added</div>
                </div> */}


                {/* <div className="space-y-">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center p-3 border-b hover:bg-zinc-50 transition-colors duration-150 relative"
                            role="listitem"
                        >

                            <div className="flex items-center gap-3 flex-1">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src={
                                            user.avatar
                                        }
                                        alt={user.name}
                                    />
                                    <AvatarFallback>hey</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <p className=" font-medium text-zinc-900">{user.name}</p>
                                    <p className="text-zinc-500">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {user.roles.map((role, i) => (
                                    <span className="text-xs bg-zinc-200 text-black px-2 py-1 rounded-sm" key={`${i}-${role}`}>
                                        {role}
                                    </span>
                                ))}
                            </div>

                            <div className="text-sm text-zinc-600">{user.dateAdded}</div>

                            <div className="ml-auto hover:shadow-xs border rounded-md bg-white">
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
                                    <DropdownMenuContent className="-translate-x-8">
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
                    ))}




                </div> */}

                    <Component />
            </div>
        </div>
    );
}

export default TeacherPage;


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