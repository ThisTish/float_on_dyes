import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatNumberWithDecimal = (num: number): string => {
    const [whole, decimal] = num.toString().split('.')
    return decimal ? `${whole}.${decimal.toString().padEnd(2, '0')}` : `${whole}.00`
}

export const formatSignUpError = (error: any) =>{
  if(error.name === 'ZodError'){
    const fieldErrors = Object.keys(error.errors).map((field) =>
      error.errors[field].message)
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