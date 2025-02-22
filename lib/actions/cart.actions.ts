'use server'

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { CartItem, WishListItem } from "@/types";
import { redirect } from "next/navigation";

// add to cart
export async function addItemToCart(data: CartItem) {
	return { success: true, message: 'Item added to cart' }
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
		return { success: false, message: `An error occurred, ${error}` }
	}
}
