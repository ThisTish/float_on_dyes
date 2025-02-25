"use server"

import { auth } from "@/auth"
import { prisma } from "@/db/prisma"
import { CartItem } from "@/types"
import { formatError } from "../utils"
import { cartItemSchema } from "../validators"

// add to wishlist
export async function addItemToWishList(data: CartItem) {
	try {
		const session = await auth()
		if (!session?.user) {
			throw new Error('Please sign in to save items to wishlist.')
		}

		const item = cartItemSchema.parse(data)

		const product = await prisma.product.findFirst({
			where: {
				id: item.productId
			}
		})

		if (!product || product.stock < 1) throw new Error('Item is out of stock')

		await prisma.wishList.upsert({
			where: {
				userId: session.user.id
			},
			update: {
				items: {
					push: {
						...data,
					}
				}
			},
			create: {
				userId: session.user.id,
				items: [
					{
						...data
					}
				]
			}
		})

		return {
			success: true, message: `${product.name} has been added to your dream bag!}`
		}

	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}

// remove from wishlist{
export async function removeItemFromWishList(productId: string) {
	try {
		const session = await auth()
		if (!session?.user) throw new Error("You've gotta be signed in to edit your dream bag.")

		const userId = session.user.id
		const wishList = await prisma.wishList.findFirst({
			where: {
				userId
			}
		})
		if (!wishList) throw new Error("Your dream bag couldn't be found.")

		const updatedWishList = (wishList.items as CartItem[]).filter((x) => x.productId !== productId)

		await prisma.wishList.update({
			where: {
				id: wishList.id
			},
			data: {
				items: updatedWishList
			}
		})
		return { success: true, message: 'Item removed from dream bag' }
	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}

// get wishlist
export async function getWishList(userId: string | undefined) {
	if(!userId || userId === undefined) return

		const wishList = await prisma.wishList.findFirst({
			where: {
				userId
			}
		})

		if(!wishList) return
		
		return ({
			...wishList,
			items: wishList.items as CartItem[]
		})
}