'use server'

import { auth } from "@/auth"
import { prisma } from "@/db/prisma"
import { CartItem, WishListItem } from "@/types"
import { redirect } from "next/navigation"
import { formatError } from "../utils"
import { cookies } from "next/headers"
import { cartItemSchema } from "../validators"

// add to cart
export async function addItemToCart(data: CartItem) {
	try {
		const ids = await sessionUserId()
		const {userId, sessionCartId} = ids

		const cart = await getMyCart()

		const item = cartItemSchema.parse(data)

		const product = await prisma.product.findFirst({
			where: {
				id: item.productId
			}
		})

		console.log(product)
		
		return { success: true, message: 'Item added to cart' }
	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}

// get userId from session, or return undefined if not signed in
export async function sessionUserId() {
	const sessionCartId = (await cookies()).get('sessionCartId')?.value
		if(!sessionCartId) throw new Error('Cart session not found')

		const session = await auth()
		const userId = session?.user?.id ? (session.user.id) : undefined

		return {userId, sessionCartId}
}

// find cart by userId or sessionCartId
export async function getMyCart() {
	const ids = await sessionUserId()
	const {userId, sessionCartId} = ids

		const cart = await prisma.cart.findFirst({
			where: userId ? { userId} : {sessionCartId},
		})
		if(!cart) return undefined

		return convertToPlainObject({
			...cart,
			items: cart.items as CartItem[],
			itemsPrice: cart.itemsPrice.toString(),
			totalPrice: cart.totalPrice.toString(),
			shippingPrice: cart.shippingPrice.toString(),
			taxPrice: cart.taxPrice.toString(),
		})
}


// add to wishlist
export async function addItemToWishList(data: WishListItem) {
	if (data.isAvailable === false) return { success: false, message: `${data.name} has already been snagged.` }

	const session = await auth()
	if (!session?.user) {
		return { success: false, message: 'Please sign in to save items to wishlist' }
	}

	try {
		const updatedWishList = await prisma.wishList.upsert({
			where: {
				userId: session.user.id
			},
			update: {
				items: {
					push: {
						name: data.name,
						slug: data.slug,
						image: data.image,
						productId: data.productId,
						isAvailable: true
					}
				}
			},
			create: {
				userId: session.user.id,
				items: [
					{
						name: data.name,
						slug: data.slug,
						image: data.image,
						productId: data.productId,
						isAvailable: true
					}
				]
			}
		})

		if (!updatedWishList) return { success: false, message: 'An error occurred, please try again later' }

		return { success: true, message: 'Item added to wishlist' }

	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}
function convertToPlainObject(arg0: { items: CartItem[]; itemsPrice: string; totalPrice: string; shippingPrice: string; taxPrice: string; id: string; createdAt: Date; userId: string | null; sessionCartId: string; updatedAt: Date }) {
	throw new Error("Function not implemented.")
}

