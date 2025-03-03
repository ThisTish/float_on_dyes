import { cartItemSchema, checkOutUserSchema, insertCartSchema, insertOrderItemSchema, insertOrderSchema, insertProductSchema, insertWishListItemSchema, shippingAddressSchema } from "@/lib/validators"
import { z } from "zod"

export type Product = z.infer<typeof insertProductSchema> & {
	id: string,
	createdAt: Date
}

export type Cart = z.infer<typeof insertCartSchema>
export type CartItem = z.infer<typeof cartItemSchema>

export type WishList = z.infer<typeof insertWishListItemSchema>

export type ShippingAddress = z.infer<typeof shippingAddressSchema>

export type CheckOutUser = z.infer<typeof checkOutUserSchema>

export type OrderItem = z.infer<typeof insertOrderItemSchema>
export type Order = z.infer<typeof insertOrderSchema> & {
	id: string
	createdAt: Date
	isPaid: boolean
	paidAt: Date
	isDelivered: boolean
	deliveredAt: Date
	orderItems: OrderItem[]
	user: {name: string, email: string}
}