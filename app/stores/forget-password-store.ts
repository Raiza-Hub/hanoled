import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ForgetPasswordEmailState {
  ForgetPasswordEmail: string | undefined;
  setForgetPasswordEmail: (email: string) => void;
  setclearForgetPasswordEmail: () => void;
}


const useForgetPasswordStore = create<ForgetPasswordEmailState>()(
  persist(
    (set) => ({
      ForgetPasswordEmail: undefined,
      setForgetPasswordEmail: (email) => set({ ForgetPasswordEmail: email }),
      setclearForgetPasswordEmail: () => set({ ForgetPasswordEmail: undefined }),
    }),
    {
      name: "forget-password-email-storage",
    }
  )
);

export const useForgetPasswordEmail = () =>
  useForgetPasswordStore((state) => state.ForgetPasswordEmail);

export const useForgetPasswordEmailActions = () =>
  useForgetPasswordStore((state) => state.setForgetPasswordEmail);

export const useclearForgetPasswordEmailActions = () =>
  useForgetPasswordStore((state) => state.setclearForgetPasswordEmail);


