"use client"

import { WishListItem } from "@/types"
import { BiBookmarkHeart } from "react-icons/bi"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { toast } from "@/hooks/use-toast"
import { addItemToWishList } from "@/lib/actions/wishList.actions"
import { ToastAction } from "@radix-ui/react-toast"
import { useRouter } from "next/navigation"
import { getBaseUrl } from "@/lib/utils"

// todo add tooltips for this.....
//todo if added, heart checkmark

const AddToWishList = ({ item, size }: { item: WishListItem, size: string }) => {

	const router = useRouter()
	const domain = getBaseUrl()

	const handleAddToWishList = async () => {
		const res = await addItemToWishList(item)

		if (!res.success) {
			const previousPage = window.location.pathname

			toast({
				variant: 'destructive',
				description: res.message,
				action: res.message === 'Please sign in to save items to wishlist'
					? <ToastAction altText="Sign in to save item" onClick={() => router.push(`/sign-in?callbackUrl=${domain}${previousPage}`)}>Go to Sign In</ToastAction>
					: undefined
			})
		}

		if (res.success) {
			toast({
				description: `Added ${item.name} to Wish List`,
			})
		}
	}

	return (
		<>
			{size === 'icon' ? (
				<button className="size-fit p-1 hover:bg-darkBlue hover:text-white transition duration-500" onClick={handleAddToWishList}>
					<BiBookmarkHeart size={25} />
				</button>

			) : (
				<Button variant={'default'} size={'lg'} className="w-full" onClick={handleAddToWishList}>
					Wish Bag
					<AnimatedDiv variant={'default'} animation={'pulse'} className="ml-2"><BiBookmarkHeart /></AnimatedDiv>
				</Button>
			)}

		</>
	)
}

export default AddToWishList