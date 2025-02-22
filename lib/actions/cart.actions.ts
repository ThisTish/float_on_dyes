'use server'

import { CartItem, WishListItem } from "@/types";

export async function addItemToCart(data: CartItem){
	return { success: true, message: 'Item added to cart' }
}

export async function addItemToWishList(data: WishListItem){
	return { success: true, message: 'Item added to wishlist' }
}
