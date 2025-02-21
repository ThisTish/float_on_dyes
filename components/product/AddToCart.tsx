"use client"
import { useToast } from "@/hooks/use-toast"
import { CartItem } from "@/types"
import { ToastAction } from "../ui/toast"
import { BiPlus } from "react-icons/bi"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { addItemToCart } from "@/lib/actions/cart.actions"



const AddToCart = ({ item }: { item: CartItem }) => {
	const {toast} = useToast()

	const router = useRouter()

	const handleAddToCart = async () =>{
		const res = await addItemToCart(item)

		if(!res.success){
			toast({
				variant: 'destructive',
				description: res.message,
			})
			return
		}

		if(res.success){
			toast({
				description: `Added ${item.name} to cart`,
				action: <ToastAction className="bg-primary text-white hover:bg-darkBlue" altText="Go To Cart" onClick={() => router.push('/cart')}>Go To Cart</ToastAction>
			})
		}

	}

	return (
		<Button variant={'cta'} size={'lg'} className="w-full" onClick={handleAddToCart}>
			Bag It
			<AnimatedDiv variant={'cta'} animation={'rotateFull'} className="ml-2"><BiPlus /></AnimatedDiv>
		</Button>
	)
}

export default AddToCart