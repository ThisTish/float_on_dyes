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
import { useTransition } from "react"
import { PiSpinnerBallDuotone } from "react-icons/pi"

// todo add tooltips for this.....
//todo if added, heart checkmark

const AddToWishList = ({ item, size }: { item: WishListItem, size: string }) => {

	const [pending, startTransition] = useTransition()

	const router = useRouter()
	const domain = getBaseUrl()

	const handleAddToWishList = async () => {
		startTransition(async () => {
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
				router.refresh()
			}
		})
	}

	return (
		<>
			{size === 'icon'
				? (
					<button className="size-fit p-1 hover:bg-darkBlue hover:text-white transition duration-500" onClick={handleAddToWishList}>
						{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : <BiBookmarkHeart size={25} />}
					</button>

				) : size === 'button'
					? (
						<Button variant={'default'} size={'lg'} className="w-full" onClick={handleAddToWishList}>
							Wish Bag
							<AnimatedDiv variant={'default'} animation={'pulse'} className="ml-2">
								{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : <BiBookmarkHeart size={25} />}
							</AnimatedDiv>
						</Button>
					) :
					size === 'action'
						? (
							<button
								onClick={handleAddToWishList}
								className="inline-flex h-8 shrink-0 items-center justify-center px-3 text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-white group-[.destructive]:text-white group-[.destructive]:hover:text-destructive group-[.destructive]:focus:ring-destructive relative overflow-hidden z-10 border border-darkBlue shadow-xl text-darkBlue group-[.destructive]:before:bg-white before:bg-darkBlue hover:text-white before:absolute before:w-full before:transition-all before:duration-700 before:-left-full before:rounded-full before:-z-10 before:aspect-square before:hover:w-full before:hover:left-0 before:hover:scale-150 before:hover:duration-700 active:translate-x-1 active:translate-y-1"
								aria-label="Add to wishlist">
								{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : "Add to WishList"}
							</button>
						) : null
			}

		</>
	)
}

export default AddToWishList