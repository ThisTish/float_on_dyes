import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatNumberWithDecimal = (num: number): string => {
    const [whole, decimal] = num.toString().split('.')
    return decimal ? `${whole}.${decimal.toString().padEnd(2, '0')}` : `${whole}.00`
}

export const formatError = (error: any) =>{
  if(error.name === 'ZodError'){
    const fieldErrors = Object.keys(error.errors).map((field) =>
      error.errors[field])
    return fieldErrors.join('.')
  }else if(error.name === 'PrismaClientKnownRequestError' &&  error.code === 'P2002'){
      const field = error.meta?.target ? error.meta.target[0] : 'Field'
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
  }else{
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message)

  }
}

export const getBaseUrl = () =>{
  if(typeof window !== 'undefined') return ''

  if(process.env.VERCEL_URL) return `https://${process.env.DOMAIN_URL}`
  
  return 'http://localhost:3000'
}

// round number to 2 decimal places
export function round2(value: number | string): number {
  if(typeof value === 'number'){
    return Math.round((value + Number.EPSILON) * 100 / 100)
  }else if(typeof value === 'string'){
    return Math.round((Number(value) + Number.EPSILON) * 100 / 100)

  }
  throw new Error('Invalid value for round2')
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-us', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

export const formatCurrency = (amount : number | string | null) => {
  if(typeof amount === 'number'){
    return CURRENCY_FORMATTER.format(amount)
  }else if(typeof amount === 'string'){
    return CURRENCY_FORMATTER.format(Number(amount))
  }else{
    return NaN
  }
}