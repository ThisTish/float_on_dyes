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
export function round2(value: number | string) {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error('Value is not a number or string');
  }
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

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// shorten uuid(for orders)
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`
}

// format date & time
export function formatDateTime(dateString: Date) {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric'
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  )
  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  )
  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  )

  return{
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime
  }
}