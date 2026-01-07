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

// Helper function to extract domain name from URL
export function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url
  }
}

// Helper function to get a readable title from URL
export function getSourceTitle(url: string): string {
  const domain = getDomainFromUrl(url)
  // Capitalize first letter and format common domains
  const parts = domain.split('.')
  if (parts.length > 0) {
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
  }
  return domain
}