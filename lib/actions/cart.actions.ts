'use server'

import { auth } from "@/auth"
import { prisma } from "@/db/prisma"
import { CartItem } from "@/types"
import { convertToPlainObject, formatError, round2 } from "../utils"
import { cookies } from "next/headers"
import { cartItemSchema, insertCartSchema } from "../validators"
import { FREE_SHIPPING_PRICE, SHIPPING_PRICE } from "../constants"
import { Prisma } from "@prisma/client"


// calculate cart prices
const calcPrice = (items: CartItem[]) => {
	const itemsPrice = round2(
		items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
	),
		// if cart total is greater than 100, shipping is free
		shippingPrice = round2(itemsPrice >= FREE_SHIPPING_PRICE || itemsPrice === 0 ? 0 : SHIPPING_PRICE),
		taxPrice = round2(0.15 * itemsPrice),
		totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

	return {
		itemsPrice: itemsPrice.toFixed(2),
		shippingPrice: shippingPrice.toFixed(2),
		taxPrice: taxPrice.toFixed(2),
		totalPrice: totalPrice.toFixed(2)
	}
}

// add to cart
export async function addItemToCart(data: CartItem) {
	try {
		// get user/session ids
		const ids = await sessionUserId()
		if (!ids) throw new Error('Cart not found')
		const { userId, sessionCartId } = ids

		// get cart
		const cart = await getCart(userId, sessionCartId, 'this one')

		// validate cart item
		const item = cartItemSchema.parse(data)

		// get product
		const product = await prisma.product.findFirst({
			where: {
				id: item.productId
			}
		})
		// checking if in stock or available
		if (!product || product.stock < 1) return { success: false, message: 'but you can request a different custom disc!' }
		//> this will not work if there are more than one in stock to begin with, and they try to add more to their cart. when adding to their cart, the stock does not get updated. Not a problem until we add stickers/shirts/etc.
		if (product.stock === 1 && !product.isAvailable) return { success: false, message: `Add to wish list to check back later.` }

		// if no cart, make one and add item
		if (!cart) {
			try {
				const newCart = insertCartSchema.parse({
					userId: userId,
					sessionCartId,
					items: [item],
					...calcPrice([item])
				})
				const createdCart = await prisma.cart.create({
					data: newCart
				})

			} catch (error) {
				return { success: false, message: formatError(error) }
			}


			return { success: true, message: `${product.name} added to cart!` }

		} else {
			// if cart exists, check if item is already in cart
			const existItem = (cart.items as CartItem[]).find((x) => x.productId === item.productId)

			// if item is in cart and there is more than 1 available add to cart
			if (existItem) {
				if (product.stock === 1) {
					throw new Error(`And you've already snagged it!`)
				}
				if (product.stock < existItem.qty + 1) {
					throw new Error("You've snagged all we have in stock.")
				}
				existItem.qty = existItem.qty + 1
			} else {
				// if item is not in cart, add to cart
				cart.items.push(item)
			}
			await prisma.cart.update({
				where: {
					id: cart.id
				},
				data: {
					items: cart.items as Prisma.CartUpdateitemsInput[],
					...calcPrice(cart.items as CartItem[])
				}
			})

			return {
				success: true,
				message: `${product.name} ${existItem ? 'updated in ' : 'added to '}cart!`
			}
		}
	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}

// remove item from cart
export async function removeItemFromCart(productId: string) {
	try {
		const sessionCartId = (await cookies()).get('sessionCartId')?.value
		if (!sessionCartId) throw new Error('Cart session not found')

		const cart = await getCart(undefined, sessionCartId)
		if (!cart) throw new Error('Cart not found')

		const product = await prisma.product.findFirst({
			where: {
				id: productId
			}
		})
		if (!product) throw new Error('Product not found')

		const existingItem = (cart.items as CartItem[]).find((x) => x.productId === productId)
		if (!existingItem || existingItem.qty === 0) throw new Error('Item not found in cart')

		if (existingItem.qty === 1) {
			cart.items = (cart.items as CartItem[]).filter((x) => x.productId !== productId)
		} else {
			existingItem.qty = existingItem.qty - 1
		}

		await prisma.cart.update({
			where: {
				id: cart.id
			},
			data: {
				items: cart.items as Prisma.CartUpdateitemsInput[],
				...calcPrice(cart.items as CartItem[])

			}
		})

		return { success: true, message: `${product.name}${existingItem.qty > 1 ? "'s quantity updated in" : " removed from"} cart.` }

	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}

// get userId from session, or return undefined if not signed in
export async function sessionUserId() {
	const sessionCartId = (await cookies()).get('sessionCartId')?.value
	if (!sessionCartId) throw new Error('Cart session not found')

	const session = await auth()
	const userId = session?.user?.id ? (session.user.id) : undefined

	return { userId, sessionCartId }
}

// find cart by userId or sessionCartId
export async function getCart(passedUserId?: string, passedSessionCartId?: string, calling?: string) {
	let userId
	let sessionCartId
	if (!passedUserId && !passedSessionCartId) {
		const ids = await sessionUserId()
		if (ids.userId) userId = ids.userId
		sessionCartId = ids.sessionCartId
	}
	else {
		userId = passedUserId
		sessionCartId = passedSessionCartId
	}

	const cart = await prisma.cart.findFirst({
		where: userId ? { userId } : { sessionCartId },
	})
	if (!cart) return

	const cartPlain = (convertToPlainObject({
		...cart,
		items: cart.items as CartItem[],
		itemsPrice: cart.itemsPrice.toString(),
		totalPrice: cart.totalPrice.toString(),
		shippingPrice: cart.shippingPrice.toString(),
		taxPrice: cart.taxPrice.toString(),
	}))

	return cartPlain
}

export async function mergeCarts(items: CartItem[], sessionCartId: string, userId: string) {
	const updatingItems = []

	for (const item of items) {
		const product = await prisma.product.findFirst({
			where: {
				id: item.productId
			}
		})
		if (!product || product.stock < 1) continue
		const existItem = (updatingItems as CartItem[]).find((x) => x.productId === item.productId)
		if (existItem) continue
		updatingItems.push(item)
	}

	try {
		await prisma.cart.update({
			where: {
				id: sessionCartId
			},
			data: {
				userId: userId,
				items: updatingItems,
				...calcPrice(updatingItems)
			}
		})
	} catch (error) {
		console.log('error merging cart', error)
	}
}

// export function convertToPlainObject(arg0: { items: CartItem[]; itemsPrice: string; totalPrice: string; shippingPrice: string; taxPrice: string; id: string; createdAt: Date; userId: string | null; sessionCartId: string; updatedAt: Date }) {
// 	throw new Error("Function not implemented.")
// }
