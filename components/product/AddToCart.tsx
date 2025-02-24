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

// todo if more than one item available, change button to be plus and minus with qty in middle

const AddToCart = ({ item, size, cart }: { item: CartItem, size: string, cart?: Cart }) => {
	const { toast } = useToast()

	const router = useRouter()

	const handleAddToCart = async () => {
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
	}

	const handleRemoveItem = async () => {
		const res = await removeItemFromCart(item.productId)
		if(!res.success){
			console.log('false')
			toast({

				variant: 'destructive',
				description: res.message,
			})
		}

		if(res.success){
			console.log('success')
			toast({
				description: res.message
			})
		}
		router.refresh()
	}
	
	const existItem = cart && cart?.items.find(i => i.productId === item.productId)

	return (
		<>
			{size === 'icon' ? (
				<button className="size-fit p-1 hover:bg-darkBlue hover:text-white transition duration-500" onClick={existItem ? handleRemoveItem : handleAddToCart}>
					{existItem ? <BiMinusCircle size={25} /> : <BiPlusCircle size={25} />}
				</button>
			) : (
				<Button variant={'cta'} size={'lg'} className="w-full" onClick={existItem ? handleRemoveItem : handleAddToCart}>
					{existItem ? 'Remove From Cart' : 'Bag It'}
					<AnimatedDiv variant={'cta'} animation={'rotateFull'} className="ml-2">
						{existItem ? <BiMinusCircle /> : <BiPlusCircle />}
					</AnimatedDiv>
				</Button>
			)}
		</>
	)
}

export default AddToCart