import { create } from "zustand";
import { School } from "../../type";

interface CurrentSchoolActions {
  setCurrentSchool: (school: School) => void;
}

interface SchoolState {
  currentSchool: School | null;
  action: CurrentSchoolActions;
}

export const useOrganizationStore = create<SchoolState>()((set) => ({
  currentSchool: null,
  action: {
    setCurrentSchool: (school) => set({ currentSchool: school }),
  },
}));

export const useCurrentSchool = () =>
  useOrganizationStore((state) => state.currentSchool);

export const useCurrentSchoolActions = () =>
  useOrganizationStore((state) => state.action);
