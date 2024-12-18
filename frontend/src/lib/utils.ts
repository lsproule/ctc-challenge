import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  //tailwind merge from shadcn
  return twMerge(clsx(inputs));
}
