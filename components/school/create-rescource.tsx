"use client"

import { UniqueSchool } from "@/type"
import {
    IconCategoryPlus,
    IconFiles,
    IconFileTypeXls,
    IconSchool,
    IconUsers,
    IconUserScan
} from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import {
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { useParams } from "next/navigation"
import { CreateOptionCard } from "./card-options"

import "swiper/css"
import "swiper/css/navigation"
import { Keyboard, Mousewheel, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"



const CREATE_OPTIONS = [
    {
        icon: IconFiles,
        label: "New subject",
        color: "bg-black",
        mutation: "createSubject",
        allowed: ["owner", "admin"]
    },
    {
        icon: IconCategoryPlus,
        label: "New class",
        color: "bg-black",
        mutation: "createClass",
        allowed: ["owner", "admin"]
    },
    {
        icon: IconUsers,
        label: "New teacher",
        color: "bg-black",
        mutation: "createTeacher",
        allowed: ["owner", "admin"]
    },
    {
        icon: IconFileTypeXls,
        label: "New spreadsheet",
        color: "bg-black",
        mutation: "createSpreadsheet",
        allowed: ["owner", "admin", "member"]
    },
    {
        icon: IconSchool,
        label: "New Student",
        color: "bg-black",
        mutation: "createStudent",
        allowed: ["owner", "admin", "member"]
    },
    {
        icon: IconUserScan,
        label: "New Parent",
        color: "bg-black",
        mutation: "createParent",
        allowed: ["owner", "admin"]
    },
]



export function CreateOptionsCarousel() {
    const { slug } = useParams<{ slug: string }>();

    const { data: school, isLoading } = useQuery<UniqueSchool, Error>({
        queryKey: ["get-school", slug],
        queryFn: async () => {
            const res = await fetch(`/api/school/get-school/${slug}`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            return res.json();
        },
    });

    if (isLoading) {
        return <Loading />
    }

    if (!school) {
        return null
    }

    const userRoles = school.role || []

    // Filter the options based on the user's roles
    const filteredOptions = CREATE_OPTIONS.filter(option =>
        option.allowed.some(role => userRoles.includes(role))
    )



    return (
        <div className="relative group">
            <Swiper
                cssMode={true}
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                }}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Mousewheel, Keyboard]}
                className="mySwiper"
                slidesPerView={1}
                spaceBetween={16}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
            >
                {filteredOptions.map(option => (
                    <SwiperSlide
                        key={option.label}
                        className="cursor-pointer hover:bg-accent border rounded-lg"
                    >
                        <CreateOptionCard {...option} />
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Buttons */}
                <button
                    className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </Swiper>
        </div>

    )
}


export function Loading() {
    return (
        <div className="relative group overflow-hidden">
            <div className="flex gap-2">
                {/* Create multiple skeleton loading placeholders */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="mr-6 last:mr-0 min-w-0 shrink-0 grow-0 basis-full md:basis-1/4 xl:basis-1/5 rounded-lg p-4"
                    >
                        <div className="animate-pulse bg-muted h-28 rounded-lg"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}