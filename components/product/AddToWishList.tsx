"use client"

import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { toast } from "@/hooks/use-toast"
import { addItemToWishList, removeItemFromWishList } from "@/lib/actions/wishList.actions"
import { ToastAction } from "../ui/toast"
import { useRouter } from "next/navigation"
import { getBaseUrl } from "@/lib/utils"
import { useTransition } from "react"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { LucideBookmarkPlus } from "lucide-react"
import { CartItem } from "@/types"
import { removeItemFromCart } from "@/lib/actions/cart.actions"
import AddToCart from "./AddToCart"


// todo add tooltips for this.....
// todo check if in wishlist lucide bookmark check
// todo, if item isn't available, update to stay out of stock or something.

const AddToWishList = ({ item, size }: { item: CartItem, size: string }) => {

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
					title: res.message === 'but you can request a different custom disc!' ? `${item.name} has been snagged,`
						: res.message === "Would you like to add it to your cart instead?" ? `${item.name} is already in your wish list,`
							: undefined,
					description: res.message,
					action: res.message === 'Please sign in to save items to wishlist.' || res.message === "You've gotta be signed in to edit your wish list."
						? <ToastAction altText="Sign in to save item" onClick={() => router.push(`/sign-in?callbackUrl=${domain}${previousPage}`)}>Go to Sign In</ToastAction>
						: res.message === 'but you can request a different custom disc!'
							? <ToastAction altText="Go to custom dye page" onClick={() => router.push('/custom')}>Custom Order Page</ToastAction>
							: res.message === "Would you like to add it to your cart instead?"
								? <AddToCart item={item} size="action" />
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

	const handleRemoveItem = async () => {
		startTransition(async () => {

			const res = await removeItemFromWishList(item.productId)
			if (!res.success) {
				toast({
					variant: 'destructive',
					description: res.message,
				})
			}

			if (res.success) {
				toast({
					description: res.message
				})
			}
			router.refresh()
		})
	}

	const handleMoveToWishList = async () => {
		startTransition(async () => {
			const res = await addItemToWishList(item)
			if (!res.success) {
				toast({
					variant: 'destructive',
					description: res.message === "Would you like to add it to your cart instead?"
					? "This item is already in your wish list." : res.message,
				})
				return
			}

			if (res.success) {
				const res = await removeItemFromCart(item.productId)
				if (!res.success) {
					toast({
						variant: 'destructive',
						description: res.message,
					})
					return
				}
				toast({
					description: `Moved ${item.name} to wish list!`
				})
			}
			router.refresh()
		})
	}



	return (
		<>
			{size === 'icon'
				? (
					<button className="size-fit p-1 hover:bg-darkBlue hover:text-white transition duration-500" onClick={handleAddToWishList}>
						{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : <LucideBookmarkPlus size={25} />}
					</button>

				) : size === 'button'
					? (
						<Button variant={'outline'} size={'lg'} className="w-full border-none" onClick={handleAddToWishList}>
							Wish Bag
							<AnimatedDiv variant={'outline'} animation={'pulse'} className="ml-2">
								{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : <LucideBookmarkPlus size={25} />}
							</AnimatedDiv>
						</Button>
					) :
					size === 'action'
						? (
							<button
								onClick={handleAddToWishList}
								className="inline-flex h-8 shrink-0 items-center justify-center px-3 text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-white group-[.destructive]:text-white group-[.destructive]:hover:text-destructive group-[.destructive]:focus:ring-destructive relative overflow-hidden z-10 border border-darkBlue shadow-xl text-darkBlue group-[.destructive]:before:bg-white before:bg-darkBlue hover:text-white before:absolute before:w-full before:transition-all before:duration-700 before:-left-full before:rounded-full before:-z-10 before:aspect-square before:hover:w-full before:hover:left-0 before:hover:scale-150 before:hover:duration-700 active:translate-x-1 active:translate-y-1"
								aria-label="Add to wishlist">
								{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : "Add to Wish List"}
							</button>
						) :
						size === 'cart'
							? (
								<Button variant={'outline'} size={'chip'} className="w-full border-none" onClick={handleMoveToWishList}>
									{pending ? <PiSpinnerBallDuotone className="animate-spin mx-auto" size={25} /> : "Move to Wish List"}
								</Button>
							) : size === 'dropdown'
								? (
									<button
										onClick={handleAddToWishList}
										className="text-sm font-semibold tracking-wide transition-all focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 text-darkBlue dark:text-lightBlue active:translate-x-1 active:translate-y-1"
										aria-label="Add to wishlist">
										{pending ? <PiSpinnerBallDuotone className="animate-spin mx-auto" size={15} /> : "Move to wish list"}
									</button>
								) : size === 'wishList'
									? (
										<Button variant={'destructive'} size={'chip'} className="w-full" onClick={handleRemoveItem}>
											{pending ? <PiSpinnerBallDuotone className="animate-spin mx-auto" size={15} /> : "Remove"}
										</Button>
									) : null
			}

		</>
	)
}

export default AddToWishList