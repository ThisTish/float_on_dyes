"use client"
import { useToast } from "@/hooks/use-toast"
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions"
import { Cart, CartItem } from "@/types"
import { ToastAction } from "../ui/toast"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import AddToWishList from "./AddToWishList"
import { useTransition } from "react"
import { PiSpinnerBallDuotone } from "react-icons/pi";
import { LucideCircleMinus, LucideCirclePlus } from "lucide-react"
import { addItemToWishList, removeItemFromWishList } from "@/lib/actions/wishList.actions"
import Tooltip from "../ui/Tooltip"


// todo if more than one item available, change button to be plus and minus with qty in middle


const AddToCart = ({ item, size, cart }: { item: CartItem, size: string, cart?: Cart }) => {
	const [pending, startTransition] = useTransition()

	const { toast } = useToast()

	const router = useRouter()

	const handleAddToCart = async (moveFromWishList = false) => {
		startTransition(async () => {
			const res = await addItemToCart(item)

			if (!res.success) {
				toast({
					variant: 'destructive',
					title:
						res.message === "And you've already snagged it!"
							? `${item.name} is one of a kind!`
							: res.message === 'but you can request a different custom disc!' ? `${item.name} has been snagged,`
								: res.message === 'Add to wish list to check back later.' ? `${item.name} is reserved in someone's cart.`
									: undefined,
					description: res.message,
					action:
						res.message === 'but you can request a different custom disc!'
							? <ToastAction altText="Go to custom order page" onClick={() => router.push('/custom')}>Custom Order Page</ToastAction>
							: res.message === `And you've already snagged it!` || res.message === "You've snagged all we have in stock."
								? <ToastAction altText="Go To Cart" onClick={() => router.push('/cart')}>Go To Cart</ToastAction>
								: res.message === `Add to wish list to check back later.`
									? <AddToWishList item={item} size="action" />
									: undefined
				})
				return
			}

			if (res.success && moveFromWishList) {
				const removeRes = await removeItemFromWishList(item.productId)
				if (!removeRes.success) {
					toast({
						variant: 'destructive',
						description: res.message,
					})
					return
				}
				toast({
					description: `Moved ${item.name} to cart`
				})
			} else {
				toast({
					description: res.message,
					action: <ToastAction altText="Go To Cart" onClick={() => router.push('/cart')}>Go To Cart</ToastAction>
				})

				router.refresh()
			}
			router.refresh()
		})
	}

	const handleRemoveItem = async () => {
		startTransition(async () => {

			const res = await removeItemFromCart(item.productId)
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

	const existItem = cart && cart?.items.find(i => i.productId === item.productId)

const itemStatusButtonIcon = existItem ? <LucideCircleMinus size={25} /> : <LucideCirclePlus size={25} />


	return (
		<>
			{size === 'icon' ? (
				<button className="group relative size-fit p-1 hover:bg-darkBlue hover:text-white transition duration-500" onClick={existItem ? handleRemoveItem : () => handleAddToCart()}>
						<Tooltip label={existItem ? 'Remove From Cart' : 'Add To Cart'} position={"bottom"} className="mt-2">
						{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : itemStatusButtonIcon}
				</Tooltip>
					</button>

			) : size === 'button' ? (
				<Button variant={'cta'} size={'lg'} className="w-full" onClick={existItem ? handleRemoveItem : () => handleAddToCart()}>
					{existItem ? 'Remove from Cart' : 'Add to Cart'}
					<AnimatedDiv variant={'cta'} animation={'rotateFull'} className="ml-2">
						{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : itemStatusButtonIcon}
					</AnimatedDiv>
				</Button>
			) :
				size === 'action'
					? (
						<button
							onClick={() => handleAddToCart()}
							className="inline-flex h-8 shrink-0 items-center justify-center px-3 text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-white group-[.destructive]:text-white group-[.destructive]:hover:text-destructive group-[.destructive]:focus:ring-destructive relative overflow-hidden z-10 border border-darkBlue shadow-xl text-darkBlue group-[.destructive]:before:bg-white before:bg-darkBlue hover:text-white before:absolute before:w-full before:transition-all before:duration-700 before:-left-full before:rounded-full before:-z-10 before:aspect-square before:hover:w-full before:hover:left-0 before:hover:scale-150 before:hover:duration-700 active:translate-x-1 active:translate-y-1"
							aria-label="Add to Cart">
							{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : "Add to Cart"}
						</button>

					) : size === 'cart'
						? (
							<Button variant={'destructive'} size={'chip'} className="w-full" onClick={handleRemoveItem}>
								{pending ? <PiSpinnerBallDuotone className="animate-spin mx-auto" size={15} /> : "Remove From Cart"}
							</Button>
						) : size === 'dropdown'
							? (
								<button
									onClick={handleRemoveItem}
									className="text-sm font-semibold tracking-wide transition-all focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 text-destructive  active:translate-x-1 active:translate-y-1"
									aria-label="Remove from cart">
									{pending ? <PiSpinnerBallDuotone className="animate-spin mx-auto" size={15} /> : "Remove from cart"}
								</button>
							) : size === 'wishList'
								? (
									<Button variant={'outline'} size={'chip'} className="w-full border-none hover:font-bold" onClick={() => handleAddToCart(true)}>

										{pending ? <PiSpinnerBallDuotone className="animate-spin mx-auto" size={15} /> : "Move To Cart"}
									</Button>
								) : null
			}
		</>
	)
}

export default AddToCart