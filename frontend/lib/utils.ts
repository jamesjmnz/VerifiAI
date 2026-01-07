import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncate(text: string, maxLength: number, suffix: string = "..."): string {
  if (!text || text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength - suffix.length) + suffix
}


export function formatDate(date: string | Date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

}