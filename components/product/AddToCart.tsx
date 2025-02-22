"use client"
import { useToast } from "@/hooks/use-toast"
import { CartItem } from "@/types"
import { ToastAction } from "../ui/toast"
import { BiPlus, BiPlusCircle } from "react-icons/bi"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { addItemToCart } from "@/lib/actions/cart.actions"



const AddToCart = ({ item, size }: { item: CartItem, size: string }) => {
	const { toast } = useToast()

	const router = useRouter()

	const handleAddToCart = async () => {
		const res = await addItemToCart(item)

		if (!res.success) {
			toast({
				variant: 'destructive',
				description: res.message,
				action: <ToastAction altText="Go To Cart" onClick={() => router.push('/cart')}>Go To Cart</ToastAction>

			})
			return
		}

		if (res.success) {
			toast({
				description: `Added ${item.name} to cart`,
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