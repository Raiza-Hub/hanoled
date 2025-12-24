import { School, SchoolMessage } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface SchoolState {
    currentSchool: SchoolMessage | null;
    setCurrentSchool: (school: SchoolMessage) => void;
    setclearCurrentSchool: () => void;
}

export const useSchoolStore = create<SchoolState>()(
    persist(
        (set) => ({
            currentSchool: null,
            setCurrentSchool: (school) => set({ currentSchool: school }),
            setclearCurrentSchool: () => set({ currentSchool: null }),
        }),
        {
            name: "currentSchool-storage",
        }
    )
);

export const useCurrentSchool = () =>
    useSchoolStore((state) => state.currentSchool);

export const useCurrentSchoolActions = () =>
    useSchoolStore((state) => state.setCurrentSchool);

export const useclearCurrentSchoolActions = () =>
    useSchoolStore((state) => state.setclearCurrentSchool);
