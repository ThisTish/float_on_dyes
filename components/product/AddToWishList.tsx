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
import Tooltip from "../ui/Tooltip"


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
					title: res.message === 'Try a custom order instead!' ? `${item.name} has been snagged,`
						: res.message === "Would you like to add it to your cart instead?" ? `${item.name} is already in your wish list,`
							: undefined,
					description: res.message,
					action: res.message === 'Please sign in to save items to wishlist.' || res.message === "You've gotta be signed in to edit your wish list."
						? <ToastAction altText="Sign in to save item" onClick={() => router.push(`/sign-in?callbackUrl=${domain}${previousPage}`)}>Go to Sign In</ToastAction>
						: res.message === 'Try a custom order instead!'
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
					title: res.title,
					description: res.message === "Would you like to add it to your cart instead?"
						? "This item is already in your wish list." : res.message,
					action: res.message === 'Try a custom order instead!'
						? <ToastAction altText="Go to custom dye page" onClick={() => router.push('/custom')}>Custom Order Page</ToastAction> : undefined
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
					<button
						className={`size-fit p-1 transition duration-500 hover:bg-darkBlue hover:text-white ${item.isAvailable ? 'opacity-100' : 'opacity-50 hover:cursor-not-allowed'}`}
						disabled={!item.isAvailable}
						onClick={handleAddToWishList}
					>
						<Tooltip label={'Add to Wish List'} position={"top"} className={`mb-2 ${!item.isAvailable ? 'hover:cursor-not-allowed' : ''}`}>

							{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : <LucideBookmarkPlus size={25} />}
						</Tooltip>
					</button>

				) : size === 'button'
					? (
						<Button
							variant={'secondary'}
							size={'lg'}
							className={`w-full`}
							disabled={!item.isAvailable}
							onClick={handleAddToWishList}
						>
							Wish List
							<AnimatedDiv variant={'outline'} animation={'pulse'} className="ml-2">
								{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : <LucideBookmarkPlus size={25} />}
							</AnimatedDiv>
						</Button>
					) :
					size === 'action'
						? (
							<button
								onClick={handleAddToWishList}
								className="relative z-10 inline-flex h-8 shrink-0 items-center justify-center overflow-hidden border border-darkBlue px-3 text-sm font-medium text-darkBlue shadow-xl transition-all before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-darkBlue before:transition-all before:duration-700 hover:text-white before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700 focus:outline-none focus:ring-1 focus:ring-ring active:translate-x-1 active:translate-y-1 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-white group-[.destructive]:text-white group-[.destructive]:before:bg-white group-[.destructive]:hover:text-destructive group-[.destructive]:focus:ring-destructive"
								aria-label="Add to wishlist"
								disabled={!item.isAvailable}
							>
								{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : "Add to Wish List"}
							</button>
						) :
						size === 'cart'
							? (
								<Button variant={'outline'} size={'chip'} className="w-full border-darkBlue hover:font-bold dark:border-lightBlue" onClick={handleMoveToWishList}>
									{pending ? <PiSpinnerBallDuotone className="mx-auto animate-spin" size={25} /> : "Move to Wish List"}
								</Button>
							) : size === 'dropdown'
								? (
									<button
										onClick={handleMoveToWishList}
										className="text-sm font-semibold tracking-wide text-darkBlue transition-all focus:outline-none focus:ring-1 focus:ring-ring active:translate-x-1 active:translate-y-1 disabled:pointer-events-none disabled:opacity-50 dark:text-lightBlue"
										aria-label="Add to wishlist"
									>
										{pending ? <PiSpinnerBallDuotone className="mx-auto animate-spin" size={15} /> : "Move to wish list"}
									</button>
								) : size === 'wishList'
									? (
										<Button variant={'destructive'} size={'chip'} className="w-full" onClick={handleRemoveItem}>
											{pending ? <PiSpinnerBallDuotone className="mx-auto animate-spin" size={15} /> : "Remove"}
										</Button>
									) : null
			}

		</>
	)
}

export default AddToWishList