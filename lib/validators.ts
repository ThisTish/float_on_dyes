import { z } from 'zod'
import { formatNumberWithDecimal } from './utils'

const currency = z
.string()
.refine((val: string) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(val))))

export const insertProductSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long'),
	slug: z.string(),
	brand: z.string(),
	category: z.string(),
	plastic: z.string(),
	description: z.string().min(20, 'Description must be at least 20 characters.'),
	images: z.array(z.string()),
	discType: z.array(z.string()),
	tags: z.array(z.string()),
	color: z.array(z.string()),
	dyeType: z.array(z.string()),
	price: currency,
	speed: z.number(),
	glide: z.number(),
	turn: z.number(),
	fade: z.number(),
	weight: z.number(),
	isAvailable: z.boolean(),
	isFeatured: z.boolean(),
	isDiscounted: z.boolean(),
})

export const signInFormSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const signUpFormSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
})