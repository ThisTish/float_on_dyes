'use server'

import { auth } from "@/auth"
import { prisma } from "@/db/prisma"
import { CartItem, WishListItem } from "@/types"
import { formatError, round2 } from "../utils"
import { cookies } from "next/headers"
import { cartItemSchema, insertCartSchema } from "../validators"
import { FREE_SHIPPING_PRICE, SHIPPING_PRICE } from "../constants"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

// calculate cart prices
const calcPrice = (items: CartItem[]) => {
	const itemsPrice = round2(
		items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
	),
		// if cart total is greater than 100, shipping is free
		shippingPrice = round2(itemsPrice >= FREE_SHIPPING_PRICE ? 0 : SHIPPING_PRICE),
		taxPrice = round2(0.15 * itemsPrice),
		totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

	return {
		itemsPrice: itemsPrice.toFixed(2),
		shippingPrice: shippingPrice.toFixed(2),
		taxPrice: taxPrice.toFixed(2),
		totalPrice: totalPrice.toFixed(2),
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
		const cart = await getCart()

		// validate cart item
		const item = cartItemSchema.parse(data)

		// get product
		const product = await prisma.product.findFirst({
			where: {
				id: item.productId
			}
		})
		// checking if in stock or available
		if (!product || product.stock < 1) return { success: false, message: `${data.name} has already been snagged.` }
		if (product.stock === 1 && !product.isAvailable) return { success: false, message: `${data.name} is currently reserved in someone's cart, check back in 30 min.` }

		// if no cart, make one and add item
		if (!cart) {
			const newCart = insertCartSchema.parse({
				userId,
				sessionCartId,
				items: [item],
				...calcPrice([item])
			})

			await prisma.cart.create({
				data: newCart
			})

			revalidatePath(`/products/${product.slug}`)

			return { success: true, message: `${product.name} added to cart!` }

		} else {
			// if cart exists, check if item is already in cart
			const existItem = (cart.items as CartItem[]).find((x) => x.productId === item.productId)

			// if item is in cart and there is more than 1 available add to cart
			if (existItem) {
				if (product.stock === 1) {
					throw new Error(`${product.name} is one of a kind, and you've already snagged it!`)
				}
				if (product.stock < existItem.qty + 1) {
					throw new Error(`Not enough in stock.`)
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
			revalidatePath(`/products/${product.slug}`)

			return {
				success: true,
				message: `${product.name} ${existItem ? 'updated in ' : 'added to '}cart!`
			}
		}
	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}

// delete item from cart
export async function deleteItemFromCart(productId: string) {
	try {
		const cart = await getCart()
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

		revalidatePath(`/products/${product.slug}`)

		return { success: true, message: `${product.name}${existingItem.qty > 0 ? "'s quantity updated" : " removed"}` }

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
export async function getCart() {
	const ids = await sessionUserId()
	const { userId, sessionCartId } = ids

	const cart = await prisma.cart.findFirst({
		where: userId ? { userId } : { sessionCartId },
	})
	if (!cart) return

	const cartPlain = ({
		...cart,
		items: cart.items as CartItem[],
		itemsPrice: cart.itemsPrice.toString(),
		totalPrice: cart.totalPrice.toString(),
		shippingPrice: cart.shippingPrice.toString(),
		taxPrice: cart.taxPrice.toString(),
	})

	return cartPlain
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

