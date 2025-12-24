import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getInitials(name?: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export const formatPhoneNumber = (phone: string) => {
  // Remove all non-digit characters except the +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Format: +234 908 219 7663
  return cleaned.replace(/(\+\d{3})(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
};