import { z } from 'zod'
import { formatNumberWithDecimal } from './utils'
import { PAYMENT_METHODS } from './constants'

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


export const insertWishListItemSchema = z.object({
	items: z.array(cartItemSchema),
	userId: z.string().optional().nullable(),
	id: z.string()
})

export const shippingAddressSchema = z.object({
	fullName: z.string().min(3, 'Full name must be at least 3 characters long'),
	streetAddress: z.string().min(3, 'Address must be at least 3 characters long'),
	city: z.string().min(3, 'City must be at least 3 characters long'),
	zipCode: z.string().min(5, 'Zip code must be at least 5 characters long').max(10, 'Zip code must be at most 10 characters long'),
	state: z.string().min(2, 'State must be at least 2 characters long'),
	lat: z.number().optional(),
	lng: z.number().optional()
})


export const paymentMethodSchema = z.object({
	type: z.string().min(1, 'Payment method is required')
}).refine((data) => PAYMENT_METHODS.includes(data.type), {
	path: ['type'],
	message: 'Invalid payment method'
})

export const checkOutUserSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
	email: z.string().email('Invalid email address'),
	isSubscribed: z.boolean(),
	paymentMethod: paymentMethodSchema,
	address: shippingAddressSchema
})

export const insertOrderSchema = z.object({
	userId: z.string().min(1, 'User id is required'),
	itemsPrice: currency,
	shippingPrice: currency,
	taxPrice: currency,
	totalPrice: currency,
	paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
		path: ['paymentMethod'],
		message: 'Invalid payment method'
	}),
	shippingAddress: shippingAddressSchema
})

export const insertOrderItemSchema = z.object({
	productId: z.string(),
	name: z.string(),
	slug: z.string(),
	image: z.string(),
	price: currency,
	qty: z.number()
})

export const updatingUserProfileSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long'),
	email: z.string().email('Invalid email address').min(3, 'Email must be at least 3 characters long'),
	image: z.string().optional(),
	password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
	newPassword: z.string().min(6, 'New password must be at least 6 characters long').optional(),
	confirmNewPassword: z.string().min(6, 'Confirm new password must be at least 6 characters long').optional()
}).refine((data) => {
	if (!data.password && data.newPassword && data.confirmNewPassword) {
		return false
	}
	return true
}, {
	message: 'New password is required when changing password',
	path: ['password']
}).refine((data) => {
	return !data.newPassword || data.newPassword === data.confirmNewPassword
}, {
	message: 'Passwords do not match',
	path: ['confirmNewPassword']
})