import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseSection(fullText: string, header: string): string {
  const re = new RegExp(`${header}:\\s*([\\s\\S]*?)(?=\\n[A-Z][a-z]+:|$)`, 'i');
  const match = fullText.match(re);
  return match ? match[1].trim() : '';
}