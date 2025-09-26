import { SchoolMessage } from "@/type";
import { create } from "zustand";

interface CurrentSchoolActions {
  setCurrentSchool: (school: SchoolMessage) => void;
}

interface SchoolState {
  currentSchool: SchoolMessage | null;
  action: CurrentSchoolActions;
}

export const useSchoolStore = create<SchoolState>()((set) => ({
  currentSchool: null,
  action: {
    setCurrentSchool: (school) => set({ currentSchool: school }),
  },
}));

export const useCurrentSchool = () =>
  useSchoolStore((state) => state.currentSchool);

export const useCurrentSchoolActions = () =>
  useSchoolStore((state) => state.action);
