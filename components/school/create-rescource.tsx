"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Blocks,
    FileText,
    Grid3X3,
    UserCog,
    UserPen,
    Users,
} from "lucide-react";
import { CreateOptionCard } from "./card-options";

const CREATE_OPTIONS = [
    { icon: FileText, label: "New subject", color: "bg-black", mutation: "createSubject" },
    { icon: Blocks, label: "New class", color: "bg-black", mutation: "createClass" },
    { icon: UserCog, label: "New teacher", color: "bg-black", mutation: "createTeacher" },
    { icon: Grid3X3, label: "New spreadsheet", color: "bg-black", mutation: "createSpreadsheet" },
    { icon: UserPen, label: "New Student", color: "bg-black", mutation: "createStudent" },
    { icon: Users, label: "New Parent", color: "bg-black", mutation: "createParent" },
];

export function CreateOptionsCarousel() {
    const [api, setApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    useEffect(() => {
        if (!api) return;

        const updateScrollButtons = () => {
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        };

        updateScrollButtons();
        api.on("select", updateScrollButtons);

        return () => {
            api.off("select", updateScrollButtons);
        };
    }, [api]);

    return (
        <div className="flex items-center group relative">
            <Carousel setApi={setApi} className="w-full md:max-w-7xl">
                <CarouselContent className="ml-0">
                    {CREATE_OPTIONS.map((option) => (
                        <CarouselItem
                            key={option.label}
                            className="sm:basis-1/2 md:basis-1/3 xl:basis-1/5 pl-0 mr-4 cursor-pointer hover:bg-accent border rounded-lg"
                        >
                            <CreateOptionCard {...option} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {canScrollPrev && (
                    <CarouselPrevious className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 size-8 group-hover:opacity-100 transition-opacity" />
                )}
                {canScrollNext && (
                    <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-0 size-8 group-hover:opacity-100 transition-opacity" />
                )}

            </Carousel>
        </div>
    );
}
