
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatInTimeZone } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAppDate(date: string | Date, formatString = 'dd/MM/yyyy HH:mm'): string {
  const timeZone = 'America/Santiago';
  try {
    return formatInTimeZone(date, timeZone, formatString);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Fecha inválida";
  }
}
