import { cartItemSchema, checkOutUserSchema, insertCartSchema, insertProductSchema, insertWishListItemSchema, shippingAddressSchema } from "@/lib/validators"
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