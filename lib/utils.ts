import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatNumberWithDecimal = (num: number): string => {
    const [whole, decimal] = num.toString().split('.')
    return decimal ? `${whole}.${decimal.toString().padEnd(2, '0')}` : `${whole}.00`
}