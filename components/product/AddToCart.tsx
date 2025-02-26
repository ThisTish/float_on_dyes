"use client"
import { useToast } from "@/hooks/use-toast"
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions"
import { Cart, CartItem } from "@/types"
import { ToastAction } from "../ui/toast"
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import AddToWishList from "./AddToWishList"
import { useTransition } from "react"
import { PiSpinnerBallDuotone, PiTrashSimpleBold } from "react-icons/pi";
import { LucideCircleMinus, LucideCirclePlus } from "lucide-react"
import { start } from "repl"
import { addItemToWishList, removeItemFromWishList } from "@/lib/actions/wishList.actions"

// todo if more than one item available, change button to be plus and minus with qty in middle


const AddToCart = ({ item, size, cart }: { item: CartItem , size: string, cart?: Cart }) => {
	const [pending, startTransition] = useTransition()

	const { toast } = useToast()

	const router = useRouter()



	const handleAddToCart = async () => {
		startTransition(async () => {

			const res = await addItemToCart(item)

			if (!res.success) {
				toast({
					variant: 'destructive',
					title:
						res.message === "And you've already snagged it!"
							? `${item.name} is one of a kind!`
							: res.message === 'Add to wish bag to check back later.' ? `${item.name} is reserved in someone's cart.`
								: undefined,
					description: res.message,
					action:
						res.message === `Not enough in stock.` || res.message === `And you've already snagged it!`
							? <ToastAction altText="Go To Cart" onClick={() => router.push('/cart')}>Go To Cart</ToastAction>
							: res.message === `Add to wish bag to check back later.`
								? <AddToWishList item={item} size="action" />
								: undefined
				})
			}

			if (res.success) {
				toast({
					description: res.message,
					action: <ToastAction altText="Go To Cart" onClick={() => router.push('/cart')}>Go To Cart</ToastAction>
				})
				router.refresh()

			}
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
	const handleMoveToCart = async() =>{
		startTransition(async () =>{
			const res = await addItemToCart(item)
			if(!res.success){
				toast({
					variant: 'destructive',
					description: res.message,
				})
				return
			}

			if(res.success){
				const res = await removeItemFromWishList(item.productId)
				if(!res.success){
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

	const existItem = cart && cart?.items.find(i => i.productId === item.productId)

	const itemStatusButtonIcon = existItem ? <LucideCircleMinus size={25} /> : <LucideCirclePlus size={25} />


	return (
		<>
			{size === 'icon' ? (
				<button className="size-fit p-1 hover:bg-darkBlue hover:text-white transition duration-500" onClick={existItem ? handleRemoveItem : handleAddToCart}>
					{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : itemStatusButtonIcon}
				</button>
			) : size === 'button' ? (
				<Button variant={'cta'} size={'lg'} className="w-full" onClick={existItem ? handleRemoveItem : handleAddToCart}>
					{existItem ? 'Remove From Cart' : 'Bag It'}
					<AnimatedDiv variant={'cta'} animation={'rotateFull'} className="ml-2">
						{pending ? <PiSpinnerBallDuotone className="animate-spin" size={25} /> : itemStatusButtonIcon}
					</AnimatedDiv>
				</Button>
			) : size === 'cart'
				? (
					<button
						onClick={handleRemoveItem}
						className="relative bg-white overflow-hidden h-6 shrink-0 items-center justify-center px-2 text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-destructive  z-10 text-destructive  before:bg-destructive hover:text-white before:absolute before:w-full before:transition-all before:duration-700 before:-left-full before:rounded-full before:-z-10 before:aspect-square before:hover:w-full before:hover:left-0 before:hover:scale-150 before:hover:duration-700 active:translate-x-1 active:translate-y-1"
						aria-label="Remove from cart">
						{pending ? <PiSpinnerBallDuotone className="animate-spin mx-auto" size={15} /> : "Remove From Cart"}
					</button>
			) : size === 'dropdown'
				? (
					<button
						onClick={handleRemoveItem}
						className="text-sm font-light transition-all focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 text-destructive   active:translate-x-1 active:translate-y-1"
						aria-label="Remove from cart">
						{pending ? <PiSpinnerBallDuotone className="animate-spin mx-auto" size={15} /> : "Remove from cart"}
					</button>
			) : size === 'wishList'
				? (
					<button
						onClick={handleMoveToCart}
						className="relative overflow-hidden h-6 shrink-0 items-center justify-center px-2 text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-darkBlue border border-darkBlue text-white z-10  before:bg-white hover:text-darkBlue before:absolute before:w-full before:transition-all before:duration-700 before:-left-full before:rounded-full before:-z-10 before:aspect-square before:hover:w-full before:hover:left-0 before:hover:scale-150 before:hover:duration-700 active:translate-x-1 active:translate-y-1"
						aria-label="Move to cart from wishlist">
						{pending ? <PiSpinnerBallDuotone className="animate-spin mx-auto" size={15} /> : "Move To Cart"}
					</button>
				) : null
			}
		</>
	)
}

export default AddToCart