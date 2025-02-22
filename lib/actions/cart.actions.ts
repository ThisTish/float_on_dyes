'use server'

import { auth } from "@/auth";
import { CartItem, WishListItem } from "@/types";
import { redirect } from "next/navigation";

// add to cart
export async function addItemToCart(data: CartItem){
	return { success: true, message: 'Item added to cart' }
}


// add to wishlist
export async function addItemToWishList(data: WishListItem){
	if(data.isAvailable === false) return { success: false, message: `${data.name} has already been snagged by someone else.` }
	
	const session = await auth()
	if(!session?.user){
		return { success: false, message: 'Please sign in to save items to wishlist'}
	}
	console.log(session)


	return { success: true, message: 'Item added to wishlist' }
}
