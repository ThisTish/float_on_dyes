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
	stock: z.number(),
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
	isSubscribed: z.boolean()
}).refine((data) => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
})

export const resetPasswordFormSchema = z.object({
	email: z.string().email('Invalid email address')
})

export const updatePasswordFormSchema = z.object({
	token: z.string(),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
})

export const cartItemSchema = z.object({
	productId: z.string().min(1, 'Product is required'),
	name: z.string().min(1, 'Name is required'),
	slug: z.string().min(1, 'Slug is required'),
	qty: z.number().int().nonnegative('Quantity must be a positive integer'),
	image: z.string().min(1, 'Image is required'),
	price: currency
})

export const insertCartSchema = z.object({
	items: z.array(cartItemSchema),
	itemsPrice: currency,
	totalPrice: currency,
	shippingPrice: currency,
	taxPrice: currency,
	sessionCartId: z.string().min(1, 'Session cart id is required'),
	userId: z.string().optional().nullable()
})


export const wishListItemSchema = z.object({
	productId: z.string().min(1, 'Product is required'),
	name: z.string().min(1, 'Name is required'),
	slug: z.string().min(1, 'Slug is required'),
	image: z.string().min(1, 'Image is required')
})

export const insertWishListItemSchema = z.object({
	items: z.array(wishListItemSchema),
	userId: z.string().optional().nullable()
})