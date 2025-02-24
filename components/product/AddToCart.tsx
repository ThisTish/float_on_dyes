"use client"
import { useToast } from "@/hooks/use-toast"
import { addItemToCart } from "@/lib/actions/cart.actions"
import { CartItem } from "@/types"
import { ToastAction } from "../ui/toast"
import { BiPlus, BiPlusCircle } from "react-icons/bi"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { addItemToWishList } from "@/lib/actions/wishList.actions"
import AddToWishList from "./AddToWishList"

// todo if added, check sign

const AddToCart = ({ item, size }: { item: CartItem, size: string }) => {
	const { toast } = useToast()

	const router = useRouter()

	const handleAddToWishList = async () =>{
		const res = await addItemToWishList(item)
	}

	const handleAddToCart = async () => {
		const res = await addItemToCart(item)

		if (!res.success) {
			toast({
				variant: 'destructive',
				title: 
					res.message === "And you've already snagged it!" 
						? `${item.name} is one of a kind!` 
					: res.message === 'Add to wish bag and check back in 30 min.' ? `${item.name} is reserved in someone's cart.`
						: undefined,
				description: res.message,
				action: 
					res.message === `Not enough in stock.` || res.message === `And you've already snagged it!`
						? <ToastAction altText="Go To Cart" onClick={() => router.push('/cart')}>Go To Cart</ToastAction>
					: res.message === `Add to wish bag and check back in 30 min.`
						? <AddToWishList item={item} size="action" />
						: undefined
			})
			router.refresh()
			return
		}

		if (res.success) {
			toast({
				description: res.message,
				action: <ToastAction altText="Go To Cart" onClick={() => router.push('/cart')}>Go To Cart</ToastAction>
			})
		}
	}

	return (
		<>
			{size === 'icon' ? (
				<button className="size-fit p-1 hover:bg-darkBlue hover:text-white transition duration-500" onClick={handleAddToCart}>
					<BiPlusCircle size={25} />
				</button>
			) : (
				<Button variant={'cta'} size={'lg'} className="w-full" onClick={handleAddToCart}>
					Bag It
					<AnimatedDiv variant={'cta'} animation={'rotateFull'} className="ml-2"><BiPlus /></AnimatedDiv>
				</Button>
			)}
		</>
	)
}

export default AddToCart