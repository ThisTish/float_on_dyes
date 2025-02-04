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