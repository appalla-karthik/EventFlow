import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitTextToChars(text: string) {
  return text.split('').map((char, i) => (
    char === ' ' ? '\u00A0' : char
  ));
}
