"use client"

import { IconPlus } from "@tabler/icons-react";
import { Search } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import CreateTeacherForm from "./school/resources/create-teacher";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";


const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useQueryState("search", { defaultValue: "" });
        const [open, setOpen] = useState(false);
    
    // const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const params = useParams();
    const searchParams = useSearchParams()

    const slug = params.slug;
    const search = searchParams.get('search')

    const handleSuccess = () => {
        setOpen(false); // close dialog when form succeeds
    };


    return (
        <div>
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="w-full flex flex-col-reverse md:flex-row items-center gap-2">

                    {/* <div className="w-full relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for a school"
                            className="w-full md:w-64 pl-9 bg-card border-border"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search schools"
                        />
                    </div> */}


                    <div className="w-full flex items-center justify-end gap-4 md:mb-0">
                        <div className="flex items-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        size="sm">
                                        <IconPlus className="h-4 w-4" />
                                        <span>New class</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-foreground mb-2 py-2">New teacher</DialogTitle>
                                    </DialogHeader>
                                    <CreateTeacherForm slug={slug} onSuccess={handleSuccess} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;